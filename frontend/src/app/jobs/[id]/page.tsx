'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { MapPinIcon, BriefcaseIcon, DollarSignIcon, ArrowLeftIcon, BuildingIcon, ClockIcon, SparklesIcon } from 'lucide-react';
import Link from 'next/link';

export default function JobDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/jobs/${id}`);
      return res.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32 flex-grow">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="flex flex-col items-center justify-center py-32 flex-grow">
        <h2 className="text-2xl font-bold mb-4">Job not found</h2>
        <button onClick={() => router.back()} className="text-primary hover:underline flex items-center">
          <ArrowLeftIcon className="w-4 h-4 mr-2" /> Back to jobs
        </button>
      </div>
    );
  }

  const job = data.data;
  const postedDate = new Date(job.createdAt).toLocaleDateString();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl flex-grow">
      <Link href="/jobs" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeftIcon className="w-4 h-4 mr-2" />
        Back to all jobs
      </Link>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="p-8 border-b border-border bg-muted/20">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">{job.title}</h1>
              <div className="flex items-center text-primary text-xl font-medium mb-4">
                <BuildingIcon className="w-5 h-5 mr-2" />
                {job.company}
              </div>
              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-1.5" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                <DollarSignIcon className="h-5 w-5" />
                <span>{job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}</span>
              </div>
                <div className="flex items-center">
                  <BriefcaseIcon className="w-4 h-4 mr-1.5" />
                  {job.jobType}
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-4 h-4 mr-1.5" />
                  Posted {postedDate}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[200px]">
              <Link href={`/jobs/apply/${job._id}`} className="inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
                Apply Now
              </Link>
              <button className="inline-flex h-12 w-full items-center justify-center rounded-md border border-border bg-transparent px-8 text-sm font-medium shadow-sm transition-colors hover:bg-muted">
                Save Job
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <h2 className="text-xl font-bold mb-4">Job Description</h2>
          <div className="prose prose-invert max-w-none text-muted-foreground whitespace-pre-line">
            {job.description}
          </div>
          
          <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-border flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-lg mb-1">Want to know your match score?</h3>
              <p className="text-muted-foreground text-sm">Use our AI to analyze how well your resume matches this job.</p>
            </div>
            <button className="whitespace-nowrap inline-flex h-10 items-center justify-center rounded-md bg-foreground text-background px-6 text-sm font-medium transition-colors hover:bg-foreground/90">
              <SparklesIcon className="w-4 h-4 mr-2 text-primary" />
              AI Resume Match
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
