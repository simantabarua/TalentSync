'use client';

import { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth, useUser } from '@clerk/nextjs';
import { UserIcon, UploadIcon, SaveIcon, LinkIcon } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [skills, setSkills] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/users/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data;
    }
  });

  useEffect(() => {
    if (profileData?.data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSkills(profileData.data.skills?.join(', ') || '');
      setExperience(profileData.data.experience || '');
      setBio(profileData.data.bio || '');
    }
  }, [profileData]);

  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.put(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/users/me`,
        {
          skills: skills.split(',').map(s => s.trim()).filter(Boolean),
          experience,
          bio
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      alert('Profile updated successfully!');
    },
    onError: () => {
      alert('Failed to update profile');
    }
  });

  const uploadResume = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('resume', file);
    
    try {
      setIsUploading(true);
      const token = await getToken();
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/v1/users/me/resume`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      alert('Resume uploaded successfully!');
    } catch (error) {
      console.error('Failed to upload resume:', error);
      alert('Failed to upload resume');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32 flex-grow">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const profile = profileData?.data;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl flex-grow">
      <div className="mb-10 text-center md:text-left md:flex md:items-end gap-6">
        <div className="relative inline-block">
          {user?.imageUrl ? (
            <Image 
              src={user.imageUrl} 
              alt="Profile" 
              width={120} 
              height={120} 
              className="rounded-full border-4 border-background shadow-md"
            />
          ) : (
            <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center border-4 border-background shadow-md">
              <UserIcon className="h-12 w-12 text-muted-foreground" />
            </div>
          )}
        </div>
        <div className="mt-4 md:mt-0 pb-2">
          <h1 className="text-3xl font-bold tracking-tight mb-1">{profile?.name || user?.fullName}</h1>
          <p className="text-muted-foreground">{profile?.email || user?.primaryEmailAddress?.emailAddress}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <UserIcon className="h-5 w-5 mr-2 text-primary" />
              Professional Profile
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary min-h-[100px]"
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary"
                  placeholder="e.g. React, Node.js, Python"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Experience Summary</label>
                <textarea
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:border-primary min-h-[100px]"
                  placeholder="Summarize your professional experience..."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                ></textarea>
              </div>
              
              <button
                onClick={() => updateProfileMutation.mutate()}
                disabled={updateProfileMutation.isPending}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {updateProfileMutation.isPending ? 'Saving...' : (
                  <>
                    <SaveIcon className="h-4 w-4 mr-2" />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <UploadIcon className="h-5 w-5 mr-2 text-primary" />
              Resume
            </h2>
            
            {profile?.resumeUrl ? (
              <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border text-center">
                <FileTextIcon className="h-10 w-10 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium mb-2">Resume Uploaded</p>
                <a 
                  href={profile.resumeUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs text-primary hover:underline inline-flex items-center"
                >
                  <LinkIcon className="h-3 w-3 mr-1" />
                  View current resume
                </a>
              </div>
            ) : (
              <div className="mb-6 p-6 bg-muted/30 rounded-lg border border-dashed border-border text-center">
                <p className="text-sm text-muted-foreground mb-1">No resume uploaded</p>
                <p className="text-xs text-muted-foreground">Upload a PDF or DOCX file to use for applications.</p>
              </div>
            )}
            
            <input 
              type="file" 
              accept=".pdf,.doc,.docx" 
              className="hidden" 
              ref={fileInputRef}
              onChange={uploadResume}
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full inline-flex h-10 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium shadow-sm transition-colors hover:bg-muted disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : profile?.resumeUrl ? 'Update Resume' : 'Upload Resume'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FileTextIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}
