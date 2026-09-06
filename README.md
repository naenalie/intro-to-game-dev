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
| Three input states | **Pressed** chooses a stamp or arms dispatch, **Held** pours wax, and **Released** validates the wax or sends the parcel. | Makes one stationary button meaningful in three clearly different ways. |
| Postcard assembly line | Each package travels through a stamp carousel, wax station, and dispatch platform. | A package is a short three-part challenge instead of a repeated tap loop. |
| Changing timing puzzles | The player reads a rotating stamp selector, a wax target meter, and a moving train platform. | Every station asks for a different skill: observation, controlled hold, then release timing. |
| Bouquet combo & golden mail | Three consecutive perfect seals unlock a golden letter worth two points. Each letter also reveals a new garden destination. | Gives a short, satisfying story-like progression and rewards consistent timing. |
| Five-level garden map | The first five routes unlock in order; levels 6–8 stay visibly locked. Each level has a completion target, a faster conveyor, and a larger mix of job cards. | Creates a clear start-to-finish learning curve instead of an unstructured endless loop. |
| Pixel desktop presentation | A faux retro application window, pastel stripes, pixel clouds, a cozy mailroom, and synthesized button sounds. | Uses the supplied pastel retro/pixel references while remaining original and lightweight. |
| High score | Deliveries and best score are displayed; best score persists locally. | Encourages replay without requiring an account or server. |

### Game mechanics

Start with the single stationary **START LEVEL** button, then use only the fixed **BLOOM PRESS** button (or the one keyboard key, **Space**) for every in-game action:

- **Stamp match:** watch the stamp carousel and press when its highlighted icon matches the icon on the package.
- **Wax seal:** hold to fill the pink meter to its green target, then release.
- **Dispatch:** press to load the train, then release while the parcel is over the green platform.
- A letter that passes the press or is released too early/late costs one of three lives.
- Complete the displayed package target to unlock the next level. Each level speeds up all three stations.

Mouse/touch movement, gestures, a control pad, voice input, and accelerometer input are not used.

### Game balance — levels of difficulty

Level 1 has three packages at a gentle pace. Levels 2–5 increase package targets (4–7) and accelerate the carousel, wax fill, and train timing together. The ramp rewards learning all three gestures rather than fast tapping alone.

### Victory conditions

1. **Win / goal:** This is an endless game: seal as many letters as possible and beat the saved best score.
2. **Lose:** The mailroom closes after three missed or badly sealed letters.

## Prototype, assets, and testing

- The project is a playable browser prototype with all visual assets drawn in code, so it has no copyright or download dependency.
- Audio is synthesized in the browser after the first user interaction: a continuous warm jazz chord bed plays from game start to game over. Sound effects now occur only for meaningful player actions—stamp choice, beginning wax, sending a package, an error, or completing a level—so no unrelated repeating effect competes with the music.
- Suggested user-test script: ask 3 players to play once without explanation, then ask (a) whether they notice pressed/held/released, (b) if the first seal target feels fair, and (c) their score. Record feedback and adjust `target`, `speed`, and seal fill values in `game.js`.

## Run locally

Open `index.html` in any modern browser, or serve this folder with a static web server. No build step is required.
