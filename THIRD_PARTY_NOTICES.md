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


## Charis 7 webfonts

The UFPN display uses the official **Charis 7.000** Regular and Bold WOFF2 webfonts from SIL Global, self-hosted in `assets/fonts/`. The original release archive was downloaded from SIL's official GitHub release and verified before extraction:

- Upstream release: https://github.com/silnrsi/font-charis/releases/tag/v7.000
- Official download page: https://software.sil.org/charis/download/
- Release archive: `Charis-7.000.zip`
- SHA-256: `e3237b1303c5d31af8f59b1d1914886c5e873b77c71390e4742fb3bc1c187666`
- Included license: [licenses/Charis-OFL.txt](licenses/Charis-OFL.txt)
- Copyright: SIL Global, 1997–2025
- License: SIL Open Font License 1.1 (OFL-1.1)

The font family was renamed from Charis SIL to Charis in version 7.000. Only the Regular (400) and Bold (700) webfonts are distributed here; other UI typefaces remain loaded separately. The font files are unmodified.
