# Finance Dashboard — Compact Product Contract Example

## Summary

A responsive internal dashboard for finance managers to review cash position, receivables, payables, and recent exceptions.

## MVP scope

- dashboard summary by selected period
- receivable and payable status breakdown
- recent transactions and overdue alerts
- local mock data with deterministic filters

## Outside scope

- bank synchronization
- payment execution
- accounting ledger

## Primary journey

The finance manager opens `/dashboard`, selects a period, reviews the cash indicators, filters overdue items, and opens a transaction detail.

## Business rule

### BR-001 — Overdue receivable

An unpaid receivable whose due date is before the current business date is displayed as overdue.

## Acceptance criteria

- [ ] Period filters update every dashboard indicator consistently.
- [ ] Overdue items follow `BR-001` and remain visually distinguishable without relying only on color.
- [ ] Empty and error states preserve navigation and explain recovery.
- [ ] The primary journey works from 360 px without horizontal page overflow.
