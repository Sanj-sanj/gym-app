import type { RefObject } from "react";

export default function once(called: RefObject<boolean>, f: Function) {
  if(called.current) return;
  called.current = true
  return f()
}
