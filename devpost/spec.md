---
doc: spec
status: approved
---

# FlowPilot AI — Technical Specification

## How This Works, In Plain Language
A small business owner types a request into FlowPilot AI.
The application sends that request to a local server.
The server generates a prioritized task list using a configured AI service.
The user can complete tasks and translate their descriptions.
If AI access is unavailable, an explicitly labeled demo mode can show sample behavior.

## The Core Journey Through the System
1. Open the dashboard.
2. Enter a business request.
3. Click Generate Workflow.
4. Receive task descriptions and priorities.
5. Mark tasks complete or incomplete.
6. Select English or Spanish and click Translate.
7. See translated descriptions without losing completion states.

Implements: prd.md > The Core Journey

## Stack
- HTML5 for the dashboard
- CSS3 for responsive styling
- JavaScript for browser interactions
- Node.js 24 for the local server
- PowerShell and VS Code for development
- Git and GitHub for version control

Documentation:
- https://developer.mozilla.org/en-US/docs/Web/HTML
- https://developer.mozilla.org/en-US/docs/Web/CSS
- https://developer.mozilla.org/en-US/docs/Web/JavaScript
- https://nodejs.org/docs/latest-v24.x/api/

## Where It Runs and How Someone Tries It
The application runs locally on Windows.

Planned start command:
node server.js

Planned browser address:
http://localhost:3000

A short demonstration video and public GitHub repository are required for submission.
Deployment is optional.

## Look and Feel
A clean, professional Tierra AI Labs dashboard.
Readable typography, clear priorities, accessible controls, and responsive layout.

## Components

### Request Input
Accepts a natural-language business request.
Implements: prd.md > Workflow Generation

### Workflow Generator
Sends the request to the local server.
Receives task descriptions and priority labels.
Implements: prd.md > Workflow Generation

### Task List
Displays tasks and completion checkboxes.
Tracks completion during the current session.
Implements: prd.md > Task Completion

### Translation Controls
Provides an English/Spanish selector and Translate button.
Preserves task identities and completion states.
Implements: prd.md > Language Translation

### Status Messages
Displays loading, validation, success, and failure messages.
Implements: prd.md > States and Boundaries

## Data Model
Each task contains:
- id
- descriptionEnglish
- descriptionSpanish, when available
- priority
- completed

Tasks remain in browser memory during the session.
No account or database is required.

## File Structure
ai-basics-2026/
  server.js          # Local server and AI endpoints
  package.json       # Start command
  public/
    index.html       # Dashboard
    style.css        # Visual styling
    app.js           # User interactions
  devpost/
    learner-profile.md
    scope.md
    prd.md
    spec.md
    checklist.md     # Created during build

## External Services and Dependencies
AI provider: To be selected and tested before implementation.
The server must read any API credentials from environment variables.
Credentials must never be committed to GitHub.
If an external service is unavailable, demo mode must be clearly identified.

## Important Failure Modes
- Empty request: Show a validation message.
- AI unavailable: Show an error and offer labeled demo mode.
- Translation unavailable: Keep existing descriptions visible.
- Invalid generated result: Show an error instead of broken tasks.

## What Was Simplified and Why
- One dashboard instead of multiple screens.
- Session-only tasks instead of accounts and databases.
- No autonomous external actions.
- English and Spanish only.

These decisions keep the project small enough to demonstrate.

## Decisions and Open Issues
- Local-first development minimizes setup.
- A small server protects API credentials.
- AI provider access must be verified before implementation.
- Translation implementation must be verified during build.
- Demo mode must never be represented as live AI.

