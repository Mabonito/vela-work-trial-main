"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { RiForward10Fill, RiReplay10Fill } from "react-icons/ri";
import { toTimeString } from "../../../lib/formatting";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#999C9F",
  progressColor: "#fc5f1e",
  cursorColor: "OrangeRed",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 105,
  normalize: true,
  partialRender: true,
  hideScrollbar: false,
  fillParent: true,
  mediaControls: true,
  xhr: {
    cache: "default",
    mode: "cors",
    method: "GET",
    credentials: "include",
    headers: [
      { key: "cache-control", value: "no-cache" },
      { key: "pragma", value: "no-cache" },
    ],
  },
});

export default function Player({ url, wavesurfer, transcriptRef, timestamps }) {
  let created = false;
  const waveformRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0.0);

  useEffect(() => {
    console.log(waveformRef?.current);
    if (url && waveformRef?.current && !wavesurfer.current && !created) {
      console.log("creating");
      create();
      created = true;
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        created = false;
      }
    };
  }, []);

  const create = async () => {
    const WaveSurfer = (await import("wavesurfer.js")).default;

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);

    wavesurfer.current.load(url);

    wavesurfer.current.on("ready", function () {
      setProgress(
        (wavesurfer.current.getCurrentTime() /
          wavesurfer.current.getDuration()) *
          100
      );
    });

    wavesurfer.current.on("audioprocess", function () {
      if (wavesurfer.current.isPlaying()) {
        let wavTimestamp = wavesurfer.current.getCurrentTime();
        setProgress((wavTimestamp / wavesurfer.current.getDuration()) * 100);
        let currentTimestamp = timestamps.filter(
          (stamp) =>
            wavTimestamp * 1000 >= stamp.start &&
            wavTimestamp * 1000 <= stamp.end
        );

        if (currentTimestamp.length > 0) {
          let element = transcriptRef.current?.querySelector(
            `#stamp-${CSS.escape(currentTimestamp[0].start)}`
          );
          if (element) {
            element?.scrollIntoView(true, { behavior: "smooth" });
            let otherBubbles = element?.parentElement?.children;
            [...otherBubbles].forEach(function (elem) {
              elem.firstElementChild?.classList.remove("highlight");
            });

            element?.firstElementChild?.classList.add("highlight");
          }
        }

        if (progress >= 100.0) {
          setPlaying(false);
          let otherBubbles = transcriptRef.current?.querySelector(
            `#stamp-${CSS.escape(timestamps[0].start)}`
          )?.parentElement?.children;
          [...otherBubbles].forEach(function (elem) {
            elem.firstElementChild?.classList.remove("highlight");
          });
        }
      }
    });

    wavesurfer.current.on("finish", function () {
      setPlaying(false);
    });

    wavesurfer.current.on("timeupdate", function () {
      setProgress(
        (wavesurfer.current.getCurrentTime() /
          wavesurfer.current.getDuration()) *
          100
      );
    });
  };

  return (
    <div className="pt-0">
      <div id="waveform" ref={waveformRef} />
    </div>
  );
}
