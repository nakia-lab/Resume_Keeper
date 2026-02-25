"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ResumeData, Basics, AboutData, Job, Education, Project } from '@/lib/types';

interface ResumeContextType {
  data: ResumeData;
  updateBasics: (basics: Partial<Basics>) => void;
  updateAbout: (about: Partial<AboutData>) => void;
  addJob: (job: Job) => void;
  updateJob: (id: string, job: Partial<Job>) => void;
  removeJob: (id: string) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addProject: (proj: Project) => void;
  updateProject: (id: string, proj: Partial<Project>) => void;
  removeProject: (id: string) => void;
  resetData: () => void;
}

const initialData: ResumeData = {
  basics: {
    name: '',
    label: '',
    email: '',
    phone: '',
    url: '',
    summary: '',
    location: '',
    linkedin: '',
  },
  about: {
    longAbout: '',
    shortBio: '',
    targetRoles: [],
    strengths: [],
    industries: [],
    achievements: [],
    tone: 'Professional',
  },
  experience: [],
  education: [],
  projects: [],
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<ResumeData>(initialData);

  useEffect(() => {
    const saved = localStorage.getItem('resume-keeper-data');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved data", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('resume-keeper-data', JSON.stringify(data));
  }, [data]);

  const updateBasics = (basics: Partial<Basics>) => {
    setData(prev => ({ ...prev, basics: { ...prev.basics, ...basics } }));
  };

  const updateAbout = (about: Partial<AboutData>) => {
    setData(prev => ({ ...prev, about: { ...prev.about, ...about } }));
  };

  const addJob = (job: Job) => {
    setData(prev => ({ ...prev, experience: [...prev.experience, job] }));
  };

  const updateJob = (id: string, updatedJob: Partial<Job>) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.map(j => (j.id === id ? { ...j, ...updatedJob } : j)),
    }));
  };

  const removeJob = (id: string) => {
    setData(prev => ({
      ...prev,
      experience: prev.experience.filter(j => j.id !== id),
    }));
  };

  const addEducation = (edu: Education) => {
    setData(prev => ({ ...prev, education: [...prev.education, edu] }));
  };

  const updateEducation = (id: string, updatedEdu: Partial<Education>) => {
    setData(prev => ({
      ...prev,
      education: prev.education.map(e => (e.id === id ? { ...e, ...updatedEdu } : e)),
    }));
  };

  const removeEducation = (id: string) => {
    setData(prev => ({
      ...prev,
      education: prev.education.filter(e => e.id !== id),
    }));
  };

  const addProject = (proj: Project) => {
    setData(prev => ({ ...prev, projects: [...prev.projects, proj] }));
  };

  const updateProject = (id: string, updatedProj: Partial<Project>) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => (p.id === id ? { ...p, ...updatedProj } : p)),
    }));
  };

  const removeProject = (id: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id),
    }));
  };

  const resetData = () => {
    if (confirm("Are you sure you want to delete ALL data? This cannot be undone.")) {
      setData(initialData);
      localStorage.removeItem('resume-keeper-data');
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        data,
        updateBasics,
        updateAbout,
        addJob,
        updateJob,
        removeJob,
        addEducation,
        updateEducation,
        removeEducation,
        addProject,
        updateProject,
        removeProject,
        resetData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) throw new Error("useResume must be used within a ResumeProvider");
  return context;
}