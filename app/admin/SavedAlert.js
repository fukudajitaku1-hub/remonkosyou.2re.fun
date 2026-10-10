"use client";

import { useEffect } from "react";

export default function SavedAlert({ show }) {
  useEffect(() => {
    if (!show) return;
    window.alert("保存しました。");
    const url = new URL(window.location.href);
    url.searchParams.delete("saved");
    window.history.replaceState({}, "", url.pathname + url.search);
  }, [show]);

  return null;
}
