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

## Call API from Client with Auth (User search is implemented this way)
1. Create server action
2. Create a router and call the server action
3. Call the router from the client with Tanstack Query for caching and data fetching
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

## Data Fetching Strategy
```mermaid
graph TD
    page[Page] --> B{server or client?}
    B -->|server| C[Server Component]
    C --> D[server fetch function]
    D -->|call external API| python[FastAPI backend]
    python -->|return JSON| D
    D --> |pass response as props| ClientComponent
    ClientComponent -->|Suspense| page
    B -->|client| auth{send cookies?}
    auth -->|yes| E[Router proxy]
    auth -->|no| F[Tanstack Query]
```

## Data Mutation Strategy
```mermaid
graph TD
    page[Page] -->|has components| C[Client Component]
    C -->|send form| action[server action]
    action -->|build FormData| D[server fetch function - API call]
    D -->|call external API| python[FastAPI backend]
    python -->|return JSON| D
    D -->|return Data| action
    action --> |revalidate path| C
```
