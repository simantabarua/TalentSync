'use client';

import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { SparklesIcon, FileTextIcon, SendIcon, ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { getToken } = useAuth();
  
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const { data: jobData, isLoading: isLoadingJob } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/jobs/${id}`);
      return res.data;
    }
  });

  const applyMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/applications`,
        { job: id, coverLetter, resumeUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      alert('Application submitted successfully!');
      router.push('/dashboard');
    },
    onError: (error) => {
      // @ts-expect-error axios error
      alert(error.response?.data?.message || 'Failed to submit application');
    }
  });

  const generateCoverLetter = async () => {
    try {
      setIsGenerating(true);
      const token = await getToken();
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/ai/cover-letter`,
        {
          jobTitle: job?.title,
          company: job?.company,
          skills: 'Full Stack Development, React, Node.js', // Hardcoded for demo, normally from user profile
          experience: '3 years of web development',
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCoverLetter(res.data.data.coverLetter);
    } catch {
      alert('Failed to generate cover letter');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoadingJob) {
    return (
      <div className="flex justify-center items-center py-32 flex-grow">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const job = jobData?.data;

  if (!job) {
    return (
      <div className="text-center py-32 flex-grow">
        <h2 className="text-2xl font-bold">Job not found</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl flex-grow">
      <Link href={`/jobs/${job._id}`} className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to job details
      </Link>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border bg-muted/20">
          <h1 className="text-2xl font-bold tracking-tight mb-1">Apply for {job.title}</h1>
          <p className="text-muted-foreground">at {job.company}</p>
        </div>
        
        <div className="p-6 space-y-8">
          <div className="space-y-3">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Resume URL
            </label>
            <div className="relative">
              <FileTextIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="url"
                placeholder="https://link-to-your-resume.pdf"
                className="flex h-10 w-full rounded-md border border-border bg-background px-10 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium leading-none">
                Cover Letter
              </label>
              <button 
                type="button"
                onClick={generateCoverLetter}
                disabled={isGenerating}
                className="inline-flex items-center text-xs font-medium text-primary hover:text-primary/80 disabled:opacity-50"
              >
                {isGenerating ? (
                  <span className="animate-spin h-3 w-3 mr-1 border-b-2 border-primary rounded-full"></span>
                ) : (
                  <SparklesIcon className="h-3 w-3 mr-1" />
                )}
                Generate with AI
              </button>
            </div>
            <textarea
              className="flex min-h-[250px] w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Write your cover letter here..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
            ></textarea>
          </div>
        </div>

        <div className="p-6 border-t border-border bg-muted/10 flex justify-end">
          <button
            onClick={() => applyMutation.mutate()}
            disabled={applyMutation.isPending || !resumeUrl}
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {applyMutation.isPending ? 'Submitting...' : (
              <>
                <SendIcon className="h-4 w-4 mr-2" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
