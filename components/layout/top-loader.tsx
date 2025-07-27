"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import NextTopLoader from "nextjs-toploader";

export function ThemedTopLoader() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <NextTopLoader
            color={resolvedTheme === "dark" ? "#e2e2e3" : "#2A2F3C"}
            showSpinner={false}
            shadow-sm="none"
        />
    );
}
