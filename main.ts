import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from './parse.js';
const input = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const output = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const cases = JSON.parse(readFileSync(join(input, 'cases.json'), 'utf8'));
mkdirSync(output, { recursive: true });
writeFileSync(join(output, 'html.json'), JSON.stringify(cases.map((entry: { markdown: string }) => parse(entry.markdown))));
