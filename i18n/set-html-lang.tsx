"use client";

import { useEffect } from "react";

/**
 * Sets document.documentElement.lang when locale is available.
 * Used so getLocale() can be called inside Suspense (fixes blocking-route).
 */
export function SetHtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
