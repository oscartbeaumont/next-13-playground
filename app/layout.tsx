import { dehydrate } from "@tanstack/query-core";
import { PropsWithChildren } from "react";
import {
  Hydrate,
  queryClient as clientQueryClient,
  QueryClientProvider,
  ReactQueryDevtools,
} from "../utils/client";
import { queryClient as serverQueryClient } from "../utils/server";

export default function Layout({ children }: PropsWithChildren) {
  // TODO: Investigate https://tanstack.com/query/v4/docs/guides/ssr#high-memory-consumption-on-server

  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RSC Playground</title>
      </head>
      <body>
        <QueryClientProvider client={clientQueryClient}>
          <Hydrate state={dehydrate(serverQueryClient)} options={{}}>
            {children}
          </Hydrate>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
