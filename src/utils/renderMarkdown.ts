import ReactMarkdown from "react-markdown";
import { ReactMarkdownProps } from "react-markdown/lib/ast-to-react";

export const renderBlock = (block) => {
  const text = block.data.text;

  return <ReactMarkdown children={markdown} />;
  //   switch (block.type) {
  //     case "paragraph":
  //       return <ReactMarkdown>{block.data.text}</ReactMarkdown>;
  //     // case "header":
  //     //   return (
  //     //     <ReactMarkdown
  //     //       components={{ h1: ({ node, ...props }) => <h1 {...props} /> }}
  //     //     >
  //     //       {block.data.text}
  //     //     </ReactMarkdown>
  //     //   );
  //     default:
  //       return null;
  //   }
};
