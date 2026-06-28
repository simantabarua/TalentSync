import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { coverLetterPrompt, resumeMatchPrompt } from '../prompts/ai.prompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const generateCoverLetter = async (req: Request, res: Response): Promise<void> => {
  try {
    const { jobTitle, company, skills, experience, tone } = req.body;
    
    if (!jobTitle || !company) {
      res.status(400).json({ success: false, message: 'Missing required fields', errors: null });
      return;
    }

    const prompt = coverLetterPrompt(jobTitle, company, skills, experience, tone);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ success: true, data: { coverLetter: text }, message: 'Cover letter generated successfully', errors: null });
  } catch (error) {
    res.status(500).json({ success: false, message: 'AI generation failed', errors: [{ message: (error as Error).message }] });
  }
};

export const matchResume = async (req: Request, res: Response): Promise<void> => {
  try {
    const { jobDescription, resumeText } = req.body;
    
    if (!jobDescription || !resumeText) {
      res.status(400).json({ success: false, message: 'Missing job description or resume text', errors: null });
      return;
    }

    const prompt = resumeMatchPrompt(jobDescription, resumeText);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    let parsedData;
    try {
      parsedData = JSON.parse(text.replace(/```json|```/g, '').trim());
    } catch (e) {
      res.status(500).json({ success: false, message: 'Failed to parse AI response', errors: null });
      return;
    }

    res.json({ success: true, data: parsedData, message: 'Resume matched successfully', errors: null });
  } catch (error) {
    res.status(500).json({ success: false, message: 'AI generation failed', errors: [{ message: (error as Error).message }] });
  }
};
