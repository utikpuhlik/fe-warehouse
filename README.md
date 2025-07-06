# TCF Warehouse FrontEnd
## Coding Conventions
### 1. Styling
1. JSX - `kebab-case`
2. TS - `camelCase`
3. classes, functions, components - `PascalCase`

### 2. Schema First
1. Props should always inherit or reuse Zod BasicObjectSchema

### 3. Architecture
Flow: Component -> Action -> External API call to FastAPI backend


## Tanstack Query
1. Install with pnpm `pnpm add @tanstack/react-query`
2. Create QueryProvider
```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient());

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
```
Use it in RootLayout as following:
```tsx
<body className={`${inter.className} antialiased`}>
    <QueryProvider>{children}</QueryProvider>
</body>
```
