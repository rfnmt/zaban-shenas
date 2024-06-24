import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import { queryClient } from "@/providers/ReactQuery/reactQueryWrapper";
import { closeSyncDatabase } from "@/providers/Dexie";

dayjs.extend(duration);

export function toEnglishDigits(str) {
  // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
  var e = "۰".charCodeAt(0);
  str = str.replace(/[۰-۹]/g, function (t) {
    return t.charCodeAt(0) - e;
  });

  // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
  e = "٠".charCodeAt(0);
  str = str.replace(/[٠-٩]/g, function (t) {
    return t.charCodeAt(0) - e;
  });
  return str;
}

const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
const persianMap = persianDigits.split("");
export function convertToPersianNumber(str: string | number) {
  const _str = String(str);
  return _str.replace(/\d/g, function (m) {
    return persianMap[parseInt(m)];
  });
}

export const isNumber = (value) => /^([0-9]{1,})$/.test(value);
export const isIranPhoneNumber = (value: string | number) =>
  /^(\+98|0098|98|0)?9\d{9}$/.test(value);
export const isPhoneNumber = (value) => /^9\d{9}$/.test(value);
export const isEmail = (value) =>
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);

// usage
// CookiesHelper.createCookie("myCookieUniqueName", value, 30);
// CookiesHelper.createCookie("myJsonCookieUniqueName", json, 30);
export function createCookie(name: string, value: any, days: number) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    var expires = "; expires=" + date.toGMTString();
  } else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}

