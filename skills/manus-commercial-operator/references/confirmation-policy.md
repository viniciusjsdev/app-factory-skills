# Execution confirmation policy

Public writes, schedules, direct contact, and CRM mutations require explicit confirmation after the exact target and final preview are known.

The operation must record:

- operation ID and approved mode;
- platform and connected account ID;
- artifact/content version;
- recipients or target objects;
- schedule/time zone;
- URL and distribution settings;
- cost/spend cap when applicable;
- approver and confirmation timestamp.

Reconfirm after any material change. A generic instruction such as "launch the campaign" or approval of a strategy document is insufficient.

Metrics reads may use a standing read-only authorization if the exact account, fields, period, and result cap are bounded. They must still return `external_state_changed: false`.
