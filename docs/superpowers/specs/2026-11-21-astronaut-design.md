# Floating astronaut

## Intent
After the moon fades out (at the Co-op section), a realistic astronaut floats in the sky and drifts slowly toward the cursor, like zero gravity, with visible arm and leg motion.

## Approaches
1. Photo cut into parts, rotated at the joints. Real look, but stiff joints, and needs a cutout image.
2. Real stock video loop on black, blended into the sky. Real look and real limb motion. **Picked.**
3. Whole photo, body motion only. No limb motion, so it does not meet the request.

Fallback: if no clip with a suitable license exists, return to the user before starting option 1.

Revision: the first clip (front view, waving) was rejected as unrealistic. A Lottie animation was considered and dropped: none was realistic. The user wants a side view and natural floating, muted colors.

## Design
- Clip: realistic 3D astronaut idling in zero gravity, three-quarter side view, no waving (Pixabay 222138, green screen, Pixabay Content License). Keyed onto pure black, seamless 8.2 s loop, smoothed from 10 to 30 fps, encoded to `public/astronaut.webm` and `public/astronaut.mp4`.
- Blend: fixed `<video autoplay muted loop playsinline>` with `mix-blend-mode: screen`, so the black drops out. Behind page text, like `.sky`. `pointer-events: none`.
- Appear: 1.5 s opacity transition, toggled by the animation loop once scroll passes 95% of a screen. Does not depend on page length.
- Motion: `requestAnimationFrame` loop, eases 0.15% per 60 Hz frame toward the cursor (scaled by elapsed time), slow bob, slight tilt toward drift direction, and a slow tumble of one turn a minute. With no cursor (touch), drift slowly around the screen.
- Size: 130 px wide on desktop, 90 px on mobile.
- Reduced motion: hidden.

## Non-goals
No physics engine, no new dependencies, no use of the paid stock photo the user sent as reference.
