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
| Three input states | **Pressed** starts a wax seal; **Held** fills its timing meter; **Released** sends the letter. | Makes one button expressive through rhythm and timing rather than movement. The visible status light teaches each state. |
| Garden letterpress | Envelopes travel along a mailroom conveyor to a flower-powered press. | Creates a fresh, non-flight gameplay loop with a clear, tactile goal. |
| Pixel desktop presentation | A faux retro application window, pastel stripes, pixel clouds, a cozy mailroom, and synthesized button sounds. | Uses the supplied pastel retro/pixel references while remaining original and lightweight. |
| High score | Deliveries and best score are displayed; best score persists locally. | Encourages replay without requiring an account or server. |

### Game mechanics

Start with the single stationary **OPEN MAILROOM** button, then use only the fixed **BLOOM PRESS** button (or the one keyboard key, **Space**):

- **Pressed:** start applying wax when a letter reaches the press.
- **Held:** keep pressing to fill the pink meter toward the little green target bar.
- **Released:** release while the meter is within the target tolerance to send a perfectly sealed letter.
- A letter that passes the press or is released too early/late costs one of three lives.

Mouse/touch movement, gestures, a control pad, voice input, and accelerometer input are not used.

### Game balance — levels of difficulty

The first batch moves slowly, and its green target bars are generous. Every perfect seal makes the conveyor a little faster and introduces more varied target lengths. The ramp rewards learning the press rhythm instead of fast reactions alone.

### Victory conditions

1. **Win / goal:** This is an endless game: seal as many letters as possible and beat the saved best score.
2. **Lose:** The mailroom closes after three missed or badly sealed letters.

## Prototype, assets, and testing

- The project is a playable browser prototype with all visual assets drawn in code, so it has no copyright or download dependency.
- Audio is synthesized in the browser after the first user interaction; it requires no audio files.
- Suggested user-test script: ask 3 players to play once without explanation, then ask (a) whether they notice pressed/held/released, (b) if the first seal target feels fair, and (c) their score. Record feedback and adjust `target`, `speed`, and seal fill values in `game.js`.

## Run locally

Open `index.html` in any modern browser, or serve this folder with a static web server. No build step is required.
