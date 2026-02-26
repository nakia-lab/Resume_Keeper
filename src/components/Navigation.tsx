"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User, Briefcase, LayoutDashboard, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Overview', icon: LayoutDashboard },
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/projects', label: 'Projects', icon: Briefcase },
    { href: '/preview', label: 'Preview', icon: Eye },
  ];

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 bg-white/20 backdrop-blur-3xl border-r border-white/40 hidden md:flex flex-col p-8 z-40">
      <div className="mb-12 px-2">
        <h1 className="text-2xl font-headline font-bold text-primary flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-[0_8px_16px_rgba(150,242,221,0.3)] rotate-3">
            R
          </div>
          <span className="tracking-tighter drop-shadow-md text-foreground">Resume Keeper</span>
        </h1>
      </div>
      <div className="space-y-3">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-4 px-5 py-4 rounded-2xl transition-all font-bold text-sm group",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-[0_12px_24px_-8px_rgba(150,242,221,0.5)] scale-[1.05]" 
                  : "text-muted-foreground hover:bg-white/40 hover:text-foreground hover:translate-x-2"
              )}
            >
              <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-125", isActive ? "text-primary-foreground" : "text-primary")} />
              {link.label}
            </Link>
          );
        })}
      </div>
      <div className="mt-auto p-6 bg-white/20 backdrop-blur-md rounded-[2rem] border border-white/40 shadow-inner">
        <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary mb-2 opacity-80">Design System</p>
        <p className="text-sm font-bold text-foreground drop-shadow-sm">Tropical Lush v2</p>
      </div>
    </nav>
  );
}
