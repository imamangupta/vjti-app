"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

export default function DocRoom({ children }) {
  return (
    <LiveblocksProvider publicApiKey="pk_dev_If9rehVNh5SpMWQZZK4qtdigVwWE7jhK7bxPGeUc4UHzJMCAESCQBs2aTW2ZFkCb">
      <RoomProvider
        id="my-newRoom"
        initialPresence={{
          cursor: null,
        }}
      >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
