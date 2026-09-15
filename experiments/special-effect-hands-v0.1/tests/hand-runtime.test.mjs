import test from 'node:test';
import assert from 'node:assert/strict';
import { createHandRegistry, executeHandGraph, hashValue, resumeHandGraph } from '../src/hand-runtime.mjs';
import { ELECTRIC_HANDS, ELECTRIC_STORM_GRAPH, makeElectricInitialState } from '../src/electric-hands.mjs';

const registry = createHandRegistry(ELECTRIC_HANDS);

test('same graph + seed is deterministic and caller-neutral', () => {
  const initialState = makeElectricInitialState(424242);
  const human = executeHandGraph({ registry, graph: ELECTRIC_STORM_GRAPH, initialState, context: { callerKind: 'human-ui' } });
  const ai = executeHandGraph({ registry, graph: ELECTRIC_STORM_GRAPH, initialState, context: { callerKind: 'ai-agent' } });
  const mirror = executeHandGraph({ registry, graph: ELECTRIC_STORM_GRAPH, initialState, context: { callerKind: 'mirror-deterministic' } });
  assert.equal(human.finalStateHash, ai.finalStateHash);
  assert.equal(ai.finalStateHash, mirror.finalStateHash);
  assert.deepEqual(human.finalState, mirror.finalState);
});

test('checkpoint edit replays only downstream stages', () => {
  const original = executeHandGraph({ registry, graph: ELECTRIC_STORM_GRAPH, initialState: makeElectricInitialState(20260915), context: { callerKind: 'mirror-deterministic' } });
  const checkpoint = original.checkpoints.find((entry) => entry.stageId === 'grow-branches');
  assert.ok(checkpoint);
  const before = hashValue(checkpoint.state);
  const resumed = resumeHandGraph({
    registry,
    graph: ELECTRIC_STORM_GRAPH,
    checkpoint,
    edits: [
      { op: 'set', path: ['effect', 'controls', 'branchEnergyScale'], value: 0.31 },
      { op: 'set', path: ['effect', 'controls', 'glowScale'], value: 0.62 },
      { op: 'set', path: ['paths', 1, 'points', 2, 'y'], value: 0.18 }
    ],
    context: { callerKind: 'deterministic-program' }
  });
  assert.equal(hashValue(checkpoint.state), before);
  assert.deepEqual(resumed.executedStageIds, ['profile-energy', 'core-light', 'soft-bloom', 'ambient-field', 'pulse', 'preview']);
  assert.notEqual(resumed.finalStateHash, original.finalStateHash);
});

test('realization remains derived from canonical topology', () => {
  const run = executeHandGraph({ registry, graph: ELECTRIC_STORM_GRAPH, initialState: makeElectricInitialState(77), context: { callerKind: 'human-ui' } });
  assert.equal(run.finalState.realizations.svgPreview.derivedFromTopologyHash, hashValue(run.finalState.paths));
  assert.match(run.finalState.realizations.svgPreview.content, /^<svg /);
});
