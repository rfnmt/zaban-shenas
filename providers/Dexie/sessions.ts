import { Sync } from "./index";
import {
  addHasUpdateFalseKey,
  addHasUpdateTrueKey,
  removeHasUpdateKey,
} from "./helpers";
import { ISessions } from "./sync.interface";

export async function getAllSessions() {
  return Sync["sessions"].toArray();
}

export async function getSession(id: number) {
  return Sync["sessions"].get({ session_id: id });
}

export async function insertSessions(data: ISessions[]) {
  return Sync["sessions"].bulkPut(addHasUpdateFalseKey(data));
}

export async function getOnlyHasUpdateSessions() {
  const sessions = await Sync["sessions"]
    .where({ has_update: "true" })
    .toArray();

  return sessions ? removeHasUpdateKey(sessions) : [];
}

export async function pushFreshSessions(data: ISessions[]) {
  return Sync["sessions"].bulkPut(addHasUpdateFalseKey(data));
}

export async function pushFreshSessionWithTrueHasUpdate(data: ISessions[]) {
  return Sync["sessions"].bulkPut(addHasUpdateTrueKey(data));
}

export function getSpecificSession(ids: number[]) {
  return Sync["sessions"].bulkGet(ids);
}

export async function getPassedSession(ids: number[]) {
  const sessions = await Sync["sessions"].bulkGet(ids);
  return sessions.filter((item) => item?.state === "passed");
}
