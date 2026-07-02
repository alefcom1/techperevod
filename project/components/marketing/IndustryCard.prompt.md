Small icon tile for one industry vertical, laid out in a 4-up grid.

```jsx
import { Cpu, Fuel, Cog, Pill } from "https://esm.sh/lucide-react";
<IndustryCard icon={<Cpu size={22} />} name="IT и SaaS" />
<IndustryCard icon={<Fuel size={22} />} name="Нефтегаз и энергетика" />
<IndustryCard icon={<Cog size={22} />} name="Машиностроение" />
<IndustryCard icon={<Pill size={22} />} name="Медтех и фарма" />
```

Icons come from Lucide (see README → Iconography) — pick outline icons at `size={22}`, `strokeWidth={1.75}` to match the brand's line weight.
