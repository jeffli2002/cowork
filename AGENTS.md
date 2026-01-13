# Repository Guidelines

## Project Purpose
This repository currently holds the product requirements for the “Claude Cowork” landing page. Treat it as a source-of-truth document; any implementation work should trace back to these requirements.

## Project Structure & Module Organization
- `产品需求文档 (PRD)：Claude Cowork 落地页.md`: Core requirements and scope.
- `AGENTS.md`: Contributor guide for maintaining this repo.
- If you add an implementation, introduce clear top-level folders (example): `src/` for source, `public/` or `assets/` for static media, and `tests/` for automated tests.

## Build, Test, and Development Commands
- `npm run dev`: start the Vite dev server.
- `npm run build`: create a production build.
- `npm run preview`: preview the production build locally.

## Coding Style & Naming Conventions
- Markdown: use ATX headings (`#`, `##`), short paragraphs, and consistent list formatting.
- Filenames: keep descriptive names; non-ASCII names are acceptable to match the existing PRD.
- If code is added, document the formatter/linter and indentation rules in this section and keep them consistent across the repo.

## Testing Guidelines
No automated tests exist yet. If tests are added, place them under `tests/` or co-locate them with source files using `.test` or `.spec` naming.

## Commit & Pull Request Guidelines
Git history is not available in this snapshot, so no conventions can be inferred. Use Conventional Commits (e.g., `feat:`, `fix:`, `docs:`) and keep messages concise.
For pull requests, include:
- A short description of the change and rationale.
- Links to any related issue or requirement section.
- Screenshots or recordings for visual/UI changes.

## Content & Legal Notes
Keep the disclaimers and legal positioning from the PRD intact. This project is a conceptual landing page and should not imply official Anthropic endorsement.
