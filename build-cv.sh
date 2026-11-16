#!/bin/sh
# Vygeneruje CV do PDF (CZ a EN) z cv-src/cv.html přes Google Chrome bez okna.
set -eu
cd "$(dirname "$0")"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
for l in cs en; do
  out=cv-daniel-devaty.pdf
  [ "$l" = en ] && out=cv-daniel-devaty-en.pdf
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf="$PWD/$out" "file://$PWD/cv-src/cv.html?lang=$l" 2>/dev/null
  echo "$out"
done
