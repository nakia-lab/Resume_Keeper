"use client";

import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Wand2, Loader2, Link as LinkIcon, FileUp, Globe } from 'lucide-react';
import { generateProjectSummaryAndBullets } from '@/ai/flows/generate-project-summary-bullets-flow';
import Image from 'next/image';

export default function ProjectsPage() {
  const { data, addProject, updateProject, removeProject } = useResume();
  const { toast } = useToast();
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  const onAddProject = () => {
    addProject({
      id: Math.random().toString(36).substr(2, 9),
      name: 'New Project',
      role: 'Lead Developer',
      techStack: [],
      evidenceUrl: '',
      imageUrl: '',
      firebaseUrl: '',
      summary: '',
      bullets: ['', '', '']
    });
  };

  const onGenerateProjectAI = async (id: string) => {
    const project = data.projects.find(p => p.id === id);
    if (!project) return;

    if (!project.evidenceUrl && !project.summary) {
      toast({ variant: "destructive", title: "Missing Info", description: "Please provide an evidence URL or a draft summary first." });
      return;
    }

    setGeneratingId(id);
    try {
      const result = await generateProjectSummaryAndBullets({
        projectName: project.name,
        role: project.role,
        techStack: project.techStack,
        evidenceTextOrUrlSummary: project.evidenceUrl || project.summary,
      });
      updateProject(id, { 
        summary: result.summary, 
        bullets: result.bullets as [string, string, string] 
      });
      toast({ title: "Magic!", description: "Project summary and bullets generated." });
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: "Failed to generate AI summary." });
    } finally {
      setGeneratingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-headline font-bold">Projects Portfolio</h1>
          <p className="text-muted-foreground">Showcase your best work with evidence links and AI summaries.</p>
        </div>
        <Button onClick={onAddProject} className="gap-2">
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </header>

      <div className="grid grid-cols-1 gap-8">
        {data.projects.map((project) => (
          <Card key={project.id} className="relative group overflow-hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
              onClick={() => removeProject(project.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className="p-6 bg-muted/30 border-r border-border space-y-4">
                <div className="aspect-video bg-muted rounded-lg relative overflow-hidden flex items-center justify-center border-2 border-dashed border-border group/img">
                  {project.imageUrl ? (
                    <Image 
                      src={project.imageUrl} 
                      alt={project.name} 
                      fill 
                      className="object-cover" 
                      data-ai-hint="project visual"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <FileUp className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Add image URL below</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">Project Visual</Label>
                  <Input 
                    placeholder="Image URL (Unsplash/Picsum)" 
                    value={project.imageUrl} 
                    onChange={e => updateProject(project.id, { imageUrl: e.target.value })} 
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs uppercase font-bold text-muted-foreground">Links</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground shrink-0" />
                      <Input 
                        placeholder="Live Evidence/URL" 
                        value={project.evidenceUrl} 
                        onChange={e => updateProject(project.id, { evidenceUrl: e.target.value })} 
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <Input 
                        placeholder="Firebase/GitHub Link" 
                        value={project.firebaseUrl} 
                        onChange={e => updateProject(project.id, { firebaseUrl: e.target.value })} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input 
                      value={project.name} 
                      onChange={e => updateProject(project.id, { name: e.target.value })} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Your Role</Label>
                    <Input 
                      value={project.role} 
                      onChange={e => updateProject(project.id, { role: e.target.value })} 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tech Stack (comma separated)</Label>
                  <Input 
                    placeholder="React, Firebase, Tailwind" 
                    value={project.techStack.join(', ')} 
                    onChange={e => updateProject(project.id, { techStack: e.target.value.split(',').map(s => s.trim()) })} 
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Project Summary</Label>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-2 border-primary/40 h-8"
                      onClick={() => onGenerateProjectAI(project.id)}
                      disabled={generatingId === project.id}
                    >
                      {generatingId === project.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                      Generate Summary
                    </Button>
                  </div>
                  <Textarea 
                    value={project.summary} 
                    onChange={e => updateProject(project.id, { summary: e.target.value })}
                    placeholder="Draft summary or AI output will appear here..."
                  />
                </div>

                <div className="space-y-2">
                  <Label>Key Highlights (Exactly 3)</Label>
                  <div className="grid gap-2">
                    {project.bullets.map((bullet, idx) => (
                      <Input 
                        key={idx}
                        value={bullet}
                        onChange={e => {
                          const newBullets = [...project.bullets] as [string, string, string];
                          newBullets[idx] = e.target.value;
                          updateProject(project.id, { bullets: newBullets });
                        }}
                        placeholder={`Highlight ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
        {data.projects.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-xl">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-bold">No projects yet</h3>
            <p className="text-muted-foreground mb-6">Add your first project to start building your portfolio.</p>
            <Button onClick={onAddProject} size="lg">Add My First Project</Button>
          </div>
        )}
      </div>
    </div>
  );
}

import { Briefcase } from 'lucide-react';
