# Third-party notices

## OpenIPA French transcription engine

This repository vendors the French transcription engine from **OpenIPA**:

- Upstream project: https://github.com/hfellerhoff/openipa
- Upstream source revision: `266c002d6c03c6b581b2bea74ca39bf1a92a7504` (master, inspected 2026-11-23)
- Vendored source: `vendor/openipa/src/transcription/french/` and the minimal supporting constants/helpers under `vendor/openipa/src/constants/` and `vendor/openipa/src/util/`
- Copyright: OpenIPA contributors; see upstream repository history and source notices
- License: GNU Affero General Public License v3.0 (AGPL-3.0), reproduced in [LICENSE](LICENSE)

The vendored TypeScript source is retained with its original module structure and rule descriptions. It is bundled for browser use by esbuild; the generated bundle is not an independent reimplementation. A small number of examples from OpenIPA's own French regression fixture are mirrored in our tests.

The remainder of this project is also distributed under AGPL-3.0. If you modify and run this program as a network service, comply with AGPL-3.0 section 13, including offering the Corresponding Source to users interacting with the modified version over a network. This notice is informational and does not replace the license text.
