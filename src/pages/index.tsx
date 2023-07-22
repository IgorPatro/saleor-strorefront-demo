import { useSaleorAuthContext } from "@saleor/auth-sdk/react";
import ReactMarkdown from "react-markdown";

function renderBlock(block) {
  switch (block.type) {
    case "paragraph":
      return <ReactMarkdown>{block.data.text}</ReactMarkdown>;
    case "header":
      // react-markdown allows you to map markdown types to custom react components.
      // Here we map headers of level 1 to h1 elements, level 2 to h2, and so on.
      // We pass the markdown content as children to the ReactMarkdown component.
      return (
        <ReactMarkdown
          components={{ h1: ({ node, ...props }) => <h1 {...props} /> }}
        >
          {block.data.text}
        </ReactMarkdown>
      );
    default:
      return null;
  }
}

const JsonContent =
  '{"time": 1689878231963, "blocks": [{"id": "M-pekNZPDG", "data": {"text": "Test"}, "type": "paragraph"}, {"id": "-XBulvFQax", "data": {"text": "This is heading", "level": 1}, "type": "header"}, {"id": "GVWWp8_WUh", "data": {"text": "![cat](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkIQgckWx3NgeysRYvIodWkUbEKG0bGESMkXzN6tfc&amp;s)"}, "type": "paragraph"}], "version": "2.24.3"}';

export const getServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};

export default function Home() {
  const { signIn } = useSaleorAuthContext();

  const blocks = JSON.parse(JsonContent).blocks.map((block) => block);
  console.log(blocks);

  const login = async () => {
    const data = await signIn({
      email: "i.patro@wp.pl",
      password: "pass12345678",
    });

    console.log(data);
  };

  return (
    <div>
      <h1>Hello world!</h1>
      <button onClick={login}>Login</button>
      {blocks.map((block) => renderBlock(block))}
      <ReactMarkdown>### Siusiak</ReactMarkdown>
    </div>
  );
}
