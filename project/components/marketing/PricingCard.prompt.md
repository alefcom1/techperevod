Plan tier card for the three-tier pricing grid (Full / MTPE / Express).

```jsx
<PricingCard
  name="MTPE"
  description="AI-черновик + доводка человеком. Быстрее и дешевле."
  featured
  badge={<Badge tone="accent">Популярный</Badge>}
  features={["AI-оркестрация черновика", "Редактура инженером", "Срок: 1–2 дня"]}
/>
```

Only one card should have `featured` at a time — it gets an accent border + slight lift so it reads as the recommended tier.
