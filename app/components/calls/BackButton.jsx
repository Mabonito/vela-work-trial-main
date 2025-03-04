"use client";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center px-4 py-1 border rounded-full border-vela-text-color hover:bg-vela-orange hover:text-vela-darkest-blue hover:border-vela-darkest-blue"
      style={{ paddingRight: "17px", paddingLeft: "14px" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span className="ml-0 text-[13px]">Back</span>
    </button>
  );
}
