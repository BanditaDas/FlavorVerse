import React from "react";
import { FaBookOpen } from "react-icons/fa";

export default function Loader({ message = "Loading..." }) {
  return (
    <div className="grow flex items-center justify-center bg-transparent">
      <div className="flex flex-col items-center gap-3 text-[#7C8B6F]">
        <FaBookOpen className="w-7 h-7 animate-pulse" />
        <p className="font-mono text-xs tracking-[0.2em] uppercase">{message}</p>
      </div>
    </div>
  );
}