import { execFileSync } from 'node:child_process';

execFileSync('npx', [
  '--yes',
  'esbuild@0.25.0',
  'vendor/openipa/src/transcription/french/ParseFrench.ts',
  '--bundle',
  '--format=esm',
  '--platform=browser',
  '--target=es2020',
  '--outfile=src/openipa-french.js',
  '--banner:js=/* OpenIPA French engine; AGPL-3.0; see THIRD_PARTY_NOTICES.md */',
], { stdio: 'inherit' });
