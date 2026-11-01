---
title: Why I store money in kobo
summary: A computer can't add 0.1 and 0.2 exactly. When the numbers are someone's savings, that small error is your problem. Here is the simple rule I follow.
date: 2026-11-01
thread: workshop
tags: [payments, postgres, typescript]
draft: true
---

Open a browser console and add two small numbers:

```ts
0.1 + 0.2 // 0.30000000000000004
```

That isn't a bug in JavaScript. Most decimal fractions can't be stored exactly in binary, so the computer keeps a very close guess. For a game score, nobody notices. For a cooperative member's savings, a few of those guesses added over a year give you a statement that doesn't balance.

## The rule

Store money as a whole number of the smallest unit. In Nigeria, that is kobo.

| What the member sees | What the database keeps |
| --- | --- |
| ₦1.00 | 100 |
| ₦2,500.50 | 250050 |

Whole numbers add exactly. There's nothing to round, so there's nothing to get wrong.

```sql title="ledger.sql"
create table ledger_entries (
  id bigint generated always as identity primary key,
  account_id bigint not null,
  amount_kobo bigint not null check (amount_kobo <> 0)
);
```

## Where rounding still happens

Interest and percentages still produce fractions. The rule doesn't remove them, it forces you to decide about them in one place.

```ts title="interest.ts"
export function monthlyInterestKobo(balanceKobo: bigint, annualBasisPoints: bigint) {
  // Multiply first, divide last, so nothing is lost along the way.
  return (balanceKobo * annualBasisPoints) / (12n * 10_000n);
}
```

> A rounding rule should be written down once, not discovered in twelve places.

## Show it only at the edge

Convert to naira only when a person is about to read the number. Everything before that point stays in kobo.
