import ReactMarkdown from "react-markdown";
import { MARKDOWN_IMAGE } from "@/utils/regexp";
import Image from "next/image";

interface ParagraphBlock {
  id: string;
  type: "paragraph";
  data: {
    text: string;
  };
}

interface HeaderBlock {
  id: string;
  type: "header";
  data: {
    text: string;
    level: 1 | 2 | 3;
  };
}

interface ListBlock {
  id: string;
  type: "list";
  data: {
    items: string[];
    style: "ordered" | "unordered";
  };
}

interface QuoteBlock {
  id: string;
  type: "quote";
  data: {
    text: string;
    caption: string;
  };
}

type Block = ParagraphBlock | HeaderBlock | ListBlock | QuoteBlock;

export const renderMarkdown = (markdown: any) => {
  const blocks = JSON.parse(markdown).blocks as Block[];

  return blocks.map((block) => {
    switch (block.type) {
      case "paragraph":
        if (MARKDOWN_IMAGE.test(block.data.text)) {
          const urlStart = block.data.text.indexOf("(");
          const urlEnd = block.data.text.indexOf(")");
          const imageUrl = block.data.text.substring(urlStart + 1, urlEnd);

          return <Image src={imageUrl} alt="" width={100} height={100} />;
        }

        return <ReactMarkdown>{block.data.text}</ReactMarkdown>;
      case "header":
        const Header = `h${block.data.level}` as keyof JSX.IntrinsicElements;
        return (
          <Header>
            <ReactMarkdown>{block.data.text}</ReactMarkdown>
          </Header>
        );
      case "list":
        const List = block.data.style === "ordered" ? "ol" : "ul";
        return (
          <List>
            {block.data.items.map((item) => (
              <li key={item}>
                <ReactMarkdown>{item}</ReactMarkdown>
              </li>
            ))}
          </List>
        );
      case "quote":
        return <ReactMarkdown>{`Quote: ${block.data.text}`}</ReactMarkdown>;
      default:
        return null;
    }
  });
};
