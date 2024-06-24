import dayjs from "dayjs";

import {
  getSession,
  pushFreshSessionWithTrueHasUpdate,
} from "@/providers/Dexie/sessions";
import { store } from "@/providers/Redux/store";
import { ISessions } from "@/providers/Dexie/sync.interface";
import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { calculateWhichSessionIsNext } from "@/app/home/helpers/calculateWhichSessionIsNext";

export async function updateSessionTable() {
  const today = dayjs().format("YYYY-MM-DD");

  const { pathname } = window.location;

  const sessionId = Number(pathname.split("/")[2]);

  const existSessionData = await getSession(sessionId);

  const { accuracy, gainedXp } = store.getState().session;

  const modifySession: ISessions[] = [];

  // ask to checking "did" removed

  if (existSessionData === undefined) {
    modifySession.push({
      accuracy: Math.round(accuracy),
      date: today,
      gained_xp: Math.round(gainedXp),
      session_id: sessionId,
      state: "passed",
    });

    queryClient.setQueryData(["session-state", sessionId], modifySession[0]);
    calculateWhichSessionIsNext(true);
  } else {
    modifySession.push({
      state: "passed",
      gained_xp: Math.round(Math.max(existSessionData.gained_xp, gainedXp)),
      accuracy: Math.round(Math.max(existSessionData.accuracy, accuracy)),
      date: today,
      session_id: sessionId,
    });

    queryClient.setQueryData(["session-state", sessionId], modifySession[0]);
  }

  return pushFreshSessionWithTrueHasUpdate(modifySession);
}