// usage
// var value = CookiesHelper.readCookie("myCookieUniqueName");
// var json = JSON.parse(CookiesHelper.readCookie("myJsonCookieUniqueName");
export function readCookie(name: string) {
  var nameEQ = name + "=";
  var ca = document?.cookie?.split(";");
  for (var i = 0; i < ca?.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function eraseCookie(name: string) {
  createCookie(name, "", -1);
}

export function checkDateIsCurrentMonth(date) {
  const today = dayjs();
  return today.diff(date, "month");
}

export function calcDiffWithToday(date) {
  const today = dayjs();
  const _date = dayjs(date);

  return _date.diff(today, "second");
}

export function calcDiffSecondsWithNow(date) {
  const today = dayjs();
  const _date = dayjs(date);

  return _date.diff(today, "seconds");
}

export function calcDiffMinuteWithNow(date) {
  const today = dayjs();
  const _date = dayjs(date);

  return _date.diff(today, "minute") > 0 ? _date.diff(today, "minute") : false;
}

// id equal course purchasable id
//
export function doIHaveThisProduct(id: number) {
  const shopData = queryClient.getQueryData(["shop-data"]) as any;

  const purchasables = shopData?.purchasables?.find(
    (item: any) => item.data.id === id
  );

  const purchasedProduct = shopData?.purchased_products?.find(
    (item: any) => item?.data?.id === id
  );

  let result = false;

  if (purchasedProduct) {
    switch (purchasables?.data?.type) {
      case "one-time":
        result = true;
        break;

      case "subscription":
        result = calcDiffWithToday(purchasedProduct?.data?.expiry_date) > 0;
        break;

      case "transient":
        result = calcDiffWithToday(purchasedProduct?.data?.expiry_date) > 0;
        break;

      case "consumable":
        result = purchasedProduct?.data?.remaining_amount > 0;
        break;

      default:
        result = false;
        break;
    }
  }

  return result;
}

export function removeURLParam(url, param) {
  var urlparts = url.split("?");
  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(param) + "=";
    var pars = urlparts[1].split(/[&;]/g);
    for (var i = pars.length; i-- > 0; )
      if (pars[i].indexOf(prefix, 0) == 0) pars.splice(i, 1);
    if (pars.length > 0) return urlparts[0] + "?" + pars.join("&");
    else return urlparts[0];
  } else return url;
}

export function remainingFullDate(date: string) {
  const lockdown = dayjs(date);
  const currentDate = dayjs();

  // get the difference between the moments
  const diff = currentDate.diff(lockdown);

  //express as a duration
  const diffDuration = dayjs.duration(diff);

  // display
  const timeInLockDown = {
    months: diffDuration.months() + diffDuration.years() * 12,
    days: diffDuration.days(),
    hours: diffDuration.hours(),
    minutes: diffDuration.minutes(),
    secconds: diffDuration.seconds(),
  };

  let resule = "";

  if (timeInLockDown.months > 0) {
    resule += timeInLockDown.months + " ماه ";
  }
  if (timeInLockDown.days > 0) {
    resule += timeInLockDown.days + " روز  ";
  }
  if (timeInLockDown.days < 1 && timeInLockDown.hours > 0) {
    resule += timeInLockDown.hours + " ساعت  ";
  }
  if (timeInLockDown.hours < 1 && timeInLockDown.minutes > 0) {
    resule += timeInLockDown.minutes + " دقیقه ";
  }
  if (timeInLockDown.minutes < 1 && timeInLockDown.secconds > 0) {
    resule += timeInLockDown.secconds + " ثانیه ";
  }

  return resule;
}

export function remainingDates(date: string) {
  const lockdown = dayjs(date);
  const currentDate = dayjs();

  // get the difference between the moments
  const diff = lockdown.diff(currentDate);

  //express as a duration
  const diffDuration = dayjs.duration(diff);

  // display
  const timeInLockDown = {
    months: diffDuration.months() + diffDuration.years() * 12,
    days: diffDuration.days(),
  };

  const monthsDisplay =
    timeInLockDown.months > 0
      ? timeInLockDown.months +
        `${timeInLockDown.days > 0 ? " ماه " : " ماه دیگر "}`
      : "";
  const daysDisplay =
    timeInLockDown.days > 0
      ? timeInLockDown.months > 0
        ? " و " + timeInLockDown.days + " روز دیگر "
        : timeInLockDown.days + " روز دیگر "
      : "";

  return monthsDisplay + daysDisplay;
}

type CalcNeededGEMProps = {
  price: number;
  maxAmount: number;
  gemExchangeValue: number;
  type: string;
};

export function calcNeededGEM({
  price,
  maxAmount = 1,
  gemExchangeValue,
  type = "",
}: CalcNeededGEMProps) {
  if (type === "") {
    return (Math.round((price * maxAmount) / 1000) * 1000) / gemExchangeValue;
  } else {
    return (Math.round(price / 1000) * 1000) / gemExchangeValue;
  }
}

export function textIsFarsi(text: string) {
  let farsiCount = 0;
  let totalCount = 0;
  const charCodeRange = [1536, 1791];

  for (let i = 0; i < text?.length; i++) {
    let charCode = text?.charCodeAt(i);

    if (charCode >= charCodeRange[0] && charCode <= charCodeRange[1]) {
      farsiCount++;
    }

    totalCount++;
  }

  let farsiPercentage = (farsiCount / totalCount) * 100;

  return Boolean(farsiPercentage > 1);
}

export function detectLanguage(text: string) {
  const langs = text
    ?.trim()
    ?.split(/\s+/)
    ?.map((word) => {
      return detect(word);
    });
  // pick the lang with the most occurances
  return (langs || []).reduce(
    (acc, el) => {
      acc.k[el] = acc.k[el] ? acc.k[el] + 1 : 1;
      acc.max = acc.max ? (acc.max < acc.k[el] ? el : acc.max) : el;
      return acc;
    },
    { k: {} }
  ).max;
  function detect(text) {
    const scores = {};

    const regexes = {
      en: /[\u0000-\u007F]/gi,
      zh: /[\u3000\u3400-\u4DBF\u4E00-\u9FFF]/gi,
      hi: /[\u0900-\u097F]/gi,
      ar: /[\u0621-\u064A\u0660-\u0669]/gi,
      bn: /[\u0995-\u09B9\u09CE\u09DC-\u09DF\u0985-\u0994\u09BE-\u09CC\u09D7\u09BC]/gi,
      he: /[\u0590-\u05FF]/gi,
    };
    for (const [lang, regex] of Object.entries(regexes)) {
      // detect occurances of lang in a word
      let matches = text.match(regex) || [];
      let score = matches.length / text.length;
      if (score) {
        // high percentage, return result
        if (score > 0.85) {
          return lang;
        }
        scores[lang] = score;
      }
    }
    // not detected
    if (Object.keys(scores).length == 0) return null;
    // pick lang with highest percentage
    return Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );
  }
}

export const commonFramerMotionVariant = {
  transition: { duration: 0.2 },
  initial: { y: "1%", opacity: 0 },
  animate: { y: "0%", opacity: 1 },
  exit: { y: "1%", opacity: 0 },
};

