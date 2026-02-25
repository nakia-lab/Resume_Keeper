"use client";

import { useResume } from '@/context/ResumeContext';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Linkedin, Globe, ExternalLink, Download, Sparkles, Link as LinkIcon, Trash2, Save } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export default function PreviewPage() {
  const { data, resetData } = useResume();
  const { toast } = useToast();

  const handlePrint = () => {
    window.print();
  };

  const handleSaveSnapshot = () => {
    // Context auto-saves to localStorage, but we reinforce it here
    localStorage.setItem('resume-keeper-data', JSON.stringify(data));
    toast({ 
      title: "Snapshot Saved", 
      description: "Your portfolio data is securely backed up in your browser storage." 
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print-hidden">
        <div>
          <h1 className="text-2xl font-headline font-bold">Portfolio Live Preview</h1>
          <p className="text-sm text-muted-foreground">This is exactly how your portfolio will look to recruiters.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button onClick={handleSaveSnapshot} variant="outline" className="gap-2 flex-1 md:flex-none">
            <Save className="w-4 h-4" /> Save Snapshot
          </Button>
          <Button onClick={handlePrint} className="gap-2 flex-1 md:flex-none bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <Download className="w-4 h-4" /> Print / Save PDF
          </Button>
          <Button onClick={resetData} variant="destructive" className="gap-2 flex-1 md:flex-none">
            <Trash2 className="w-4 h-4" /> Reset Data
          </Button>
        </div>
      </div>

      <div className="resume-container bg-white text-slate-900 shadow-2xl rounded-2xl overflow-hidden border border-slate-200 mx-auto max-w-5xl print:shadow-none print:border-none print:m-0 print:max-w-none print-bg-white">
        {/* Header Section */}
        <div className="bg-slate-900 text-white p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32"></div>
          <div className="relative z-10 space-y-6">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">
                {data.basics.name || 'Your Name'}
              </h2>
              <p className="text-xl md:text-2xl text-primary font-medium opacity-90">
                {data.basics.label || 'Professional Title'}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-slate-300">
              {data.basics.email && (
                <div className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {data.basics.email}</div>
              )}
              {data.basics.phone && (
                <div className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {data.basics.phone}</div>
              )}
              {data.basics.location && (
                <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {data.basics.location}</div>
              )}
              {data.basics.linkedin && (
                <div className="flex items-center gap-1.5"><Linkedin className="w-4 h-4" /> {data.basics.linkedin}</div>
              )}
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-4">
              <h3 className="text-2xl font-headline font-bold border-l-4 border-primary pl-4">About</h3>
              {data.about.shortBio && (
                <p className="text-slate-600 leading-relaxed text-lg italic opacity-80 mb-4 whitespace-pre-wrap">
                  {data.about.shortBio}
                </p>
              )}
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {data.about.longAbout || 'Provide an about section to showcase your personality.'}
              </p>
            </section>

            {data.experience.length > 0 && (
              <section className="space-y-6">
                <h3 className="text-2xl font-headline font-bold border-l-4 border-primary pl-4">Experience</h3>
                <div className="space-y-8">
                  {data.experience.map((job) => (
                    <div key={job.id} className="experience-item relative pl-8 before:absolute before:left-0 before:top-2 before:w-3 before:h-3 before:bg-primary before:rounded-full before:z-10 after:absolute after:left-[5px] after:top-4 after:bottom-0 after:w-[2px] after:bg-slate-100 last:after:hidden">
                      <div className="flex flex-wrap justify-between items-baseline mb-2">
                        <h4 className="text-xl font-bold text-slate-900">{job.position}</h4>
                        <span className="text-sm font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">{job.startDate || '20XX'} - {job.endDate || 'Present'}</span>
                      </div>
                      <p className="text-primary font-semibold mb-3">{job.company}</p>
                      <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
                        {job.responsibilities.filter(r => r.trim() !== '').map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {data.projects.length > 0 && (
              <section className="space-y-6">
                <h3 className="text-2xl font-headline font-bold border-l-4 border-primary pl-4">Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.projects.map((proj) => (
                    <Card key={proj.id} className="project-item overflow-hidden border-slate-200 group hover:shadow-lg transition-shadow bg-slate-50/50">
                      <div className="aspect-video relative bg-slate-200 overflow-hidden">
                        {proj.imageUrl ? (
                          <Image src={proj.imageUrl} alt={proj.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Globe className="w-12 h-12 opacity-20" />
                          </div>
                        )}
                      </div>
                      <div className="p-5 space-y-3">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-lg">{proj.name}</h4>
                          <div className="flex gap-2">
                            {proj.evidenceUrl && (
                              <a href={proj.evidenceUrl} target="_blank" className="p-1 hover:text-primary transition-colors">
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                            {proj.firebaseUrl && (
                              <a href={proj.firebaseUrl} target="_blank" className="p-1 hover:text-primary transition-colors">
                                <LinkIcon className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 line-clamp-2">{proj.summary}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.techStack.map((tech, idx) => (
                            <Badge key={idx} variant="secondary" className="text-[10px] px-2 py-0 bg-white border-slate-200 text-slate-600">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="space-y-12">
            {data.about.strengths.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-xl font-headline font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" /> Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.about.strengths.map((s, i) => (
                    <Badge key={i} className="bg-slate-100 text-slate-800 hover:bg-primary hover:text-primary-foreground transition-colors border-none">{s}</Badge>
                  ))}
                </div>
              </section>
            )}

            {data.about.industries.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-xl font-headline font-bold text-slate-900 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" /> Industries
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.about.industries.map((ind, i) => (
                    <Badge key={i} variant="outline" className="border-slate-200">{ind}</Badge>
                  ))}
                </div>
              </section>
            )}

            {data.education.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-xl font-headline font-bold text-slate-900">Education</h3>
                <div className="space-y-6">
                  {data.education.map((edu) => (
                    <div key={edu.id} className="space-y-1 relative pl-4 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-slate-200 before:rounded-full">
                      <h4 className="font-bold text-slate-900">{edu.studyType} in {edu.area}</h4>
                      <p className="text-slate-600 text-sm">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
