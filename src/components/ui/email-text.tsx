"use client";

import React, { useEffect, useState } from "react";

/**
 * An email address that survives Cloudflare's email obfuscation. Cloudflare
 * rewrites plain addresses in the HTML, which no longer matches what React
 * renders and breaks hydration. The server HTML says "info [at] virelio.nl"
 * (left alone by Cloudflare); the real address appears once the page runs.
 */
export function EmailText({ address = "info@virelio.nl", link = false, className }: { address?: string; link?: boolean; className?: string }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const text = ready ? address : address.replace("@", " [at] ");
  return link && ready ? <a href={`mailto:${address}`} className={className}>{text}</a> : <span className={className}>{text}</span>;
}

/** Splits text on email addresses and renders each address with EmailText. */
export function WithEmails({ text }: { text: string }) {
  const parts = text.split(/([\w.+-]+@[\w-]+\.[\w.]+)/g);
  return <>{parts.map((p, i) => (i % 2 ? <EmailText key={i} address={p.replace(/\.$/, "")} /> : <React.Fragment key={i}>{p}</React.Fragment>))}</>;
}
