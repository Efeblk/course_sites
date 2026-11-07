#!/bin/sh
# usage: ./render.sh <CompositionId> <out.mp4>
CH="$HOME/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell"
[ -x "$CH" ] && BX="--browser-executable=$CH"
exec npx remotion render src/index.ts "$1" "$2" $BX --concurrency=3 --crf=18