export const storyOtherPartsMotion = {
  transition: { duration: 0.2 },
  initial: { y: "10%", opacity: 0 },
  animate: { y: "0%", opacity: 1 },
  exit: { y: "10%", opacity: 0 },
};

export const storyLeftToRightItemsMotion = {
  transition: { duration: 0.2 },
  initial: { x: "-10%", opacity: 0 },
  animate: { x: "0%", opacity: 1 },
  exit: { x: "-10%", opacity: 0 },
};

export const storyRightToLeftItemsMotion = {
  transition: { duration: 0.2 },
  initial: { x: "10%", opacity: 0 },
  animate: { x: "0%", opacity: 1 },
  exit: { x: "10%", opacity: 0 },
};

export function clearCache() {
  return new Promise((reslove) => {
    closeSyncDatabase();
    queryClient.removeQueries();

    localStorage.clear();
    sessionStorage.clear();

    eraseCookie("token");

    return reslove;
  });
}

export const arrayToObject = (array, key) => {
  return array.reduce((obj, item) => {
    obj[item[key]] = item;
    return obj;
  }, {});
};

export function generateLog(short_message = "", full_message = "") {
  // if (process.env.NODE_ENV !== "development") {
  //   const username =
  //     typeof window !== "undefined"
  //       ? String(localStorage.getItem("username"))
  //       : "";
  //   const email =
  //     typeof window !== "undefined"
  //       ? String(localStorage.getItem("email"))
  //       : "";
  //   const phone =
  //     typeof window !== "undefined"
  //       ? String(localStorage.getItem("phone"))
  //       : "";
  //   const did =
  //     typeof window !== "undefined" ? Number(localStorage.getItem("did")) : 0;
  //   const uid =
  //     typeof window !== "undefined" ? String(localStorage.getItem("id")) : "";
  //   const timestamp = dayjs().valueOf() / 1000;
  //   fetch("https://graylog.zabanshenas.com/log/gelf", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       version: END_POINT_VERSION,
  //       host: "Zaban Amooz PWA",
  //       short_message: short_message,
  //       full_message: full_message,
  //       timestamp,
  //       level: 1,
  //       did,
  //       email,
  //       uid,
  //       phone,
  //       username,
  //       location: window.location.href,
  //     }),
  //   });
  // }
}

export function shuffleArray(array: []) {
  let currentIndex = array?.length,
    randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function zeroWidthTrim(stringToTrim) {
  const ZERO_WIDTH_SPACES_REGEX =
    /([\u200B]+|[\u200C]+|[\u200D]+|[\u200E]+|[\u200F]+|[\uFEFF]+)/g;
  //
  const trimmedString = stringToTrim?.replace(ZERO_WIDTH_SPACES_REGEX, "");
  //
  return trimmedString;
}

export function makeId(length: number = 5) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export function questionOrder(array: any[], order: number[], key: string) {
  array?.sort(function (a: { [x: string]: any }, b: { [x: string]: any }) {
    var A = a[key],
      B = b[key];

    if (order.indexOf(A) > order.indexOf(B)) {
      return 1;
    } else {
      return -1;
    }
  });

  return array;
}

export function getWindowDimensions() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const ratio = (width / height) * 100;
  return { width, height, ratio };
}

export function numberToPersianWord(n: number) {
  if (n < 0) return false;

  const single_digit = [
    "",
    "یکم",
    "دوم",
    "سوم",
    "چهارم",
    "پنجم",
    "ششم",
    "هفتم",
    "هشتم",
    "نهم",
  ];

  const double_digit = [
    "ده ام",
    "یازده ام",
    "دوازده ام",
    "سینزده ام",
    "چهارده ام",
    "پانزده ام",
    "شانزده ام",
    "هفده ام",
    "هجده ام",
    "نوزده ام",
  ];

  const below_hundred = [
    "بیست",
    "سی",
    "چهل",
    "پنجاه",
    "شصت",
    "هفتاد",
    "هشتاد",
    "نود",
  ];

  if (n === 0) return "صفر";

  function translate(n: number) {
    let word = "";
    if (n === 0) return "ام";

    if (n < 10) {
      word = single_digit[n] + " ";
    } else if (n < 20) {
      word = double_digit[n - 10] + " ";
    } else if (n < 100) {
      let rem = translate(n % 10);
      word = below_hundred[(n - (n % 10)) / 10 - 2] + " " + rem;
    }
    return word;
  }

  let result = translate(n);
  return result.trim();
}

