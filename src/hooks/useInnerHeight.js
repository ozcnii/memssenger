import { useLayoutEffect, useState } from "react";

export default function useInnerHeight() {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useLayoutEffect(() => {
    const listener = (e) => {
      setInnerHeight(e.target.innerHeight);
    };
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, []);

  return { innerHeight };
}
