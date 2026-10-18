---
doc: checklist
status: approved
---

# FlowPilot AI — Build Checklist

Build mode: fast

## Slices

- [x] **1. Generate a prioritized workflow**
  Becomes usable: A user can enter a business request and see a prioritized task list in the browser.
  Why now: Proves the core idea immediately and checks AI connectivity early.
  PRD ref: `prd.md > Workflow Generation`, `prd.md > The Core Journey`
  Spec ref: `spec.md > Request Input`, `spec.md > Workflow Generator`, `spec.md > Where It Runs and How Someone Tries It`
  Build: Create the Node.js server and dashboard, integrate a configurable AI provider, validate task output, and provide a clearly labeled sample mode when AI access is unavailable.
  Verify (mechanical): Start the server, test the workflow endpoint with a business request, and confirm valid prioritized tasks; verify sample mode is labeled.
  Learner check: Open http://localhost:3000, enter a business request, and confirm tasks appear with priorities and the correct AI or demo label.
  Commit: `Build workflow generation`

- [ ] **2. Complete and reopen tasks**
  Becomes usable: Users can check and uncheck generated tasks.
  Why now: Makes the workflow interactive without adding accounts or storage.
  PRD ref: `prd.md > Task Completion`
  Spec ref: `spec.md > Task List`, `spec.md > Data Model`
  Build: Add completion controls and update task state in browser memory.
  Verify (mechanical): Test completion state changes and confirm the task list remains intact.
  Learner check: Mark a task complete, then uncheck it and confirm its state changes.
  Commit: `Add task completion tracking`

- [ ] **3. Translate workflow tasks**
  Becomes usable: Users can display tasks in English or Spanish while preserving completion states.
  Why now: Completes the core bilingual workflow.
  PRD ref: `prd.md > Language Translation`
  Spec ref: `spec.md > Translation Controls`, `spec.md > Data Model`
  Build: Add language controls and a translation endpoint using the configured provider; preserve original English text and offer clearly labeled sample translations in demo mode.
  Verify (mechanical): Test English-to-Spanish and Spanish-to-English switching; confirm task IDs and completion states are preserved.
  Learner check: Translate a workflow, switch back to English, and confirm completed tasks remain checked.
  Commit: `Add bilingual workflow translation`

- [ ] **4. Polish and handle errors**
  Becomes usable: A responsive dashboard that handles empty input, loading, service failures, and retrying.
  Why now: Prepares the completed workflow for demonstration and review.
  PRD ref: `prd.md > States and Boundaries`, `prd.md > Look and Feel`
  Spec ref: `spec.md > Status Messages`, `spec.md > Important Failure Modes`, `spec.md > Look and Feel`
  Build: Add input validation, accessible status messages, responsive styling, and final smoke tests.
  Verify (mechanical): Run server and endpoint checks; test empty input, invalid responses, and unavailable AI service.
  Learner check: Try the full workflow on screen and report any confusing or broken behavior.
  Commit: `Polish dashboard and error handling`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — after Slice 1
- [ ] Final kick-the-tires exploration and feedback completed — after Slice 4

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — follow workflow generation through the code
- [ ] Optional edit and transfer reflection addressed
- [ ] `devpost/app-map.html` generated, checked, and shown

Activity and evidence: Pending
Route and stops: Pending
Edit outcome: Pending
Reflection: Pending
Activity mode: Pending

## Revisions


