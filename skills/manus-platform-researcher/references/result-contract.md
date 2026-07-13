# Platform research result contract

## Result statuses

- `completed`: requested bounded search finished;
- `partial`: some sources or fields unavailable;
- `authentication_required`: an authorized signed-in session is missing;
- `scope_clarification_required`: the task includes ambiguous or write actions;
- `blocked`: policy, access, or platform restriction prevents safe completion.

## Candidate fields

For creator/community/competitor results, include stable ID or handle, profile URL, display name, platform, relevance evidence, observed metrics and timestamp, recent matching content, geography/language only when evidenced, fit explanation, risks, and confidence.

## Evidence rules

Every observation must have a URL or stable platform identifier and `observed_at`. Separate facts from analyst inference. A screenshot is supporting evidence, not the only record.

## Completion record

Include query and filters, result cap, pages/result set examined where measurable, limitations, search failures, and a statement that no external state changed.
