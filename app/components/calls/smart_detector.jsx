"use client";
import { useState } from "react";
import { IoFileTrayOutline } from "react-icons/io5";

import Loading from "../../loading";

export default function SmartDetector({ summary }) {
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const Tab = ({ title, tabIndex }) => {
    return (
      <button
        onClick={() => {
          setIndex(tabIndex);
        }}
        className={`rounded-2xl w-28 py-0 px-1 text-sm border hover:bg-vela-orange hover:text-vela-darkest-blue hover:border-vela-orange title mx-2 ${
          index == tabIndex
            ? "bg-vela-orange text-vela-darkest-blue border-vela-orange"
            : "border-vela-text-color"
        }`}
      >
        <div className="mx-auto">{title}</div>
      </button>
    );
  };
  return (
    <>
      <div className="floating bg-vela-background-card !pt-7 !w-full  flex !text-sm flex-1 flex-col overflow-auto">
        <div className="flex justify-center items-center pb-5">
          <Tab title={"summary"} tabIndex={0} />
        </div>
        <div className="flex h-full justify-center overflow-y-scroll w-full">
          {
            {
              0:
                summary && summary !== "" ? (
                  <div className="p-3 mx-3 my-1 flex flex-col overflow-y-auto">
                    <p className="py-3">{summary}</p>
                  </div>
                ) : (
                  <div className="flex flex-col pt-3 items-center">
                    <IoFileTrayOutline size={50} />
                    <div>No summary available for this call</div>
                  </div>
                ),
            }[index]
          }
        </div>
      </div>
      {loading && <Loading />}
    </>
  );
}
