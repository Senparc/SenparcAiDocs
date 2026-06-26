#!/usr/bin/env sh
set -eu

PORT="${PORT:-}"
if [ -z "$PORT" ]; then
  for p in 8090 8082 8081 5173 3000; do
    if ! lsof -nP -iTCP:"$p" -sTCP:LISTEN >/dev/null 2>&1; then
      PORT="$p"
      break
    fi
  done
fi

if [ -z "$PORT" ]; then
  echo "No available port found in: 8090 8082 8081 5173 3000" >&2
  exit 1
fi

export DOCS_BUNDLER=webpack
exec vuepress dev docs --clean-cache --clean-temp --host 127.0.0.1 --port "$PORT"
