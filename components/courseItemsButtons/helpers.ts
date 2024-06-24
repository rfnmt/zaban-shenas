export function renderButtonTitle(studyPercent: number | undefined) {
  if (studyPercent === undefined) return "شروع";
  if (studyPercent === 100) return "مرور";
  else if (studyPercent > 0 && studyPercent < 100) return "ادامه";
  else return "شروع";
}
