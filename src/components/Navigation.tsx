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
    <nav className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border hidden md:flex flex-col p-6 z-40">
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-headline font-bold text-primary flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">R</div>
          Resume Keeper
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
                "flex items-center gap-3 px-4 py-3 rounded-md transition-all font-medium text-sm group",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-primary-foreground" : "text-primary")} />
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
