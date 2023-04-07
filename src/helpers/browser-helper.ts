import isMobile from "is-mobile";

export default class BrowserHelper {
  public static isBrowserMobile(): boolean {
    let touchDevice = "ontouchstart" in document.documentElement;
    let hasNoOrientation = typeof screen.orientation === "undefined";
    let hasMobileUserAgent = isMobile({ ua: navigator.userAgent });
    return (touchDevice || hasNoOrientation) && hasMobileUserAgent;
  }
}
