import Link from 'next/link';
import { 
  ArrowRightIcon, 
  SparklesIcon, 
  FileTextIcon, 
  BriefcaseIcon, 
  CpuIcon, 
  CheckCircle2Icon, 
  UsersIcon, 
  ShieldCheckIcon, 
  StarIcon, 
  ChevronRightIcon 
} from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#09090b] text-[#fafafa] overflow-hidden">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),rgba(6,182,212,0.05),transparent_60%)] pointer-events-none z-0" />
      <div className="absolute top-[800px] right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(20,184,166,0.03),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute top-[1600px] left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.03),transparent_70%)] pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32 flex flex-col items-center text-center px-4 md:px-6 z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-muted/30 px-3.5 py-1 text-xs md:text-sm font-medium mb-8 backdrop-blur-md text-slate-300 hover:border-blue-500/30 transition-colors shadow-sm shadow-blue-500/5">
          <SparklesIcon className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
          <span>Introducing TalentSync AI 2.0</span>
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight max-w-5xl mb-8 leading-[1.1] bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
          Find your dream career <br className="hidden sm:inline" />
          faster with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 drop-shadow-[0_2px_10px_rgba(6,182,212,0.15)]">intelligent AI matching</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-3xl mb-12 leading-relaxed">
          Upload your resume and let our advanced AI map your skill set to thousands of open jobs, automatically draft hyper-tailored cover letters, and track your application funnel in one seamless workspace.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mb-20">
          <Link href="/jobs" className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 text-sm font-semibold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer">
            Explore Jobs
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
          <Link href="/sign-up" className="inline-flex h-12 items-center justify-center rounded-xl border border-border/80 bg-background/50 backdrop-blur-md hover:bg-muted/40 hover:border-slate-500/30 text-slate-200 px-8 text-sm font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
            Create Free Account
          </Link>
        </div>

        {/* Dashboard Mockup (Interactive CSS Preview) */}
        <div className="w-full max-w-5xl mx-auto rounded-2xl border border-border/80 bg-card/20 backdrop-blur-md p-2 shadow-2xl shadow-blue-500/5 relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-600 rounded-2xl opacity-10 group-hover:opacity-15 transition-opacity duration-300 blur-sm pointer-events-none" />
          <div className="rounded-xl border border-border/60 bg-[#0c0c0e] overflow-hidden flex flex-col md:flex-row h-[420px] text-left">
            {/* Mock Sidebar */}
            <div className="w-full md:w-56 border-b md:border-b-0 md:border-r border-border/60 p-4 bg-[#0a0a0c] flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-2 py-1">
                  <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">T</div>
                  <span className="font-bold text-xs tracking-wide uppercase text-slate-400">TalentSync Dashboard</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-muted/60 text-blue-400 text-xs font-medium border border-blue-500/10">
                    <BriefcaseIcon className="h-4 w-4 text-blue-400" />
                    Jobs Matcher
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-muted/30 text-xs font-medium transition-colors">
                    <FileTextIcon className="h-4 w-4" />
                    Cover Letters
                  </div>
                  <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-muted/30 text-xs font-medium transition-colors">
                    <UsersIcon className="h-4 w-4" />
                    Applications
                  </div>
                </div>
              </div>
              <div className="border-t border-border/60 pt-4 flex items-center gap-2.5 px-2">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-300 border border-border">JD</div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-300">John Doe</span>
                  <span className="text-[10px] text-slate-500">Software Engineer</span>
                </div>
              </div>
            </div>

            {/* Mock Main Content */}
            <div className="flex-grow p-5 md:p-6 flex flex-col md:flex-row gap-5 overflow-y-auto">
              <div className="flex-grow space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/40 pb-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Suggested Role Match</h4>
                    <p className="text-[11px] text-slate-400">Based on your uploaded resume</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-xs text-blue-300 font-semibold shadow-sm">
                    <SparklesIcon className="h-3 w-3" />
                    94% Matching Score
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-border/60 bg-muted/20 p-4 relative">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="text-xs font-bold text-slate-300">Senior Full-Stack Engineer</h5>
                        <p className="text-[10px] text-slate-500">InnovateTech Inc. • San Francisco (Hybrid)</p>
                      </div>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold">Active Match</span>
                    </div>
                    <div className="space-y-2 mt-3">
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <CheckCircle2Icon className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Matched skills: <strong className="text-slate-300">React, TypeScript, Node.js, Next.js, REST APIs</strong></span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400">
                        <CheckCircle2Icon className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Experience requirements: <strong className="text-slate-300">5+ years matching your profile</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-semibold text-slate-400">
                      <span>Matching Skill Gap Audit</span>
                      <span className="text-cyan-400">92% Skill Cover</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted/60 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mock AI Helper Panel */}
              <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-border/40 pt-5 md:pt-0 md:pl-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CpuIcon className="h-4 w-4 text-cyan-400" />
                    <h5 className="text-xs font-bold text-slate-300">AI Tailoring Assistant</h5>
                  </div>
                  <div className="rounded-lg border border-border/60 bg-muted/30 p-3 text-[11px] text-slate-400 space-y-2 leading-relaxed">
                    <p className="text-slate-300 font-semibold">Generated Cover Letter Snippet:</p>
                    <p className="italic">“...With my extensive expertise in building scalable Next.js interfaces combined with robust TypeScript APIs, I am incredibly excited to drive high-performance UI engineering at InnovateTech...”</p>
                  </div>
                </div>
                <button className="w-full mt-4 bg-muted hover:bg-muted/80 text-slate-300 border border-border/80 hover:text-slate-100 rounded-lg text-xs font-semibold py-2 transition-colors cursor-pointer flex items-center justify-center gap-1.5">
                  Customize & Submit Application
                  <ChevronRightIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Social Proof Stats */}
      <section className="w-full border-y border-border/40 bg-card/5 py-12 px-4 z-10 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">98%</h3>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">AI Mapping Accuracy</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">10x</h3>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Faster Interview Response</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">50k+</h3>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Matched Job Openings</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">4.9/5</h3>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Developer Satisfaction</p>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="w-full py-24 md:py-32 bg-background flex flex-col items-center justify-center px-4 md:px-6 z-10 relative">
        <div className="text-center max-w-3xl mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Engineered to accelerate your search</h2>
          <p className="text-slate-400 text-base md:text-lg">Skip the tedious form-filling and dry cover-letter templates. Our intelligent pipelines automate everything.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
          {/* Feature 1 */}
          <div className="flex flex-col p-8 bg-card/25 rounded-2xl border border-border/60 hover:border-blue-500/30 hover:bg-card/45 transition-all duration-300 shadow-sm relative group">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <SparklesIcon className="h-4 w-4 text-blue-400" />
            </div>
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 flex items-center justify-center mb-8 shadow-sm">
              <CpuIcon className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-200">Semantic Resume Mapping</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Our advanced neural language matching scores your experience against job requirements, pinpointing hidden alignments and core match metrics instantly.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="flex flex-col p-8 bg-card/25 rounded-2xl border border-border/60 hover:border-blue-500/30 hover:bg-card/45 transition-all duration-300 shadow-sm relative group">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <SparklesIcon className="h-4 w-4 text-blue-400" />
            </div>
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-8 shadow-sm">
              <FileTextIcon className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-200">Gemini AI Cover Letters</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Automatically generate highly compelling, contextual cover letters adapted to specific jobs, focusing on matching skills while maintaining a authentic professional voice.</p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col p-8 bg-card/25 rounded-2xl border border-border/60 hover:border-blue-500/30 hover:bg-card/45 transition-all duration-300 shadow-sm sm:col-span-2 lg:col-span-1 relative group">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <SparklesIcon className="h-4 w-4 text-blue-400" />
            </div>
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-8 shadow-sm">
              <ShieldCheckIcon className="h-6 w-6 text-teal-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-200">Pipeline Tracking Console</h3>
            <p className="text-slate-400 text-sm leading-relaxed">Keep all application materials, progress metrics, status changes, and interview calendars organized in a unified, clean command center dashboard.</p>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="w-full py-24 md:py-32 bg-[#0b0b0d] border-t border-border/40 flex flex-col items-center justify-center px-4 md:px-6 z-10 relative">
        <div className="text-center max-w-3xl mb-24 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">The 3-Step Match Workflow</h2>
          <p className="text-slate-400 text-base md:text-lg">Here is how TalentSync AI guides you from profile upload to interview.</p>
        </div>

        <div className="grid gap-12 md:grid-cols-3 max-w-5xl w-full relative">
          {/* Connector Line for Desktop */}
          <div className="absolute top-16 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-blue-500/30 via-cyan-500/30 to-teal-500/30 hidden md:block" />

          {/* Step 1 */}
          <div className="flex flex-col items-center text-center space-y-4 z-10 relative group">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/15 group-hover:scale-110 transition-transform">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-200">Upload Your Resume</h3>
            <p className="text-slate-400 text-sm max-w-xs">Drop your PDF or DOCX file. Our engine parses your skills, projects, and career timeline instantly.</p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center space-y-4 z-10 relative group">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-cyan-500/15 group-hover:scale-110 transition-transform">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-200">Discover Matches</h3>
            <p className="text-slate-400 text-sm max-w-xs">AI scans active job openings and scores matches. Filter roles by fit index, compensation, or location.</p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center space-y-4 z-10 relative group">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-teal-500/15 group-hover:scale-110 transition-transform">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-200">Apply Instantly</h3>
            <p className="text-slate-400 text-sm max-w-xs">Generate custom cover letters for target roles in seconds, export application details, and land interviews.</p>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="w-full py-24 md:py-32 bg-background flex flex-col items-center justify-center px-4 md:px-6 z-10 relative">
        <div className="text-center max-w-3xl mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Vouched by top builders</h2>
          <p className="text-slate-400 text-base md:text-lg">Discover how professionals are accelerating their career search with TalentSync AI.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
          {/* Testimonial 1 */}
          <div className="p-6 bg-[#0c0c0f]/80 rounded-2xl border border-border/60 flex flex-col justify-between shadow-md">
            <div className="space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic">“The automated cover letter generator saved me hours of drafting. The match score was spot-on; I landed 3 interviews in two weeks.”</p>
            </div>
            <div className="flex items-center gap-3 pt-6 border-t border-border/30 mt-6">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">AS</div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Alex Silva</h4>
                <p className="text-[10px] text-slate-500">React Frontend Engineer</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="p-6 bg-[#0c0c0f]/80 rounded-2xl border border-border/60 flex flex-col justify-between shadow-md">
            <div className="space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic">“I loved the skill gap feedback. It showed exactly what I needed to emphasize in my portfolio to qualify for the higher level positions.”</p>
            </div>
            <div className="flex items-center gap-3 pt-6 border-t border-border/30 mt-6">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">MK</div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">Melissa Kim</h4>
                <p className="text-[10px] text-slate-500">Senior Product Manager</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="p-6 bg-[#0c0c0f]/80 rounded-2xl border border-border/60 flex flex-col justify-between shadow-md sm:col-span-2 lg:col-span-1">
            <div className="space-y-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic">“Clean design, no spam, and actual match insights. Highly recommend TalentSync AI for anyone sick of scrolling blind job boards.”</p>
            </div>
            <div className="flex items-center gap-3 pt-6 border-t border-border/30 mt-6">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold">DC</div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">David Carter</h4>
                <p className="text-[10px] text-slate-500">DevOps Specialist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Conversion Banner */}
      <section className="w-full py-20 bg-background flex justify-center px-4 md:px-6 z-10 relative">
        <div className="max-w-5xl w-full rounded-3xl border border-border/60 bg-gradient-to-r from-blue-950/20 via-cyan-950/20 to-teal-950/10 p-8 md:p-14 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.06),transparent_50%)] pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-2xl mx-auto">Ready to match your skills with the future?</h2>
          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto">Join thousands of builders discovering tech careers with intelligent resume mapping today.</p>
          <div className="flex justify-center">
            <Link href="/jobs" className="inline-flex h-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 text-sm font-semibold shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer">
              Get Matched Now
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-border/40 bg-[#070709] py-16 px-4 md:px-6 z-10 relative text-slate-500 text-xs">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo & Info */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-1 text-white shadow-md">
                <BriefcaseIcon className="h-4 w-4" />
              </div>
              <span className="font-bold text-slate-200 text-sm">TalentSync <span className="text-blue-400">AI</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs">Automated, semantic resume matching and personalized cover letter generators, streamlining tech careers.</p>
          </div>

          {/* Links 1 */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-300 text-xs uppercase tracking-wider">Product</h4>
            <ul className="space-y-2">
              <li><Link href="/jobs" className="hover:text-slate-350 transition-colors">Jobs Board</Link></li>
              <li><Link href="/dashboard" className="hover:text-slate-350 transition-colors">Candidate Console</Link></li>
              <li><Link href="/profile" className="hover:text-slate-350 transition-colors">Resume Profile</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-300 text-xs uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-slate-350 transition-colors cursor-not-allowed">Documentation</span></li>
              <li><span className="hover:text-slate-350 transition-colors cursor-not-allowed">AI Model Info</span></li>
              <li><span className="hover:text-slate-350 transition-colors cursor-not-allowed">System Status</span></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-300 text-xs uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-slate-350 transition-colors cursor-not-allowed">Privacy Policy</span></li>
              <li><span className="hover:text-slate-350 transition-colors cursor-not-allowed">Terms of Service</span></li>
              <li><span className="hover:text-slate-350 transition-colors cursor-not-allowed">Security Audit</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px]">
          <span>© {new Date().getFullYear()} TalentSync AI Corp. All rights reserved.</span>
          <span>Made for developers and builders to navigate modern tech career matching.</span>
        </div>
      </footer>
    </div>
  );
}
