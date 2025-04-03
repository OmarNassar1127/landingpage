# NexBuy Landing Page

A modern, responsive landing page built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- Responsive design for all screen sizes
- Dark and light mode support
- Smooth animations with Framer Motion
- SEO optimized
- Component-based architecture
- Contact form

## Project Structure

```
nexbuy/
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout with theme provider
│   │   └── page.tsx            # Main landing page
│   ├── components/
│   │   ├── layout/             # Layout components
│   │   │   └── theme-provider.tsx
│   │   ├── sections/           # Page sections
│   │   │   ├── navbar.tsx
│   │   │   ├── hero.tsx
│   │   │   ├── projects.tsx
│   │   │   ├── about.tsx
│   │   │   ├── contact.tsx
│   │   │   └── footer.tsx
│   │   └── ui/                 # Reusable UI components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── theme-toggle.tsx
│   └── lib/
│       └── utils.ts            # Utility functions
├── tailwind.config.js          # Tailwind configuration
├── package.json                # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
- [Next Themes](https://github.com/pacocoursey/next-themes)

## Custom Components

- Custom animated Button component
- Responsive Navbar with mobile menu
- Project cards with tech stack badges
- Animated sections with scroll-based triggers
- Dark/light mode toggle
- Contact form with validation
