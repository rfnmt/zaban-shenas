export function normalizeText(str: string, splitter = /\s+/) {
  // Normalize special characters
  function normalizeSpecialCharacters(str: string) {
    const numbersMap = {
      "’": "'",
      "\u200C": "",
      "\u200D": "",
      ".": " ",
      "!": " ",
      "?": " ",
      "؟": " ",
      ",": " ",
      ";": " ",
      "@": " ",
    };

    let result = str;
    Object.keys(numbersMap).forEach((num) => {
      result = result?.replaceAll(num, numbersMap[num]);
    });

    return result;
  }

  function trimPersianPunctuations(str, replacement = "") {
    return str
      .replace(/^[؟،٪×÷»«!.˳˜]*/g, replacement)
      .replace(/[؟،٪×÷»«!.˳˜ًٌٍَُِّْـٰٓ]*$/g, replacement);
  }

  /**
   * Replace english punctuations from start and end of input with [replacement]
   */
  function trimEnglishPunctuations(str: string, replacement = "") {
    return str
      .replace(/^[.,;:!?(){}\[\]/+\-]+/g, replacement)
      .replace(/[.,;:!?(){}\[\]/+\-]+$/g, replacement);
  }

  // Convert Arabic characters to Persian characters
  function normalizeArabicCharacters(str: string) {
    const charsMap = {
      ء: "ا",
      آ: "ا",
      أ: "ا",
      ﭐ: "ا",
      ك: "ک",
      دِ: "د",
      بِ: "ب",
      ݓ: "ت",
      زِ: "ز",
      ذِ: "ذ",
      شِ: "ش",
      سِ: "س",
      ى: "ی",
      ئ: "ی",
      ي: "ی",
      ﻱ: "ی",
    };

    let result = str;
    Object.keys(charsMap).forEach((char) => {
      result = result?.replace(new RegExp(char, "g"), charsMap[char]);
    });

    return result;
  }

  // Convert Persian/Arabic numbers to English numbers
  function normalizeNonEnglishNumbers(str: string) {
    const numbersMap = {
      // arabic numbers
      "٠": "0",
      "١": "1",
      "٢": "2",
      "٣": "3",
      "٤": "4",
      "٥": "5",
      "٦": "6",
      "٧": "7",
      "٨": "8",
      "٩": "9",
      // persian numbers
      "۰": "0",
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
    };

    let result = str;

    Object.keys(numbersMap).forEach((num) => {
      result = result?.replace(new RegExp(num, "g"), numbersMap[num]);
    });

    return result;
  }

  /**
   * Replace all whitespace with [replacement]
   */
  function trimAll(str, replacement = "") {
    return str?.replace(/\s+/g, replacement);
  }

  /**
   * Replace all Emot Icon with ""
   */
  function trimEmotIcon(str: string) {
    return str.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, "");
  }

  let normalizeCharacters = normalizeSpecialCharacters(str);
  normalizeCharacters = normalizeCharacters?.split(splitter);

  const result = normalizeCharacters?.map((item) => {
    let character = trimPersianPunctuations(item);
    character = trimEnglishPunctuations(character);
    character = trimEmotIcon(character);
    character = normalizeArabicCharacters(character);
    character = normalizeNonEnglishNumbers(character);
    character = normalizeSpecialCharacters(character);
    character = trimAll(character);
    character = character.trim();
    character = character.toLowerCase();
    return character;
  });

  return result?.filter((word) => word.length > 0);
}
