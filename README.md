# AXM Hands Fabric

Universal executable capability fabric for AXM.

A **Hand** is a bounded executable transformation with explicit inputs, outputs, dependencies, state effects, evidence and known losses. Hands are caller-neutral: a human UI, AI Agent, Mirror, ordinary deterministic program, game, app, CLI or other compatible host may invoke the same Hand contract.

## Core direction

- one small Hand should do one inspectable thing well;
- preserve editable state between Hand executions;
- compose small Hands into reusable Hand graphs / composite Hands;
- checkpoints should support targeted edits and downstream-only replay where dependencies permit;
- deterministic Hands must remain deterministic regardless of caller identity;
- software-specific implementations are adapters beneath capability intent when a caller-neutral contract is possible;
- owning or invoking a Hand does not grant CANON, publication, permission or user authority;
- offline/local execution is preferred for core capability where practical;
- provenance, version, dependency and verification status travel with every reusable Hand.

## First proven donor

The first donor proof lives in `mike-axiom-mir/axm-visual-effect-fabric/hand-lab` and was merged as Visual Effect Fabric PR #3 (merge commit `9ce4b0de198aeb5890d8cce58da05a11880348ab`).

It proves an eight-Hand electric-storm graph with caller-neutral deterministic execution, hashed editable checkpoints after every Hand, mid-process edits, downstream-only partial replay, and canonical effect state separate from SVG realization. The same state/seed yields the same result for human UI, AI Agent and deterministic Mirror callers.

That donor is evidence and a starting pattern, not automatic canon for every future Hand.

## Fabric vs factory

The Fabric is the whole capability body: contracts, implementations, adapters, registry, graphs, tests, provenance, packages and compatibility state.

A future **Hand Factory** is one subsystem inside this Fabric that can discover, design, test, combine and package new Hands.

## Constitutional boundary

Internal AXM merge/canon authority comes from grounded fit to the four roots: Truth, Agency / non-domination, Continuity, and Wisdom before speed. Technical write access is not constitutional authority.
