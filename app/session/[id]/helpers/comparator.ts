export function comparator(
  words1: string,
  words2: string,
  minPercent: number = 0.5,
  checkOrder: boolean = false
) {
  if (typeof words1 !== "string" || typeof words2 !== "string") {
    throw new TypeError("Both words1 and words2 must be strings.");
  }
  if (minPercent < 0 || minPercent > 1) {
    throw new RangeError("minPercent must be between 0.0 and 1.0");
  }

  const splitWords1 = words1?.split(/\s+/);
  const splitWords2 = words2?.split(/\s+/);

  function calculateSimilarityOrdered(arr1: string[], arr2: string[]): number {
    let commonCount = 0;
    const minLength = Math.min(arr1?.length, arr2?.length);

    for (let i = 0; i < minLength; i++) {
      if (arr1?.[i] === arr2?.[i]) {
        commonCount++;
      }
    }

    return (commonCount * 2) / (arr1?.length + arr2?.length);
  }

  function calculateSimilarityUnordered(
    arr1: string[],
    arr2: string[]
  ): number {
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    const intersection = new Set([...set1].filter((x) => set2?.has(x)));

    const commonCount = intersection?.size;
    return (commonCount * 2) / (arr1?.length + arr2?.length);
  }

  const similarity = checkOrder
    ? calculateSimilarityOrdered(splitWords1, splitWords2)
    : calculateSimilarityUnordered(splitWords1, splitWords2);

  return { accepted: similarity >= minPercent };
}
