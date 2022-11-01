import { dehydrate, QueryClient } from "@tanstack/query-core";
import { PropsWithChildren, Suspense } from "react";
import {
  Hydrate,
  queryClient as clientQueryClient,
  QueryClientProvider,
  ReactQueryDevtools,
} from "../utils/client";
import { SomeLibraryProvider, useServerCtx } from "../utils/someLibrary";

// TODO: Can we avoid this in any way? It would be nice if this could only be a requirement on inner pages and components.
export const revalidate = 0;

async function HydrateMe() {
  const serverCtx = useServerCtx();
  // TODO: This timeout is a stand in for a `SuspenseList` (which isn't in React yet) to make this component render after the layout's subtree (so the data is populated).
  await new Promise((res) => {
    setTimeout(() => res(undefined), 1000);
  });

  // TODO: this sucks but will work for now
  const queryClient = new QueryClient();
  for (const [key, value] of Object.entries(serverCtx.data)) {
    queryClient.setQueryData([key], value); // Having to wrap key in array is weird but we are gonna remove this so idc.
  }
  return (
    <>
      {/* <p>RSC DATA: {JSON.stringify(serverCtx.data)}</p> */}
      <Hydrate state={dehydrate(queryClient)} />
    </>
  );
}

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RSC Playground</title>
      </head>
      <body>
        {/* 
        // @ts-expect-error */}
        <SomeLibraryProvider>
          <QueryClientProvider client={clientQueryClient}>
            {/* <SuspenseList revealOrder="forwards"> */}
            <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
            <Suspense fallback={<p>Steaming data...</p>}>
              {/* 
              // @ts-expect-error */}
              <HydrateMe />
            </Suspense>
            {/* </SuspenseList> */}

            <ReactQueryDevtools />
          </QueryClientProvider>
        </SomeLibraryProvider>
      </body>
    </html>
  );
}
