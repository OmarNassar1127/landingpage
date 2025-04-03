# 3D Animation Component for NexBuy

This directory contains a stunning 3D animation component that adds a "wow" factor to your NexBuy website.

## Installation

To enable the 3D animation, you need to install the required Three.js packages:

```bash
npm install three @react-three/fiber @react-three/drei
```

## Using the Animation

Once you've installed the dependencies, you can use the actual ThreeJS implementation by renaming or modifying the import in your Hero component:

```typescript
// Change from
import HeroAnimation from "@/components/animations/3d/ThreeJSAnimation";

// To
import HeroAnimation from "@/components/animations/3d/ThreeJSAnimation";
```

## What's Included

1. **HeroAnimation.tsx** - A placeholder component that shows installation instructions when Three.js is not installed
2. **ThreeJSAnimation.tsx** - The actual 3D animation that displays a modern building being constructed in real-time
3. **utils.ts** - Utility functions for checking dependencies and providing installation instructions

## Features

- Interactive 3D building construction animation
- Smooth animations with staggered block appearance
- Particle effects and ambient lighting
- Interactive controls for rotating and exploring the 3D scene
- Responsive design that works on all screen sizes
- Perfectly integrated with your existing design

## Customization

You can customize the animation by modifying the `ThreeJSAnimation.tsx` file. Some ideas:

- Change colors of building blocks
- Adjust animation timing
- Add your own 3D models
- Modify the text or overall theme

## Troubleshooting

If you encounter any issues:

1. Make sure you've installed all three packages: `three`, `@react-three/fiber`, and `@react-three/drei`
2. Check that the `fonts` directory exists in your public folder
3. Ensure your environment supports WebGL (required for Three.js)

For more complex customizations, refer to the [Three.js documentation](https://threejs.org/docs/), [React Three Fiber docs](https://docs.pmnd.rs/react-three-fiber/), and [Drei documentation](https://github.com/pmndrs/drei).
