# Floating Astronaut Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A real-video astronaut fades in after the moon is gone and drifts slowly toward the cursor.

**Architecture:** A fixed `<video>` layer, blended into the sky with `mix-blend-mode: screen`. CSS scroll timeline controls its opacity. A `useAstronaut` hook in `App.tsx` runs a `requestAnimationFrame` loop that sets `translate` and `rotate` on the element.

**Tech Stack:** React 19, Vite, plain CSS, ffmpeg (local, for clip processing).

**Spec:** `docs/superpowers/specs/2026-11-21-astronaut-design.md`

## Global Constraints

- No new npm dependencies.
- Clip license allows website use without credit. Black background, arm and leg motion.
- Video files: `public/astronaut.webm` and `public/astronaut.mp4`, about 1 to 2 MB together.
- Size: about 180 px wide on desktop, 120 px on mobile.
- Hidden under `prefers-reduced-motion: reduce`.
- No em dashes in code, comments, or docs.

## Review Focus

- Touch device with no cursor: astronaut drifts around the screen, does not stay stuck at its start point.
- Window resize: astronaut stays on screen.
- Scroll back up to the hero: astronaut fades out again, the moon is not overlapped.
- Browser without `animation-timeline` support: astronaut is hidden, not shown over the moon.
- Text over the astronaut stays readable and clickable (astronaut is behind content, `pointer-events: none`).

No test runner exists in this project and these are visual behaviors, so each task verifies with `npm run lint`, `npm run build`, and a manual check in `npm run dev`.

---

### Task 1: Astronaut clip

**Files:**
- Create: `public/astronaut.webm`, `public/astronaut.mp4`

- [ ] **Step 1:** Search Pixabay, Pexels and Mixkit for a floating astronaut clip on black. Confirm its license allows use without credit. Download to the scratchpad.
- [ ] **Step 2:** With ffmpeg, trim to a 5 to 10 s segment that loops cleanly, crop to the astronaut, scale to 360 px wide, drop audio. Encode VP9 webm and H.264 mp4 (`-movflags +faststart`).
- [ ] **Step 3:** Verify: `ffprobe` shows no audio stream, width 360; `ls -lh public/astronaut.*` totals about 2 MB or less.
- [ ] If no suitable clip exists: stop and report to the user (fallback is option 1).

### Task 2: Video layer, scroll fade, cursor drift

**Files:**
- Modify: `src/App.tsx` (new `useAstronaut` hook, `<video className="astronaut">` after `.sky`)
- Modify: `src/App.css` (`.astronaut` rules, inside the existing `@supports` and reduced-motion blocks)

**Interfaces:**
- Consumes: `public/astronaut.webm`, `public/astronaut.mp4`
- Produces: `useAstronaut(el: RefObject<HTMLVideoElement | null>): void`

- [ ] **Step 1:** CSS: `.astronaut` is `position: fixed`, top-left, `z-index: -1`, `width: 180px` (120 px below 640 px), `mix-blend-mode: screen`, `pointer-events: none`, `opacity: 0` by default. Inside the `@supports (animation-timeline: view())` + `prefers-reduced-motion: no-preference` block: `animation: fade-in linear both; animation-timeline: scroll(root); animation-range: 100lvh 130lvh;`.
- [ ] **Step 2:** Hook: skip under reduced motion. Each frame: position eases 1% toward the target. Target is the last `pointermove` position (mouse only); with no mouse, the target moves to a random on-screen point every 6 to 10 s. Add a slow sine bob (about 8 px, 6 s period). Rotation follows horizontal velocity, clamped to about 15 deg. Clamp position to the viewport. Cancel the frame and remove listeners on cleanup.
- [ ] **Step 3:** Verify: `npm run lint` and `npm run build` pass. In `npm run dev`: hidden over the hero, fades in once the moon is gone, drifts slowly toward the cursor, limbs move, no black box around it, text above it stays clickable.
- [ ] **Step 4:** Commit with the spec and plan: `git add public/astronaut.* src/App.tsx src/App.css docs/superpowers && git commit -m "Astronaut floats toward the cursor after the moon fades"`
