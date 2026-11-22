# Floating astronaut

## Intent
After the moon fades out (at the Co-op section), a realistic astronaut floats in the sky and drifts slowly toward the cursor, like zero gravity, with visible arm and leg motion.

## Approaches
1. Photo cut into parts, rotated at the joints. Real look, but stiff joints, and needs a cutout image.
2. Real stock video loop on black, blended into the sky. Real look and real limb motion. **Picked.**
3. Whole photo, body motion only. No limb motion, so it does not meet the request.

Fallback: if no clip with a suitable license exists, return to the user before starting option 1.

## Design
- Clip: free stock video (Pixabay, Pexels or Mixkit) with a license that allows website use without credit. Black background, 5 to 10 s loop, arm and leg motion. Trim and compress with ffmpeg to `public/astronaut.webm` and `public/astronaut.mp4`, about 1 to 2 MB.
- Blend: fixed `<video autoplay muted loop playsinline>` with `mix-blend-mode: screen`. Behind page text, like `.sky`. `pointer-events: none`.
- Appear: opacity on the `scroll(root)` timeline, fades in just after `100lvh`.
- Motion: `requestAnimationFrame` loop, eases about 1% per frame toward the cursor, slow bob, slight tilt toward drift direction. With no cursor (touch), drift slowly around the screen.
- Size: about 180 px wide on desktop, 120 px on mobile.
- Reduced motion: hidden.

## Non-goals
No physics engine, no new dependencies, no use of the paid stock photo the user sent as reference.
