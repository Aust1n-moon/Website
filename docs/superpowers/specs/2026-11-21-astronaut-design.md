# Floating astronaut

## Intent
After the moon fades out, an astronaut on an oxygen hose floats in the sky and drifts slowly toward the cursor, like zero gravity. The original request asked for a realistic astronaut with limb motion; see Revision.

## Approaches
1. Photo cut into parts, rotated at the joints. Real look, but stiff joints, and needs a cutout image.
2. Real stock video loop on black, blended into the sky. Real look and real limb motion. **Picked.**
3. Whole photo, body motion only. No limb motion, so it does not meet the request.

Fallback: if no clip with a suitable license exists, return to the user before starting option 1.

Revision: the video clips (front view, then a waving 3D model) were rejected as unrealistic or not side view. A Lottie animation was considered and dropped. The user then tried several still images and settled on a small cartoon spacewalker, with a separate animated hose.

## Design
- Image: the user's cartoon spacewalker, cut out to a transparent PNG (`public/astronaut.png`, 163 x 154 px) without the tether drawn in the source. Visor and inner lines are solid black. Still image: no limb motion.
- Size: 60 px wide on desktop, 44 px below 640 px; `aspect-ratio` matches the PNG. `filter: brightness(0.8)` tones down the white.
- Appear: waits off the left edge. Once scroll passes 95% of a screen, a 1.5 s opacity transition shows it and it floats in at 90 px/s toward 40% across the screen. Does not depend on page length.
- Motion: `requestAnimationFrame` loop, frame-rate independent. Velocity eases toward a capped 30 px/s, slowing over the last 100 px. Heads for the cursor while the mouse moves; otherwise roams to random on-screen spots, picking a new one on arrival. Roams the whole screen on every device. Slow bob of 6 px.
- Rotation: the head turns toward the target (the cursor while it moves), at most 12 degrees a second, within 45 degrees of upright, plus a 5 degree sway. Holds its angle within 40 px of the target; when the target is nearly straight below, stays on its current side.
- Hose: SVG path from off-screen on the left edge, 35% down the screen, to the astronaut's hip (rotated with it). Catmull-Rom curve through 4 inner points that sway on uneven sine waves, with more slack when the astronaut is close. Light grey, 2.5 px.
- Reduced motion: hidden.

## Non-goals
No physics engine, no new dependencies, no use of the paid stock photo the user sent as reference.
