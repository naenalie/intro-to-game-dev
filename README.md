# Petal Press! ✿

Play the published game at: **https://naenalie.github.io/intro-to-game-dev/** (available after GitHub Pages finishes deploying).

## Game Design Document

### Game title
**Petal Press!**

### Game genre
One-button mailroom rhythm / timing game.

### Core features

| Feature | What it does | Why it matters |
| --- | --- | --- |
| One stationary Bloom Press button | The on-screen `BLOOM PRESS` button stays at the bottom centre. It also maps to the single physical **Space** key. | Meets the One Button Challenge and keeps the game instantly understandable. |
| Three input states | **Pressed** starts a wax seal or makes a tap; **Held** fills a seal meter; **Released** sends a sealed letter. | Makes one button expressive through rhythm and timing rather than movement. The visible status light teaches each state. |
| Garden letterpress | Envelopes travel along a mailroom conveyor to a flower-powered press. | Creates a fresh, non-flight gameplay loop with a clear, tactile goal. |
| Changing shift jobs | Every envelope requests one of three jobs: wax seal, express tap, or two-tap ribbon tie. | Prevents the loop becoming a single repeated gesture while preserving the one-button rule. |
| Bouquet combo & golden mail | Three consecutive perfect seals unlock a golden letter worth two points. Each letter also reveals a new garden destination. | Gives a short, satisfying story-like progression and rewards consistent timing. |
| Five-level garden map | The first five routes unlock in order; levels 6–8 stay visibly locked. Each level has a completion target, a faster conveyor, and a larger mix of job cards. | Creates a clear start-to-finish learning curve instead of an unstructured endless loop. |
| Pixel desktop presentation | A faux retro application window, pastel stripes, pixel clouds, a cozy mailroom, and synthesized button sounds. | Uses the supplied pastel retro/pixel references while remaining original and lightweight. |
| High score | Deliveries and best score are displayed; best score persists locally. | Encourages replay without requiring an account or server. |

### Game mechanics

Start with the single stationary **OPEN MAILROOM** button, then use only the fixed **BLOOM PRESS** button (or the one keyboard key, **Space**):

- **Wax seal:** press and hold to fill the pink meter to its green target, then release.
- **Express ticket:** press once while it is under the press.
- **Ribbon parcel:** press twice before it leaves the press.
- A letter that passes the press or is released too early/late costs one of three lives.
- Make three perfect seals in a row to receive a **golden letter** worth two points.
- Complete the displayed letter target to unlock the next level. Level 1 teaches seals; later levels introduce express and ribbon jobs at increasing conveyor speeds.

Mouse/touch movement, gestures, a control pad, voice input, and accelerometer input are not used.

### Game balance — levels of difficulty

Level 1 starts with slow wax seals and a target of 5 letters. Levels 2–5 progressively raise the target (7, 9, 11, and 13), increase base conveyor speed, and add express/ribbon job cards. Every successful letter adds a small further speed increase. The ramp rewards learning the press rhythm instead of fast reactions alone.

### Victory conditions

1. **Win / goal:** This is an endless game: seal as many letters as possible and beat the saved best score.
2. **Lose:** The mailroom closes after three missed or badly sealed letters.

## Prototype, assets, and testing

- The project is a playable browser prototype with all visual assets drawn in code, so it has no copyright or download dependency.
- Audio is synthesized in the browser after the first user interaction: a louder continuous procedural jazz loop (bass, gentle chords, and brushed percussion) plays from game start to game over, with distinct button, wax-fill, perfect-seal, and error sounds over it. It requires no audio files.
- Suggested user-test script: ask 3 players to play once without explanation, then ask (a) whether they notice pressed/held/released, (b) if the first seal target feels fair, and (c) their score. Record feedback and adjust `target`, `speed`, and seal fill values in `game.js`.

## Run locally

Open `index.html` in any modern browser, or serve this folder with a static web server. No build step is required.
