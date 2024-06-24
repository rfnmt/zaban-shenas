import {
  chain_3or4_day_sub_title,
  chain_3or4_day_title,
  chain_5_day_sub_title,
  chain_5_day_title,
  chain_6_day_sub_title,
  chain_6_day_title,
  chain_7_day_sub_title,
  chain_7_day_title,
  chain_first_day_sub_title,
  chain_first_day_title,
  chain_milestone_days_for_1000_days_sub_title,
  chain_milestone_days_for_1000_days_title,
  chain_milestone_days_for_month_sub_title,
  chain_milestone_days_for_month_title,
  chain_milestone_days_for_season_sub_title,
  chain_milestone_days_for_season_title,
  chain_milestone_days_for_year_sub_title,
  chain_milestone_days_for_year_title,
  chain_near_milestone_title,
  chain_near_milestone_title_sub_title,
  chain_normal_days_title,
  chain_random_sentences,
  chain_re_read_sub_title,
  chain_re_read_title,
  chain_second_day_sub_title,
  chain_second_day_title,
} from "./constant";

export function getFeedBackChain(currentStreak: number, longestStreak: number) {
  switch (true) {
    case currentStreak <= 1:
      if (longestStreak >= 2) {
        return {
          title: chain_re_read_title,
          subtitle: chain_re_read_sub_title,
        };
      } else {
        return {
          title: chain_first_day_title,
          subtitle: chain_first_day_sub_title,
        };
      }

    case currentStreak === 2:
      return {
        title: chain_second_day_title,
        subtitle: chain_second_day_sub_title,
      };

    case currentStreak === 3:
      return {
        title: chain_3or4_day_title(3),
        subtitle: chain_3or4_day_sub_title(4),
      };

    case currentStreak === 4:
      return {
        title: chain_3or4_day_title(4),
        subtitle: chain_3or4_day_sub_title(3),
      };

    case currentStreak === 5:
      return {
        title: chain_5_day_title,
        subtitle: chain_5_day_sub_title,
      };

    case currentStreak === 6:
      return {
        title: chain_6_day_title,
        subtitle: chain_6_day_sub_title,
      };

    case currentStreak === 7:
      return {
        title: chain_7_day_title,
        subtitle: chain_7_day_sub_title,
      };

    case currentStreak < 23:
      return {
        title: chain_normal_days_title(currentStreak),
        subtitle:
          chain_random_sentences[
            Math.floor(Math.random() * chain_random_sentences.length)
          ] || "",
      };

    case currentStreak < 30:
      return {
        title: chain_near_milestone_title(currentStreak),
        subtitle: chain_near_milestone_title_sub_title(
          30 - currentStreak,
          "یک ماهه"
        ),
      };

    case currentStreak === 30:
      return {
        title: chain_milestone_days_for_month_title,
        subtitle: chain_milestone_days_for_month_sub_title,
      };

    case currentStreak < 75:
      return {
        title: chain_normal_days_title(currentStreak),
        subtitle:
          chain_random_sentences[
            Math.floor(Math.random() * chain_random_sentences.length)
          ] || "",
      };

    case currentStreak < 90:
      return {
        title: chain_near_milestone_title(currentStreak),
        subtitle: chain_near_milestone_title_sub_title(
          90 - currentStreak,
          "یک فصل"
        ),
      };

    case currentStreak === 90:
      return {
        title: chain_milestone_days_for_season_title,
        subtitle: chain_milestone_days_for_season_sub_title,
      };

    case currentStreak < 335:
      return {
        title: chain_normal_days_title(currentStreak),
        subtitle:
          chain_random_sentences[
            Math.floor(Math.random() * chain_random_sentences.length)
          ] || "",
      };

    case currentStreak < 365:
      return {
        title: chain_near_milestone_title(currentStreak),
        subtitle: chain_near_milestone_title_sub_title(
          365 - currentStreak,
          "یک ساله"
        ),
      };

    case currentStreak === 365:
      return {
        title: chain_milestone_days_for_year_title,
        subtitle: chain_milestone_days_for_year_sub_title,
      };

    case currentStreak < 900:
      return {
        title: chain_normal_days_title(currentStreak),
        subtitle:
          chain_random_sentences[
            Math.floor(Math.random() * chain_random_sentences.length)
          ] || "",
      };

    case currentStreak < 1000:
      return {
        title: chain_near_milestone_title(currentStreak),
        subtitle: chain_near_milestone_title_sub_title(
          1000 - currentStreak,
          "هزار روزه"
        ),
      };

    case currentStreak === 1000:
      return {
        title: chain_milestone_days_for_1000_days_title,
        subtitle: chain_milestone_days_for_1000_days_sub_title,
      };

    default:
      return {
        title: chain_normal_days_title(currentStreak),
        subtitle:
          chain_random_sentences[
            Math.floor(Math.random() * chain_random_sentences.length)
          ] || "",
      };
  }
}
