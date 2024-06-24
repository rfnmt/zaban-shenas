import dayjs from "dayjs";

import { Sync } from "./index";
import {
  addHasUpdateFalseKey,
  addHasUpdateTrueKey,
  removeHasUpdateKey,
} from "./helpers";
import { IExperiences } from "./sync.interface";
import { store } from "../Redux/store";

export async function getAllExperiences() {
  return Sync["experiences"].toArray();
}

export async function insertExperiences(data: IExperiences[]) {
  return Sync["experiences"].bulkPut(addHasUpdateFalseKey(data));
}

export async function getOnlyHasUpdateExperiences() {
  const experiences = await Sync["experiences"]
    .where({ has_update: "true" })
    .toArray();

  return experiences ? removeHasUpdateKey(experiences) : [];
}

export async function pushFreshExperiences(data: IExperiences[]) {
  return Sync["experiences"].bulkPut(addHasUpdateFalseKey(data));
}

export async function pushFreshExperiencesWithHasUpdateKey(
  data: IExperiences[]
) {
  return Sync["experiences"].bulkPut(addHasUpdateTrueKey(data));
}

export function getUserGaindXpByDate(date: string) {
  const did = store.getState().user.id;

  return Sync["experiences"]
    .where({ date: date })
    .toArray()
    .then(function (experiences) {
      if (experiences.length) {
        const gainedXp = experiences.reduce(
          (acc, item) => acc + item.gained_xp,
          0
        );

        const experience: IExperiences = experiences[0];
        experience.gained_xp = gainedXp;
        if (did) experience.did = did;

        return experience;
      } else return undefined;
    });
}

export async function getUserCurrentWeekStreak() {
  const today = dayjs().format("YYYY-MM-DD");
  const startOfWeek = dayjs().locale("fa").startOf("week").format("YYYY-MM-DD");

  const todayExperience = await Sync["experiences"]
    .where("date")
    .between(startOfWeek, today, true, true)
    .toArray();

  return todayExperience;
}
