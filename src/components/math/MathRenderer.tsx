"use client";
import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface Props {
  formula: string;
  displayMode?: boolean;
  className?: string;
}

export default function MathRenderer({ formula, displayMode = false, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(formula, ref.current, {
        throwOnError: false,
        displayMode,
      });
    }
  }, [formula, displayMode]);

  return <span ref={ref} className={className} />;
}