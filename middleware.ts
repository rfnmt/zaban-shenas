import { NextRequest, NextResponse } from "next/server";
import { NEXT_PUBLIC_APP_URL } from "./env";

function searchStringInArray(str: string, strArray: string[]) {
  for (var j = 0; j < strArray.length; j++) {
    if (strArray[j].match(str)) return j;
  }
  return -1;
}

export default function (req: NextRequest): void | NextResponse {
  const url: string = req.url;
  const token = req.cookies.get("token");
  const baseUrl: string = NEXT_PUBLIC_APP_URL;

  const unprotectedPaths: string[] = [`${baseUrl}public/`];

  // console.log(searchStringInArray(url, unprotectedPaths), token);

  if (token && url === `${baseUrl}signup`) {
    // console.log("searchStringInArray(url, unprotectedPaths)");
    return NextResponse.redirect(new URL("/", req.url));
  } else if (!token && url === `${baseUrl}signup`) {
    // console.log("token && url === `${baseUrl}signup`");
    return NextResponse.next();
  } else if (!token && url !== `${baseUrl}signup`) {
    // console.log("!token && url !== `${baseUrl}signup`");
    return NextResponse.redirect(new URL("/signup", req.url));
  } else if (searchStringInArray(url, unprotectedPaths)) {
    // console.log("!token && url === `${baseUrl}signup`");
    return void 0;
  } else {
    // console.log("else");
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|signup|manifest.json|icon/*).*)",
  ],
};
