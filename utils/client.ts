"use client";

import { QueryClient } from "@tanstack/query-core";

export const queryClient = new QueryClient();

export { Hydrate, QueryClientProvider } from "@tanstack/react-query";
export { ReactQueryDevtools } from "@tanstack/react-query-devtools/build/lib/index.prod.js"; // This weird import is to allow it to work in prod builds
