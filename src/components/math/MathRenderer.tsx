"use client";
import { useMemo } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface Props {
  formula: string;
  displayMode?: boolean;
  className?: string;
}

// Splits "a∥b. Burchak \\frac{3}{5} ga teng." into text + math segments.
function parseMixed(text: string): Array<{ type: "text" | "math"; content: string }> {
  const parts: Array<{ type: "text" | "math"; content: string }> = [];
  let i = 0;
  let textStart = 0;

  while (i < text.length) {
    if (text[i] === "\\" && i + 1 < text.length && /[a-zA-Z]/.test(text[i + 1])) {
      // Flush preceding plain text
      if (i > textStart) {
        parts.push({ type: "text", content: text.slice(textStart, i) });
      }

      const cmdStart = i;
      i++; // skip backslash

      // Command name
      while (i < text.length && /[a-zA-Z*]/.test(text[i])) i++;

      // \left, \right, \big, \Big etc. — delimiter ([ ] ( ) | . \{ \}) ni ham olish
      const cmdName = text.slice(cmdStart + 1, i);
      const delimCmds = ['left','right','bigl','bigr','Bigl','Bigr','big','Big','bigg','Bigg'];
      if (delimCmds.includes(cmdName) && i < text.length) {
        if (/[\[\]().|/]/.test(text[i])) {
          i++; // consume delimiter char: [ ] ( ) | .
        } else if (text[i] === '\\') {
          i++; // \{ or \}
          if (i < text.length) i++;
        }
      }

      // Brace arguments — handle nested braces properly
      let argCount = 0;
      while (i < text.length && text[i] === "{" && argCount < 3) {
        let depth = 1;
        i++;
        while (i < text.length && depth > 0) {
          if (text[i] === "{") depth++;
          else if (text[i] === "}") depth--;
          i++;
        }
        argCount++;
      }

      // Optional subscript / superscript
      if (i < text.length && (text[i] === "_" || text[i] === "^")) {
        i++;
        if (i < text.length && text[i] === "{") {
          let depth = 1;
          i++;
          while (i < text.length && depth > 0) {
            if (text[i] === "{") depth++;
            else if (text[i] === "}") depth--;
            i++;
          }
        } else if (i < text.length) {
          i++; // single-char subscript/superscript
        }
      }

      parts.push({ type: "math", content: text.slice(cmdStart, i) });
      textStart = i;
    } else {
      i++;
    }
  }

  if (textStart < text.length) {
    parts.push({ type: "text", content: text.slice(textStart) });
  }

  return parts;
}

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export default function MathRenderer({ formula, displayMode = false, className }: Props) {
  const html = useMemo(() => {
    if (!formula) return "";

    // Pure LaTeX: starts with \ OR contains {,} (decimal comma notation)
    // OR contains \ and { (mixed math expression like "0{,}25=\dfrac{1}{4}")
    const isPureLaTeX =
      /^\s*\\/.test(formula) ||
      formula.includes("{,}") ||
      (formula.includes("\\") && formula.includes("{"));

    if (!displayMode || isPureLaTeX) {
      return katex.renderToString(formula, {
        throwOnError: false,
        displayMode: isPureLaTeX && displayMode,
      });
    }

    // Mixed Uzbek/Russian text + LaTeX — split and render segments
    return parseMixed(formula)
      .map((seg) => {
        if (seg.type === "math") {
          return katex.renderToString(seg.content, { throwOnError: false, displayMode: false });
        }
        return `<span style="font-family:inherit;font-style:normal;font-weight:inherit">${escHtml(seg.content)}</span>`;
      })
      .join("");
  }, [formula, displayMode]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
