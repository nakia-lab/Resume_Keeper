"use client";

import { useResume } from '@/context/ResumeContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Circle, Eye, Save, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const { data, resetData } = useResume();
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
          <Button onClick={handleSave} variant="outline" className="gap-2 flex-1 md:flex-none">
            <Save className="w-4 h-4" /> Save All
          </Button>
          <Button onClick={resetData} variant="destructive" className="gap-2 flex-1 md:flex-none">
            <Trash2 className="w-4 h-4" /> Reset Data
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Resume Status</CardTitle>
            <CardDescription>Follow these steps to complete your professional profile.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Progress value={progressPercent} className="h-3" />
            <div className="space-y-4">
              {completionSteps.map((step, idx) => (
                <Link 
                  key={idx} 
                  href={step.href}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {step.done ? (
                      <CheckCircle2 className="text-green-500 w-5 h-5" />
                    ) : (
                      <Circle className="text-muted-foreground w-5 h-5" />
                    )}
                    <span className={step.done ? "text-foreground font-medium" : "text-muted-foreground"}>
                      {step.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground flex flex-col">
          <CardHeader>
            <CardTitle>Live Preview</CardTitle>
            <CardDescription className="text-primary-foreground/80">See how your portfolio looks right now.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <div className="aspect-video bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
              <Eye className="w-12 h-12 opacity-50" />
            </div>
            <p className="text-sm">Real-time updates as you edit your profile and projects.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/preview">Open Preview</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}