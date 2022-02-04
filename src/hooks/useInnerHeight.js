import { useLayoutEffect, useState } from "react";

export default function useInnerHeight() {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setInnerHeight(window.innerHeight);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return innerHeight;
}
