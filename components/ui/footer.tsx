import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <div className="text-xs font-light text-zinc-600 flex flex-col gap-2">
      <p>
        Create this website with using{" "}
        <Link
          href="https://nextjs.org/"
          className="text-orange-500 hover:underline"
        >
          Next.js
        </Link>{" "}
        and{" "}
        <Link
          href="https://tailwindcss.com/"
          className="text-orange-500 hover:underline"
        >
          Tailwind CSS
        </Link>
      </p>
      <p>
        Contents licensed under CC BY-NC-SA 4.0 MIT License © 2024 Joshua
        Manuputty
      </p>
    </div>
  );
};
