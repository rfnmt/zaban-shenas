import { Sync } from "./index";

export function updateVersion(version: number) {
  return Sync["_version"].put(version, 1);
}

export function getVersion() {
  return Sync["_version"].orderBy(":id").first();
}
