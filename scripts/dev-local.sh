#!/bin/bash
set -e

cleaned=0
cleanup() {
  if [ "$cleaned" -eq 1 ]; then
    return
  fi
  cleaned=1
  echo ""
  echo "Stopping Supabase..."
  yarn supabase:stop
}

trap cleanup EXIT INT TERM

yarn supabase:start
yarn dev
