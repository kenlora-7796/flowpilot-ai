---
doc: prd
status: approved
---

# FlowPilot AI — Product Requirements

## Product Overview
FlowPilot AI by Tierra AI Labs helps small business owners turn everyday requests into organized, prioritized workflows.

Source: scope.md > Project, Intended Users, Problem

## The Core Journey
1. User opens the FlowPilot AI dashboard.
2. User enters a business request.
3. User clicks Generate Workflow.
4. The application displays actionable tasks.
5. Each task has a priority label.
6. User can mark tasks complete.
7. User can translate task descriptions between English and Spanish.

Source: scope.md > Core Experience, Success Criteria

## Screens and Layout
One responsive dashboard containing:
- Tierra AI Labs branding
- Business request input
- Generate Workflow button
- Generated task list
- Priority labels
- Completion checkboxes
- Language selector and Translate button

## Look and Feel
Clean, professional, approachable design consistent with Tierra AI Labs.

## Features and Behavior

### Workflow Generation
The user enters a request and generates a task list.

Acceptance criteria:
- A nonempty request produces an organized workflow.
- Each generated task has a description and priority.
- The user can generate another workflow.

### Task Completion
Each task has a checkbox.

Acceptance criteria:
- Checking a task marks it complete.
- Unchecking it marks it incomplete.

### Language Translation
The user selects English or Spanish and clicks Translate.

Acceptance criteria:
- Task descriptions display in the selected language.
- Completion states remain unchanged.
- Switching back restores the original English descriptions.

## States and Boundaries
- Initial: Request box visible; no generated tasks.
- Empty request: Show a helpful validation message.
- Loading: Show that workflow generation is in progress.
- Success: Display generated tasks.
- Error: Show a readable error and allow retry.
- Empty result: Explain that no actionable tasks were generated.
- Translation failure: Keep existing tasks visible and allow retry.

## Product Decisions
- Single-page dashboard to keep the demo focused.
- English and Spanish translation included in the first version.
- Automated external actions deferred.
- Free or low-cost development preferred.

## What We're Building
A working proof of concept demonstrating workflow generation, task prioritization, completion tracking, and translation.

## Deferred From the POC
- Email and calendar integrations
- Automated invoicing
- Autonomous task execution
- User accounts and cloud-saved workflows
- Additional languages

## Non-Goals
No sending emails, handling payments, or automatically changing external business systems.

## Open Questions
- Technical approach for generating workflows and translations: resolve during Step 4.
- Final visual styling details: resolve during implementation.

