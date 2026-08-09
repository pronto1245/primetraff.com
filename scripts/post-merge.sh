#!/bin/bash
set -e

echo "Running post-merge setup..."

# Install root dependencies
npm install --prefer-offline 2>/dev/null || npm install

# Install mockup sandbox dependencies if needed
if [ -f "artifacts/mockup-sandbox/package.json" ]; then
  cd artifacts/mockup-sandbox
  npm install --prefer-offline 2>/dev/null || npm install
  cd ../..
fi

echo "Post-merge setup complete."
