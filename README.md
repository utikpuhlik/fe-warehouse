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
