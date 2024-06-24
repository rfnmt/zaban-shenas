import dayjs from "dayjs";
import { getUserCurrentWeekStreak } from "@/providers/Dexie/experiences";

require("dayjs/locale/fa");

interface UserWeeklyStreak {
  date: string;
  gained_xp: number;
  daily_goal_xp: number;
}

export interface WeeklyStreak {
  passed: boolean;
  dayName: string;
}

export const arrayToObjectWithoutDuplicateData = <T>(
  array: T[],
  key: keyof T,
  func?: (a: T, b: T) => T
) =>
  array.reduce((obj, item) => {
    if (func && item[key] in obj) {
      obj[item[key]] = func(obj[item[key]], item);
    } else {
      obj[item[key]] = item;
    }

    return obj;
  }, {} as Record<T[keyof T], T>);

export async function processUserCurrentWeekStreaks(): Promise<WeeklyStreak[]> {
  const userCurrentWeekStreaks: UserWeeklyStreak[] =
    await getUserCurrentWeekStreak();

  const experiencesObj: Record<string, UserWeeklyStreak> =
    arrayToObjectWithoutDuplicateData(
      userCurrentWeekStreaks,
      "date",
      (a, b) => {
        a.gained_xp += b.gained_xp;
        return a;
      }
    );

  const today = dayjs().format("YYYY-MM-DD");
  const startOfWeek = dayjs().locale("fa").startOf("week");

  const days: WeeklyStreak[] = [];

  for (let i = 0; i < 7; i++) {
    const day = startOfWeek.add(i, "day").format("YYYY-MM-DD");
    const dayName = startOfWeek.add(i, "day").format("dddd").charAt(0);

    const item = experiencesObj[day];

    const passed = item && Math.floor(item.gained_xp) >= item.daily_goal_xp;

    if (day < today) {
      if (passed) {
        days.push({ passed: true, dayName });
      } else {
        days.push({ passed: false, dayName });
      }
    } else if (day === today) {
      if (passed) {
        days.push({ passed: true, dayName });
      } else {
        days.push({ passed: false, dayName });
      }
    } else {
      days.push({ passed: false, dayName });
    }
  }

  return days;
}
