#!/bin/sh
# Nasadí portfolio na https://dandev.cz (rsync jen veřejných souborů na server).
#   ./deploy.sh
# Server, port, klíč a cílová složka jsou v deploy.env (mimo git), vzor je deploy.env.example.
# Nejdřív vygeneruj CV: ./build-cv.sh
set -eu
cd "$(dirname "$0")"
[ -f deploy.env ] && . ./deploy.env
: "${DEPLOY_TARGET:?nastav DEPLOY_TARGET v deploy.env}"
: "${DEPLOY_PATH:?nastav DEPLOY_PATH v deploy.env}"
SSH="ssh -p ${DEPLOY_PORT:-22} ${DEPLOY_KEY:+-i $DEPLOY_KEY -o IdentitiesOnly=yes} -o ControlPath=$HOME/.ssh/cm-dandev -o ControlMaster=auto -o ControlPersist=5m"

# Obsah složky se přepíše, složka sama zůstane (web server ji má připojenou).
rsync -rlt --delete -e "$SSH" \
  --include='/index.html' --include='/favicon.svg' \
  --include='/cv-daniel-devaty.pdf' --include='/cv-daniel-devaty-en.pdf' \
  --include='/img/***' --include='/fonts/***' --include='/video/***' --exclude='*' \
  ./ "$DEPLOY_TARGET:$DEPLOY_PATH/"

echo "→ kontrola"
for p in / /cv-daniel-devaty.pdf /cv-daniel-devaty-en.pdf /img/og.jpg /fonts/bricolage-800.ttf; do
  printf '%s  ' "$p"; curl -s -o /dev/null -w '%{http_code}\n' "https://dandev.cz$p"
done
