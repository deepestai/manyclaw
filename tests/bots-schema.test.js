import { test } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import Ajv from 'ajv';

const schemaPath = new URL('../schemas/bots.schema.json', import.meta.url);
const botsPath   = new URL('../bots.json', import.meta.url);

const schema = JSON.parse(readFileSync(schemaPath, 'utf8'));
const botsData = JSON.parse(readFileSync(botsPath, 'utf8'));

const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

// ── happy path ────────────────────────────────────────────────────────────────

test('valid bots.json passes schema validation', () => {
  const valid = validate(botsData);
  assert.strictEqual(valid, true, JSON.stringify(validate.errors));
});

// ── sad path: discordId must be string ─────────────────────────────────────

test('discordId as number (not string) must fail', () => {
  const bad = { bots: [{ name: 'test', discordId: 1234567890123456, mention: '<@1234567890123456>', owner: null, active: true }] };
  const ok = validate(bad);
  assert.strictEqual(ok, false, 'should fail when discordId is a number');
});

// ── sad path: required fields ───────────────────────────────────────────────

test('missing required field (name) must fail', () => {
  const bad = { bots: [{ discordId: '1234567890123456', mention: '<@1234567890123456>', owner: null, active: true }] };
  assert.strictEqual(validate(bad), false);
});

test('missing required field (mention) must fail', () => {
  const bad = { bots: [{ name: 'test', discordId: '1234567890123456', owner: null, active: true }] };
  assert.strictEqual(validate(bad), false);
});

// ── sad path: invalid discordId format ─────────────────────────────────────

test('discordId with letters must fail', () => {
  const bad = { bots: [{ name: 'test', discordId: '1234567890123456abc', mention: '<@1234567890123456>', owner: null, active: true }] };
  assert.strictEqual(validate(bad), false);
});

test('mention format must match <@DIGITS>', () => {
  const bad = { bots: [{ name: 'test', discordId: '1234567890123456', mention: '@test', owner: null, active: true }] };
  assert.strictEqual(validate(bad), false);
});