export function objectEquals<T>(obj1: T, obj2: T): boolean {
  // Check if both objects are null or undefined
  if (
    obj1 === null ||
    obj2 === null ||
    obj1 === undefined ||
    obj2 === undefined
  ) {
    return obj1 === obj2;
  }

  // Check if both objects are of the same type
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // If both objects are arrays, compare their elements
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (let i = 0; i < obj1.length; i++) {
      if (!objectEquals(obj1[i], obj2[i])) {
        return false;
      }
    }
    return true;
  }

  // If both objects are objects, compare their properties
  if (typeof obj1 === "object" && typeof obj2 === "object") {
    // Get the keys of both objects
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if both objects have the same number of keys
    if (keys1.length !== keys2.length) {
      return false;
    }

    // Check if both objects have the same keys
    for (let i = 0; i < keys1.length; i++) {
      if (!keys2.includes(keys1[i])) {
        return false;
      }
    }

    // Compare the values of each property
    for (let key of keys1) {
      if (!objectEquals(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  }

  // If both objects are not arrays or objects, compare their values directly
  return obj1 === obj2;
}

export function arrayDeepEqual(arr1: any[], arr2: any[]): boolean {
  if (arr1 === arr2) {
    return true;
  }

  if (arr1 == null || arr2 == null) {
    return false;
  }

  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
      if (!arrayDeepEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else if (
      typeof arr1[i] === "object" &&
      typeof arr2[i] === "object" &&
      arr1[i] !== null &&
      arr2[i] !== null
    ) {
      if (!arrayDeepEqual(Object.values(arr1[i]), Object.values(arr2[i]))) {
        return false;
      }
    } else if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

export function arrayIsDeepEqual(a: any, b: any): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    // If both are arrays, compare their lengths and elements
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!arrayIsDeepEqual(a[i], b[i])) return false;
    }
    return true;
  } else if (a && typeof a === "object" && b && typeof b === "object") {
    // If both are objects, compare their keys and values
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!keysB.includes(key) || !arrayIsDeepEqual(a[key], b[key]))
        return false;
    }
    return true;
  } else {
    // For all other types, use strict equality comparison
    return Object.is(a, b);
  }
}

export function deepEqual(arr1: any[], arr2: any[]): boolean {
  if (arr1 === arr2) {
    return true;
  }

  if (arr1 == null || arr2 == null) {
    return false;
  }

  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
      if (!deepEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else if (
      typeof arr1[i] === "object" &&
      typeof arr2[i] === "object" &&
      arr1[i] !== null &&
      arr2[i] !== null
    ) {
      if (!objectEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function objectEqual(obj1: any, obj2: any): boolean {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
      if (!deepEqual(obj1[key], obj2[key])) {
        return false;
      }
    } else if (
      typeof obj1[key] === "object" &&
      typeof obj2[key] === "object" &&
      obj1[key] !== null &&
      obj2[key] !== null
    ) {
      if (!objectEqual(obj1[key], obj2[key])) {
        return false;
      }
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

export function areArraysEqual(arr1, arr2) {
  if (arr1 === arr2) {
    return true;
  }

  if (arr1 == null || arr2 == null) {
    return false;
  }

  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
      if (!areArraysEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else if (typeof arr1[i] === "object" && typeof arr2[i] === "object") {
      if (!areObjectsEqual(arr1[i], arr2[i])) {
        return false;
      }
    } else if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function areObjectsEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  if (obj1 == null || obj2 == null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
      if (!areArraysEqual(obj1[key], obj2[key])) {
        return false;
      }
    } else if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      if (!areObjectsEqual(obj1[key], obj2[key])) {
        return false;
      }
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

export function isDeepEqualTwoData(a, b) {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isDeepEqualTwoData(a[i], b[i])) return false;
    }
    return true;
  } else if (a && typeof a === "object" && b && typeof b === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      // You might want to ignore certain keys like 'checksum'
      if (key === "checksum") continue;
      if (!keysB.includes(key) || !isDeepEqualTwoData(a[key], b[key]))
        return false;
    }
    return true;
  } else {
    return a === b;
  }
}
