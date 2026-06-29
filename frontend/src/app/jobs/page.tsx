'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SearchIcon, MapPinIcon, BriefcaseIcon, DollarSignIcon } from 'lucide-react';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary: { min: number; max: number; currency: string };
  jobType: string;
  description: string;
  category: string;
  createdAt: string;
}

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['jobs', search, location],
    queryFn: async () => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/jobs`, {
        params: { search, location }
      });
      return res.data;
    }
  });

  const jobs: Job[] = data?.data || [];

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl flex-grow">
      <div className="flex flex-col mb-10 text-center items-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Explore Jobs</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Discover the best opportunities tailored to your skills and aspirations.
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 mb-10 flex flex-col sm:flex-row gap-4 shadow-sm">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Job title, keywords, or company"
            className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 outline-none focus:border-primary transition-colors"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative flex-grow">
          <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="City, state, or zip code"
            className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-3 outline-none focus:border-primary transition-colors"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : isError ? (
        <div className="text-center py-20 text-red-500">
          Failed to load jobs. Please try again later.
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground bg-card border border-border rounded-xl">
          No jobs found matching your criteria.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <Link href={`/jobs/${job._id}`} key={job._id}>
              <div className="bg-card hover:bg-muted/30 transition-colors border border-border rounded-xl p-6 flex flex-col h-full shadow-sm cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg leading-tight mb-1">{job.title}</h3>
                    <p className="text-primary font-medium">{job.company}</p>
                  </div>
                  <div className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded">
                    {job.jobType}
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-grow">
                  {job.description}
                </p>
                
                <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground pt-4 border-t border-border">
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSignIcon className="h-4 w-4" />
                    {job.salary.min.toLocaleString()} - {job.salary.max.toLocaleString()} {job.salary.currency}
                  </div>
                  <div className="flex items-center gap-1">
                    <BriefcaseIcon className="h-4 w-4" />
                    {job.category}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
