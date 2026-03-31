
​🦄 CityUnicorn: Neon Pong
​An instant-play, retro-style game built for the mobile browser.
​🚀 Features
​Zero Install: Runs directly in any mobile browser via GitHub Pages.
​Auto-Mobile Controls: If you’re on a phone, a virtual gamepad appears automatically—no setup required!

​🛠️ How it was Built (The Mobile Workflow)
​This project was developed entirely on a Samsung Galaxy A05s using Termux. I chose not to stick to the strict 64KB cartridge limit.

​The Build Process:
# 1. Initialize the project
w4 init neon-pong

# 2. Compile and Bundle
# We used this specific line to bake the sound engine and logic into one HTML file:
w4 bundle build/cart.wasm --html index.html

📜 Credits & Licensing
​"This site hosts games built with the WASM-4 Fantasy Console (ISC License). Audio, Netplay, and Input systems are powered by the WASM-4 runtime."
​Basically, index.html was made using the WASM-4 engine. Gemini AI and I worked together to change the colors and convert the TypeScript logic into a standalone web file using Termux.

​WASM-4 License (ISC)
Copyright (c) Bruno Garcia

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
