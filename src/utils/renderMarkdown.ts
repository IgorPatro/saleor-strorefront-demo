import React from "react";
import ReactMarkdown from "react-markdown";

export const renderBlock = (block: any) => {
  const text = block.data.text;

  return <ReactMarkdown>{text}</ReactMarkdown>;
};
