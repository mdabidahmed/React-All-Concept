import type { ReactNode } from "react";
import styles from "./RichText.module.css";

interface RichTextProps {
  /** Plain text with lightweight inline markup: **bold**, *italic*, ==keyword==, `code`,
   * and paragraphs where every line starts with "- " are rendered as a bullet list. */
  text: string;
  className?: string;
}

const INLINE_PATTERN = /`([^`]+)`|\*\*([^*]+)\*\*|==([^=]+)==|\*([^*]+)\*/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const key = `${keyPrefix}-${i++}`;
    if (match[1] !== undefined) nodes.push(<code key={key}>{match[1]}</code>);
    else if (match[2] !== undefined) nodes.push(<strong key={key}>{match[2]}</strong>);
    else if (match[3] !== undefined) (
      nodes.push(
        <mark key={key} className={styles.keyword}>
          {match[3]}
        </mark>,
      )
    );
    else if (match[4] !== undefined) nodes.push(<em key={key}>{match[4]}</em>);
    lastIndex = INLINE_PATTERN.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

type Block = { type: "paragraph"; lines: string[] } | { type: "list"; items: string[] };

function parseBlocks(source: string): Block[] {
  return source
    .trim()
    .split(/\n\s*\n+/)
    .map((chunk) => {
      const lines = chunk
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const isList = lines.length > 0 && lines.every((line) => line.startsWith("- "));
      if (isList) {
        return { type: "list", items: lines.map((line) => line.slice(2).trim()) } as const;
      }
      return { type: "paragraph", lines } as const;
    });
}

export function RichText({ text, className }: RichTextProps) {
  const blocks = parseBlocks(text);
  return (
    <div className={className ? `${styles.richText} ${className}` : styles.richText}>
      {blocks.map((block, i) =>
        block.type === "list" ? (
          <ul key={i} className={styles.list}>
            {block.items.map((item, j) => (
              <li key={j}>{renderInline(item, `${i}-${j}`)}</li>
            ))}
          </ul>
        ) : (
          <p key={i} className={styles.paragraph}>
            {renderInline(block.lines.join(" "), `${i}`)}
          </p>
        ),
      )}
    </div>
  );
}
