'use client';

import React from 'react';

interface HashLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

// A custom component that uses hash-based navigation for GitHub Pages
export function HashLink({ to, children, className }: HashLinkProps) {
  // Remove the leading slash to create proper hash URLs
  const hashPath = to.startsWith('/') ? to.substring(1) : to;
  
  return (
    <a 
      href={`#/${hashPath}`} 
      className={className}
      onClick={(e) => {
        // Update the URL without page reload
        window.location.hash = `/${hashPath}`;
      }}
    >
      {children}
    </a>
  );
}