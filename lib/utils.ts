import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to prepend basePath to image URLs for GitHub Pages
export function getImagePath(path: string): string {
  const basePath = process.env.NODE_ENV === 'production' ? '/project-3' : ''
  return `${basePath}${path}`
}
