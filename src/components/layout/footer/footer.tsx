import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="w-full border-t-2 p-4 mt-10 flex flex-col">
      <Link href="/">Logo</Link>
      <div className="flex justify-center items-center p-4">
        Created with ❤️ by Igor Patro
      </div>
    </div>
  );
};
