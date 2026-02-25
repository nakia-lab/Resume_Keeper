"use client";

import { useResume } from '@/context/ResumeContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Circle, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const { data } = useResume();
  const { toast } = useToast();

  const completionSteps = [
    { label: 'Basic Info', done: !!data.basics.name, href: '/profile?tab=basics' },
    { label: 'About Section', done: !!data.about.longAbout, href: '/profile?tab=about' },
    { label: 'Experience', done: data.experience.length > 0, href: '/profile?tab=experience' },
    { label: 'Education', done: data.education.length > 0, href: '/profile?tab=education' },
    { label: 'Projects', done: data.projects.length > 0, href: '/projects' },
  ];

  const completedCount = completionSteps.filter(s => s.done).length;
  const progressPercent = (completedCount / completionSteps.length) * 100;

  const handleSave = () => {
    toast({ title: "Progress Saved", description: "Your current portfolio status is secured." });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold text-foreground">Welcome back, {data.basics.name || 'Professional'}</h1>
          <p className="text-muted-foreground text-lg">Your portfolio is {Math.round(progressPercent)}% complete.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button onClick={handleSave} variant="default" className="gap-2 flex-1 md:flex-none">
            <Save className="w-4 h-4" /> Save Snapshot
          </Button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Completion</CardTitle>
            <CardDescription>Follow these steps to finalize your professional profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Progress value={progressPercent} className="h-3" />
            <div className="space-y-4">
              {completionSteps.map((step, idx) => (
                <Link 
                  key={idx} 
                  href={step.href}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-muted transition-all group border border-transparent hover:border-border"
                >
                  <div className="flex items-center gap-4">
                    {step.done ? (
                      <CheckCircle2 className="text-primary w-6 h-6" />
                    ) : (
                      <Circle className="text-muted-foreground w-6 h-6" />
                    )}
                    <span className={step.done ? "text-foreground font-semibold text-lg" : "text-muted-foreground text-lg"}>
                      {step.label}
                    </span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
