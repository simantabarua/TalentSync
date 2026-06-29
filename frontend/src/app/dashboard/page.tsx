'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { BriefcaseIcon, MapPinIcon, CalendarIcon, ExternalLinkIcon, ClockIcon } from 'lucide-react';

export default function DashboardPage() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['my-applications'],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/applications/my-applications`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    },
    enabled: isLoaded && isSignedIn,
  });

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-32 flex-grow text-center">
        <h2 className="text-2xl font-bold mb-4">Please sign in</h2>
        <p className="text-muted-foreground mb-8">You need to be signed in to view your dashboard.</p>
        <Link href="/sign-in" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl flex-grow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Dashboard</h1>
          <p className="text-muted-foreground">Track and manage your job applications.</p>
        </div>
        <Link href="/jobs" className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
          Find More Jobs
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border bg-muted/10">
          <h2 className="font-semibold text-lg">Application History</h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : isError ? (
          <div className="text-center py-16 text-red-500">
            Failed to load applications.
          </div>
        ) : data?.data?.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <BriefcaseIcon className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">No applications yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              You haven&apos;t applied to any jobs yet. Start exploring opportunities to build your career.
            </p>
            <Link href="/jobs" className="inline-flex h-10 items-center justify-center rounded-md border border-border bg-transparent px-6 text-sm font-medium shadow-sm transition-colors hover:bg-muted">
              Explore Jobs
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {data?.data.map((application: { _id: string; job: { _id: string; title: string; company: string; location: string }; createdAt: string; status: string }) => (
              <div key={application._id} className="p-6 hover:bg-muted/30 transition-colors">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div className="space-y-1">
                    <Link href={`/jobs/${application.job._id}`} className="font-bold text-lg hover:text-primary transition-colors inline-flex items-center">
                      {application.job.title}
                      <ExternalLinkIcon className="h-3 w-3 ml-2 opacity-50" />
                    </Link>
                    <p className="text-primary font-medium">{application.job.company}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground pt-2">
                      <div className="flex items-center">
                        <MapPinIcon className="h-3.5 w-3.5 mr-1" />
                        {application.job.location}
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="h-3.5 w-3.5 mr-1" />
                        Applied {new Date(application.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
                      <ClockIcon className="h-3.5 w-3.5 mr-1.5" />
                      {application.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
