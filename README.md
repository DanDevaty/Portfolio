# dandev.cz

Portfolio a CV Daniela Devátého: **https://dandev.cz**

Statický web bez buildu (HTML, CSS, trochu JS), česky i anglicky. Design vznikl v Claude Design.

- `index.html` – celý web, přepínač CZ/EN, filtr projektů
- `cv-src/cv.html` → `cv-daniel-devaty.pdf` a `cv-daniel-devaty-en.pdf` (`./build-cv.sh`, potřebuje Google Chrome)
- `img/`, `fonts/` – screenshoty appek a písma (Bricolage Grotesque a JetBrains Mono, licence OFL)
- `./deploy.sh` – nahraje web na server (nastavení v `deploy.env`, vzor `deploy.env.example`)

Lokálně: `python3 -m http.server` a otevřít http://localhost:8000.

© 2026 Daniel Devátý
