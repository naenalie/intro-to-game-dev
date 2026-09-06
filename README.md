# Petal Post! ✿

Play the published game at: **https://naenalie.github.io/intro-to-game-dev/** (available after GitHub Pages finishes deploying).

## Game Design Document

### Game title
**Petal Post!**

### Game genre
One-button arcade / endless score-chaser.

### Core features

| Feature | What it does | Why it matters |
| --- | --- | --- |
| One stationary Bloom button | The on-screen `BLOOM` button stays at the bottom centre. It also maps to the single physical **Space** key. | Meets the One Button Challenge and keeps the game instantly understandable. |
| Three input states | **Pressed** gives the courier a petal puff upward; **Held** slows its fall into a soft float; **Released** returns it to a gentle fall. | Makes one button expressive instead of just being a tap control. The visible status light teaches each state. |
| Letter-garden route | Steer a tiny envelope courier through changing gaps between flower hedges. | Gives the player a rhythmic, readable survival challenge. |
| Pixel desktop presentation | A faux retro application window, pastel stripes, pixel clouds, flower hedges, and synthesized button sounds. | Uses the supplied pastel retro/pixel references while remaining original and lightweight. |
| High score | Deliveries and best score are displayed; best score persists locally. | Encourages replay without requiring an account or server. |

### Game mechanics

Start with the single stationary **START DELIVERY** button, then use only the fixed **BLOOM** button (or the one keyboard key, **Space**):

- **Pressed:** each fresh press gives one upward puff.
- **Held:** holding reduces gravity, creating a controlled float.
- **Released:** the courier falls normally.
- Pass through a hedge opening to deliver a letter and earn one point. Touch a hedge, the ceiling, or the ground to end the delivery.

Mouse/touch movement, gestures, a control pad, voice input, and accelerometer input are not used.

### Game balance — levels of difficulty

The first route has wide, friendly openings and a slow scroll speed. Every delivery makes the garden scroll a little faster and narrows future openings (down to a safe minimum). This creates a smooth difficulty ramp rather than separate hard jumps.

### Victory conditions

1. **Win / goal:** This is an endless game: the goal is to make the highest possible number of deliveries and beat the saved best score.
2. **Lose:** The delivery ends when the envelope courier hits a hedge, the top edge, or the garden floor.

## Prototype, assets, and testing

- The project is a playable browser prototype with all visual assets drawn in code, so it has no copyright or download dependency.
- Audio is synthesized in the browser after the first user interaction; it requires no audio files.
- Suggested user-test script: ask 3 players to play once without explanation, then ask (a) whether they notice pressed/held/released, (b) if the first gap feels fair, and (c) their score. Record feedback and adjust `gap`, `speed`, and gravity values in `game.js`.

## Run locally

Open `index.html` in any modern browser, or serve this folder with a static web server. No build step is required.
