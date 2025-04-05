"use client";

import React, { useEffect, useState } from "react";
import { LucideProps } from "lucide-react";

interface IconProps extends LucideProps {
  icon: React.ElementType;
}

// This is a wrapper component for Lucide icons that handles hydration mismatches
export function Icon({ icon: LucideIcon, ...props }: IconProps) {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    // Return an empty div with the same dimensions while the component is not mounted
    // This prevents layout shifts while avoiding hydration mismatches
    return <div style={{ width: props.size || props.width || "1em", height: props.size || props.height || "1em" }} />;
  }
  
  return <LucideIcon {...props} />;
}
