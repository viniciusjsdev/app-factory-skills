# Manus execution receipt

## Status

- `succeeded`: action verified through platform readback;
- `partial`: only a documented subset succeeded;
- `failed`: action did not succeed and is known not to have applied;
- `unknown`: platform result cannot be determined safely;
- `precondition_failed`: no mutation attempted because contract and live state differed.

## Required evidence

Capture native platform ID, public URL or stable record ID, scheduled/published time, recipient delivery state, metrics snapshot boundaries, or CRM readback as appropriate. Submission acknowledgment alone is not proof of success.

## Changed objects

List each object created or updated, its native ID, action, before/after fields when relevant, and correction path. For `metrics_read`, this list must be empty and `external_state_changed` must be false.

## Errors and retries

Record error class/message without secrets, whether mutation may have occurred, retry count, and why a retry was or was not safe. Never retry an ambiguous write blindly.

## Usage

Include provider task ID and reported credit/token/time usage when Manus exposes it. Do not estimate or guarantee missing usage.
