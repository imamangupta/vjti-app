"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

export function Room({ children }) {
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_If9rehVNh5SpMWQZZK4qtdigVwWE7jhK7bxPGeUc4UHzJMCAESCQBs2aTW2ZFkCb"}>
      <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}