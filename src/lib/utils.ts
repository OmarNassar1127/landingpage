import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTechStack(stack: string): string[] {
  // This will ensure consistent naming for technologies
  const standardNames: Record<string, string> = {
    "ReactNative": "React Native",
    "React-Native": "React Native",
    "Next.js": "Next.js",
    "Node.js": "Node.js"
  };
  
  return stack.split(/\s+/).map(tech => {
    return standardNames[tech] || tech;
  });
}
