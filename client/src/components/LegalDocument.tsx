import { Fragment, type ReactNode } from "react";

type Block =
  | { type: "heading"; text: string }
  | { type: "paragraph"; lines: string[] }
  | { type: "list"; items: string[] };

export function parseLegalMarkdown(markdown: string): Block[] {
  const lines = markdown.replace(/\r/g, "").split("\n");
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  const flush = () => {
    if (paragraph.length) blocks.push({ type: "paragraph", lines: paragraph });
    if (list.length) blocks.push({ type: "list", items: list });
    paragraph = [];
    list = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith("# ")) {
      flush();
    } else if (line.startsWith("## ")) {
      flush();
      blocks.push({ type: "heading", text: line.slice(3) });
    } else if (line.startsWith("- ")) {
      if (paragraph.length) flush();
      list.push(line.slice(2));
    } else {
      if (list.length) flush();
      paragraph.push(line);
    }
  }
  flush();
  return blocks;
}

function InlineText({ children }: { children: string }) {
  const parts = children.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong className="font-semibold text-charcoal" key={index}>
        {part.slice(2, -2)}
      </strong>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    )
  );
}

export default function LegalDocument({ markdown }: { markdown: string }) {
  return (
    <div className="mt-14 border-t border-[rgb(66_62_73_/_18%)]">
      {parseLegalMarkdown(markdown).map((block, index): ReactNode => {
        if (block.type === "heading") {
          return (
            <h2
              className="mt-12 mb-4 font-display text-[clamp(26px,3vw,36px)] font-medium tracking-[-.045em] text-charcoal"
              key={`${block.text}-${index}`}
            >
              {block.text}
            </h2>
          );
        }
        if (block.type === "list") {
          return (
            <ul className="my-5 list-disc space-y-2 pl-6 leading-[1.8] text-steel" key={index}>
              {block.items.map(item => (
                <li key={item}><InlineText>{item}</InlineText></li>
              ))}
            </ul>
          );
        }
        return (
          <p className="my-4 leading-[1.8] text-steel" key={index}>
            {block.lines.map((line, lineIndex) => (
              <Fragment key={`${line}-${lineIndex}`}>
                {lineIndex > 0 && <br />}
                <InlineText>{line}</InlineText>
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
