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
    <nav className="fixed left-0 top-0 h-screen w-64 bg-card/70 backdrop-blur-xl border-r border-border hidden md:flex flex-col p-6 z-40">
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-headline font-bold text-primary flex items-center gap-2">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/30">
            R
          </div>
          <span className="tracking-tight">Resume Keeper</span>
        </h1>
      </div>
      <div className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-semibold text-sm group",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20 scale-[1.02]" 
                  : "text-muted-foreground hover:bg-white/50 hover:text-foreground hover:translate-x-1"
              )}
            >
              <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "text-primary-foreground" : "text-primary")} />
              {link.label}
            </Link>
          );
        })}
      </div>
      <div className="mt-auto p-4 bg-primary/10 rounded-2xl border border-primary/20">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Theme</p>
        <p className="text-xs font-medium text-foreground/80">Tropical Mode</p>
      </div>
    </nav>
  );
}
