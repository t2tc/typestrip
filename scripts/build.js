import { build } from 'esbuild';

// ESM build for browser
await build({
  entryPoints: ['typestrip.ts'],
  outfile: 'dist/typestrip.mjs',
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  bundle: true,
  minify: true,
  sourcemap: true,
  external: ['@babel/core', '@babel/preset-typescript', 'assert', 'path', 'fs'],
});
