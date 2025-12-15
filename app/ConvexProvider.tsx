"use client";

import { ConvexProvider as ConvexProviderLib } from "convex/react";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderLib client={convex}>
      {children}
    </ConvexProviderLib>
  );
}