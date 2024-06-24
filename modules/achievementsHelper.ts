export function achievementsDeterminingLevelTitle(
  value: number,
  arrElements: Array<number>
) {
  const findIndexOfItem = arrElements.findIndex((item) => item > value);
  if (findIndexOfItem === -1) {
    return arrElements.indexOf(arrElements[arrElements.length - 1]) + 1;
  } else {
    return `${findIndexOfItem + 1}`;
  }
}

export function achievementsCalculateProgressValue(
  val: number,
  arr: Array<number>
) {
  if (Math.min(...arr) > val) {
    return Math.round((val / Math.min(...arr)) * 100) + 2;
  } else if (Math.min(...arr) < val) {
    const sos = arr.filter((item) => item > val);
    return Math.round((val / Math.min(...sos)) * 100) + 2;
  } else if (Math.min(...arr) === val) {
    const sos = arr.filter((item) => item > val);
    return Math.round((val / Math.min(...sos)) * 100) + 2;
  }
}

export function achievementsMergingValueAndTierCount(
  value: number,
  arrElements: Array<number>
) {
  if (Math.min(...arrElements) > value) {
    return `${value}/${Math.min(...arrElements)}`;
  } else if (Math.min(...arrElements) === value) {
    const sos = arrElements.filter((item) => item !== value);
    return `${value}/${Math.min(...sos)}`;
  } else if (Math.min(...arrElements) < value) {
    const sos = arrElements.filter((item) => item > value);
    return `${value}/${Math.min(...sos)}`;
  }
}
