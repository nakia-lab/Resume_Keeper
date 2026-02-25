export interface Basics {
  name: string;
  label: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: string;
  linkedin: string;
}

export interface AboutData {
  longAbout: string;
  shortBio: string;
  targetRoles: string[];
  strengths: string[];
  industries: string[];
  achievements: string[];
  tone: string;
}

export interface Job {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: [string, string, string];
}

export interface Education {
  id: string;
  institution: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
}

export interface Project {
  id: string;
  name: string;
  role: string;
  techStack: string[];
  evidenceUrl?: string;
  imageUrl?: string;
  firebaseUrl?: string;
  summary: string;
  bullets: [string, string, string];
}

export interface ResumeData {
  basics: Basics;
  about: AboutData;
  experience: Job[];
  education: Education[];
  projects: Project[];
}