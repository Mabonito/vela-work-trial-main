"use client";
import {
  PiSmileySadLight,
  PiSmileyLight,
  PiSmileyMehLight,
} from "react-icons/pi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidInfoCircle } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useRef, useState } from "react";
import { toTimeString } from "../../../lib/formatting";
import moment from "moment";

export default function VelaBubble({
  text,
  translation,
  speaker,
  sentiment,
  language,
  timestamp,
  showTranslation,
  onClick,
}) {
  const [showDetails, setShowDetails] = useState(false);
  const colours = {
    negative: "bg-vela-red",
    neutral: "bg-vela-yellow",
    positive: "bg-vela-green",
  };

  const icons = {
    negative: <PiSmileySadLight size={12} />,
    neutral: <PiSmileyMehLight size={12} />,
    positive: <PiSmileyLight size={12} />,
  };

  let textToShow;
  if (!["en-za", "english"].includes(language?.toLowerCase())) {
    textToShow = showTranslation ? (translation ? translation : text) : text;
  } else {
    textToShow = text;
  }

  return textToShow.trim() !== "" ? (
    <div
      id={`stamp-${timestamp}`}
      className="flex  !overflow-x-visible text-sm"
    >
      <div
        className={`${
          speaker === "agent" || speaker === "bot" ? "agent" : "customer"
        } relative my-4 !overflow-x-visible`}
        onClick={onClick}
      >
        <p className="title text-vela-text-color absolute -top-5 text-xs">
          {speaker}
        </p>
        <p className="absolute text-vela-text-color -top-5 right-1 text-xs">
          {/* {console.log(timestamp)} */}
          {timestamp instanceof Date
            ? moment(timestamp).format("DD/MM/YYYY, HH:mm")
            : toTimeString(timestamp)}
        </p>
        <p className="!py-0.5 !px-2 !m-0 !text-sm">{textToShow}</p>
        {/* <BubbleInfo
          intent={intent}
          sentiment={sentiment}
          confidence={confidence}
          language={language}
          speaker={speaker}
          show={showDetails}
          handleDetails={handleDetails}
        />
        <div
          onClick={handleDetails}
          className={`absolute top-0.5 ${
            speaker === "agent" ? "right-0" : "left-0"
          } inline py-1`}
        >
          <BsThreeDotsVertical size={15} className="inline" />
        </div> */}
        <div
          className={`absolute -bottom-2 ${
            speaker === "agent" ? "left-1.5" : "right-2"
          } text-black font-bold rounded-full floating max-w-fit p-0.5 ${
            colours[sentiment]
          }`}
        >
          {icons[sentiment]}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
