#!/usr/bin/env node
/**
 * ag-skills-pro CLI
 *
 * Scaffolds a `.agent/` profile (skills, workflows, rules, config) into the
 * current working directory so Google Antigravity can pick them up.
 */

import { cpSync, existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PKG_ROOT = resolve(__dirname, '..');
const TEMPLATE_DIR = join(PKG_ROOT, 'template');
const TARGET_DIR_NAME = '.agent';

// Files inside .agent/ that the user is expected to customize.
// On --force re-run, if the target already has these, keep the user's version.
// Skills, rules, and workflows are always overwritten — they are the package contract.
const PRESERVE_ON_UPDATE = new Set(['config.yml']);

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('-')));
const command = args.find((a) => !a.startsWith('-'));

const HELP = `ag-skills-pro — Antigravity skills scaffolder

Usage:
  npx ag-skills-pro init [--force] [--dry-run]

Commands:
  init           Scaffold .agent/ into the current directory.

Flags:
  --force        Overwrite an existing .agent/ folder.
  --dry-run      Print what would be written without touching disk.
  -h, --help     Show this help.
  -v, --version  Show CLI version.
`;

const askedHelp = flags.has('-h') || flags.has('--help') || command === 'help';
const askedVersion = flags.has('-v') || flags.has('--version') || command === 'version';

if (askedHelp) {
  process.stdout.write(HELP);
  process.exit(0);
} else if (askedVersion) {
  const json = JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf8'));
  process.stdout.write(`${json.version}\n`);
  process.exit(0);
} else if (!command) {
  process.stdout.write(HELP);
  process.exit(1);
} else if (command === 'init') {
  runInit({ force: flags.has('--force'), dryRun: flags.has('--dry-run') });
} else {
  process.stderr.write(`Unknown command: ${command}\n\n${HELP}`);
  process.exit(1);
}

function runInit({ force, dryRun }) {
  const cwd = process.cwd();
  const target = join(cwd, TARGET_DIR_NAME);
  const source = join(TEMPLATE_DIR, TARGET_DIR_NAME);

  if (!existsSync(source)) {
    process.stderr.write(
      `Internal error: template not found at ${source}. ` +
        `Reinstall ag-skills-pro.\n`
    );
    process.exit(2);
  }

  if (existsSync(target) && !force && !dryRun) {
    process.stderr.write(
      `⚠️  ${TARGET_DIR_NAME}/ already exists in ${cwd}\n` +
        `   Re-run with --force to update (config.yml will be preserved),\n` +
        `   --dry-run to preview the changes, or remove it manually first.\n`
    );
    process.exit(1);
  }

  const targetExists = existsSync(target);
  const preserved = [];

  if (dryRun) {
    process.stdout.write(`[dry-run] Would scaffold:\n`);
    listFiles(source).forEach((rel) => {
      const tgt = join(target, rel);
      if (
        targetExists &&
        PRESERVE_ON_UPDATE.has(rel) &&
        existsSync(tgt)
      ) {
        process.stdout.write(`  · ${TARGET_DIR_NAME}/${rel} (preserved)\n`);
      } else {
        process.stdout.write(`  + ${TARGET_DIR_NAME}/${rel}\n`);
      }
    });
    return;
  }

  cpSync(source, target, {
    recursive: true,
    force: true,
    filter: (src, dest) => {
      const rel = relative(source, src);
      if (!rel) return true;
      if (PRESERVE_ON_UPDATE.has(rel) && existsSync(dest)) {
        preserved.push(rel);
        return false;
      }
      return true;
    },
  });

  const summary = countFiles(target);
  const preservedNote = preserved.length
    ? `\n   Preserved your existing: ${preserved.join(', ')}`
    : '';
  process.stdout.write(
    `✅ Scaffolded ${TARGET_DIR_NAME}/ — ${summary.skills} skills, ` +
      `${summary.workflows} workflows, ${summary.rules} rules.${preservedNote}\n\n` +
      `Next steps:\n` +
      `  1. Open this folder in Google Antigravity.\n` +
      `  2. Try a slash command: /brainstorm, /write-plan, /execute-plan, /review.\n` +
      `  3. Edit ${TARGET_DIR_NAME}/config.yml to tune per-project behavior.\n\n` +
      `Skills auto-activate via the always-on rule in ${TARGET_DIR_NAME}/rules/.\n`
  );
}

function listFiles(root) {
  const out = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const abs = join(dir, entry);
      const rel = relative(root, abs);
      if (statSync(abs).isDirectory()) {
        walk(abs);
      } else {
        out.push(rel);
      }
    }
  };
  walk(root);
  return out.sort();
}

function countFiles(target) {
  const safeCount = (sub) => {
    const dir = join(target, sub);
    if (!existsSync(dir)) return 0;
    return readdirSync(dir).filter((name) => {
      const full = join(dir, name);
      return statSync(full).isDirectory() || name.endsWith('.md');
    }).length;
  };
  return {
    skills: safeCount('skills'),
    workflows: safeCount('workflows'),
    rules: safeCount('rules'),
  };
}
