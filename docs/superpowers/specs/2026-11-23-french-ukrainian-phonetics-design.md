# Design — French to Ukrainian phonetic workbench

Intent: статичний вебінструмент French text → IPA → UFPN та Latin guide. IPA є єдиною межею адаптації.

Goals: zero-runtime-dependency app; live input; синхронізовані послівні результати; provenance/confidence; UFPN research scaffold; copy/TXT/print-PDF.

Non-goals: гарантія повної французької вимови; імпорт даних без license review; вибір LICENSE замість власника; копіювання OpenIPA; регіональні профілі/audio/LLM.

Approaches: (1) AGPL reuse — можливий лише за умовами copyleft, відхилено; (2) clean-room static app — обрано; (3) великий словниковий імпорт — відкладено до перевірки прав і схеми.

Calls: engine.js; index/app/styles; low confidence for fallback; no Strict/Soft/Super-soft absent semantics; no LICENSE until owner decides.

Acceptance: unit tests for adapters/provenance/uncertainty/Unicode/context subset. Expert review, gold corpus, browser QA and deployment are separate gates.
