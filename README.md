# Virelio Website

This is the source code for the Virelio corporate website, built with Next.js and deployed to GitHub Pages.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The development server will be available at [http://localhost:3000](http://localhost:3000).

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch, using GitHub Actions.

For manual deployment:

```bash
# Build and deploy
npm run deploy
```

## Structure

- `/src/app` - Next.js app router pages and layouts
- `/src/components` - React components
- `/src/lib` - Utility functions and configuration
- `/public` - Static assets

## Custom Domain

The website is configured to deploy to [https://virelio.nl](https://virelio.nl) via GitHub Pages.
