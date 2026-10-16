import assert from 'node:assert/strict'
import test from 'node:test'
import {
  DEFAULT_AGENTS,
  NO_GLOBAL_AGENTS,
  filterAgentsForGlobalInstall,
  hasPromptScriptGlobalFail,
  parseArgs,
  readManifest,
  staleList,
} from './install-skills.mjs'

test('filterAgentsForGlobalInstall drops promptscript and eve', () => {
  const out = filterAgentsForGlobalInstall([
    'claude-code',
    'promptscript',
    'cursor',
    'eve',
    'PromptScript',
  ])
  assert.deepEqual(out, ['claude-code', 'cursor'])
})

test('filterAgentsForGlobalInstall dedupes case-insensitively', () => {
  assert.deepEqual(filterAgentsForGlobalInstall(['Cursor', 'cursor', 'CURSOR']), [
    'Cursor',
  ])
})

test('hasPromptScriptGlobalFail detects CLI failure line', () => {
  assert.equal(
    hasPromptScriptGlobalFail(
      '✗ some-skill → PromptScript: PromptScript does not support global skill installation',
    ),
    true,
  )
  assert.equal(hasPromptScriptGlobalFail('✓ some-skill (copied)'), false)
})

test('parseArgs defaults and env override', () => {
  const d = parseArgs([])
  assert.equal(d.source, 'FuDesign2008/open-music-skills')
  assert.equal(d.skill, '*')
  assert.deepEqual(d.agents, [...DEFAULT_AGENTS])
  assert.ok(NO_GLOBAL_AGENTS.includes('promptscript'))

  const e = parseArgs(['--source', '.', '-s', 'xiaoyao-craft'], {
    OPEN_MUSIC_SKILLS_AGENTS: 'claude-code,promptscript,cursor',
  })
  assert.equal(e.source, '.')
  assert.equal(e.skill, 'xiaoyao-craft')
  assert.deepEqual(e.agents, ['claude-code', 'cursor'])
})

test('staleList only reports previously-claimed names, never foreign ones', () => {
  // 归属判定：旧清单声明过、新清单不再包含 → stale；从未声明过的（他源 skill）永不出现在结果中
  assert.deepEqual(staleList(['alpha', 'beta'], ['alpha']), ['beta'])
  assert.deepEqual(staleList([], ['alpha']), [])
  assert.deepEqual(staleList(['alpha'], ['alpha', 'beta']), [])
})

test('readManifest is fail-safe: missing or malformed input yields []', () => {
  // 不存在该 manifest 时不得抛错（也不得回退读取他源 manifest）
  assert.deepEqual(readManifest('/nonexistent/root/for/test'), [])
})
