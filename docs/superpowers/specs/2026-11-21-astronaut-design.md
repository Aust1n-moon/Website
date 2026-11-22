# Floating astronaut

## Intent
After the moon fades out (at the Co-op section), a realistic astronaut floats in the sky and drifts slowly toward the cursor, like zero gravity, with visible arm and leg motion.

## Approaches
1. Photo cut into parts, rotated at the joints. Real look, but stiff joints, and needs a cutout image.
2. Real stock video loop on black, blended into the sky. Real look and real limb motion. **Picked.**
3. Whole photo, body motion only. No limb motion, so it does not meet the request.

Fallback: if no clip with a suitable license exists, return to the user before starting option 1.

Revision: the first clip (front view, waving) was rejected as unrealistic. A Lottie animation was considered and dropped: none was realistic. The user wants a side view and natural floating, muted colors. The user then supplied a cartoon astronaut image to use instead.

## Design
- Image: the user's black-and-white cartoon astronaut, cut out to a transparent PNG (`public/astronaut.png`, 90 x 88 px). Still image: it floats, drifts and tumbles as one piece, with no limb motion.
- Appear: 1.5 s opacity transition, toggled by the animation loop once scroll passes 95% of a screen. Does not depend on page length.
- Motion: `requestAnimationFrame` loop, eases 0.15% per 60 Hz frame toward the cursor (scaled by elapsed time), slow bob, slight tilt toward drift direction, and a slow tumble of one turn a minute. With no cursor (touch), drift slowly around the screen.
- Size: 130 px wide on desktop, 90 px on mobile.
- Reduced motion: hidden.

## Non-goals
No physics engine, no new dependencies, no use of the paid stock photo the user sent as reference.
