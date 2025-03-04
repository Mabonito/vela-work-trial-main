
"use client";
import { MdOutlineSearch, MdClose } from "react-icons/md";
import { useState, useRef } from "react";
import { Empty } from "antd";
import moment from "moment-timezone";

import VelaCallInfoCard from "../../../components/calls/infoCard";
import Player from "../../../components/calls/wave";
import VelaBubble from "../../../components/calls/bubble";
import SmartDetector from "../../../components/calls/smart_detector";

export default function CallInfo({ call, organisations, url }) {
  const wavesurfer = useRef(null);
  const transcriptRef = useRef(null);

  const segments = call.segments;
  const entityRules = organisations[0].redaction;

  const [showTranslation, setShowTranslation] = useState(true);
  const [search, setSearch] = useState("");
  const [showRedacted, setShowRedacted] = useState(true);

  const replaceEntities = (redactionStatement, transcription) => {
    // If showRedacted is false, return the original transcription
    if (!showRedacted) return transcription;

    const entityRegex = /\[([A-Za-z]+)\]/g;
    const entities = [...redactionStatement.matchAll(entityRegex)].map(match => match[1]);

    // If no entities found, return original statement
    if (entities.length === 0) return redactionStatement;

    // Split the redaction statement into parts
    const parts = redactionStatement.split(entityRegex);
    const replacements = {};

    // Iterate over each entity and find a corresponding replacement in the transcription
    entities.forEach((entity, index) => {
      const entityKey = `[${entity}]`;
      const shouldReplace = entityRules.entities[entityKey] === false;

      if (shouldReplace) {
        const beforeContext = parts[index * 2] || '';
        const afterContext = parts[index * 2 + 2] || '';

        const beforeTrim = beforeContext.trim().split(/\s+/).pop() || '';
        const afterTrim = afterContext.trim().split(/\s+/).slice(0, 2).join(' ') || '';

        let startIndex = transcription.indexOf(beforeTrim);

        if (startIndex === -1 && afterTrim) {
          startIndex = transcription.indexOf(afterTrim);
        }

        if (startIndex !== -1) {
          const endIndex = afterTrim
            ? transcription.indexOf(afterTrim, startIndex + beforeTrim.length)
            : transcription.length;

          if (endIndex !== -1) {
            const replacementText = transcription
              .substring(startIndex + beforeTrim.length, endIndex)
              .trim();

            if (replacementText) {
              replacements[entity] = replacementText;
            }
          }
        }
      }
    });

    let result = redactionStatement;
    entities.forEach(entity => {
      const entityKey = `[${entity}]`;
      const shouldReplace = entityRules.entities[entityKey] === false;

      if (shouldReplace) {
        result = result.replace(new RegExp(`\\[${entity}\\]`, 'g'), replacements[entity] || `[${entity}]`);
      }
    });

    return result;
  };

  return (
    <>
      <div className="flex pt-3 h-56">
        <div className="pr-5 w-3/5">
          <p className="underline font-semibold title">audio</p>
          <div className="card floating !py-1.5 !mt-0 !w-full">
            {call.audio_path.substring(0, 5) !== "chat-" ? (
              <Player
                url={url}
                wavesurfer={wavesurfer}
                transcriptRef={transcriptRef}
                timestamps={call.segments.map((segment) => {
                  return { start: segment.start, end: segment.end };
                })}
              />
            ) : (
              <div className="h-32 flex items-center justify-center">
                <Empty
                  description={"Audio not available"}
                  imageStyle={{
                    height: "50px",
                    paddingTop: "5px",
                    paddingBottom: "5px",
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="w-2/5 flex flex-col">
          <p className="underline font-semibold title">info</p>
          <VelaCallInfoCard
            id={call.id}
            agent={call.agent}
            time={moment(call.recorded)
              .tz("Africa/Johannesburg")
              .format("DD MMMM YYYY, HH:mm")}
            topic={call.topic}
            duration={call.duration}
            silent={call.silent}
            filename={call.filename}
            direction={call.direction}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-1 gap-6 min-h-0 h-full">
        <div className="flex flex-col w-full h-full max-w-xl">
          <p className="underline font-semibold title">Transcript</p>
          <div className="flex justify-between text-sm">
            <div className="relative flex items-center w-full">
              <input
                type="text"
                placeholder="Search"
                className="custom-search-input inline w-full border-b-2 border-vela-grey py-0.5 pl-1 pr-5 focus:outline-none focus:border-vela-text-color border-t-0 border-l-0 border-r-0"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />

              <div
                onClick={() => {
                  setSearch("");
                }}
                className={`inline absolute right-1 text-opacity-50 ${
                  search.length > 0 && "cursor-pointer"
                }`}
              >
                {search.length > 0 ? (
                  <MdClose size={15} />
                ) : (
                  <MdOutlineSearch size={15} />
                )}
              </div>
            </div>

            <div className="flex items-center justify-between w-full space-x-4">
              <div className="flex items-center space-x-2 ml-5">
                <button
                  className={`px-3 py-1 text-center border rounded-full focus:outline-none transition-colors duration-300 text-sm tracking-wide ${
                    !showTranslation
                      ? "bg-vela-orange text-vela-darkest-blue font-medium border-vela-orange"
                      : " border font-medium"
                  }`}
                  onClick={() => setShowTranslation(false)}
                >
                  Original
                </button>
                <button
                  className={`px-3 py-1 text-center border rounded-full focus:outline-none transition-colors duration-300 text-sm tracking-wide ${
                    showTranslation
                      ? "bg-vela-orange text-vela-darkest-blue font-medium border-vela-orange"
                      : " border font-medium"
                  }`}
                  onClick={() => setShowTranslation(true)}
                >
                  English
                </button>
              </div>
            </div>
          </div>
          {/* Add the "Reveal Redacted Entities" button */}
          <div className="flex justify-end mt-2">
            <button
              className={`px-3 py-1 text-center border rounded-full focus:outline-none transition-colors duration-300 text-sm tracking-wide ${
                !showRedacted
                  ? "bg-vela-orange text-vela-darkest-blue font-medium border-vela-orange"
                  : " border font-medium"
              }`}
              onClick={() => setShowRedacted(!showRedacted)}
            >
              {showRedacted ? "Reveal Redacted Entities" : "Show Redacted View"}
            </button>
          </div>
          <div
            ref={transcriptRef}
            className="card !my-0 !mt-1 floating !w-full !h-full overflow-y-scroll max-w-xl"
          >
            {"boolean" === typeof call.supported && call.supported ? (
              (search.length > 0
                ? segments.filter((segment) =>
                    segment.transcription?.toLowerCase()?.includes(search)
                  )
                : segments
              ).map((segment, index) => {
                return (
                  <VelaBubble
                    key={index}
                    speaker={segment.speaker}
                    sentiment={segment.emotion}
                    text={replaceEntities(segment.redaction, segment.transcription)}
                    translation={segment.translation}
                    language={segment.language}
                    timestamp={segment.start}
                    showTranslation={showTranslation}
                    onClick={() => {
                      wavesurfer.current?.setTime(segment.start / 1000);
                    }}
                  />
                );
              })
            ) : (
              <div className="flex justify-center items-center h-full">
                <Empty description={"Language not supported"} />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col grid-rows-2 grid-flow-col w-full h-full col-span-2">
          <p className="underline font-semibold title">{"smart detector"}</p>

          {
            <div
              className={`flex flex-col floating w-full h-full overflow-y-scroll`}
            >
              <div className="flex flex-1 flex-col overflow-y-scroll">
                <SmartDetector summary={call.summary} />
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}