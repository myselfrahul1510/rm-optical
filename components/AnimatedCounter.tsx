"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  end: number;
  duration?: number;
  suffix?: string;
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  suffix = "",
}: Props) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;

        started.current = true;

        let start = 0;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;

          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
      },
      {
        threshold: 0.4,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}