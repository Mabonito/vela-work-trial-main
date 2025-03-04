import { Popover, Tag } from "antd";
import { BsFillTagFill } from "react-icons/bs";

import { toTimeString } from "../../../lib/formatting";

export default function VelaCallInfoCard({
  id,
  agent,
  time,
  topic,
  silent,
  filename,
  direction,
}) {
  const formatName = (filename) => {
    if (filename.length > 20) {
      return filename.slice(0, 12) + "..." + filename.slice(-8);
    } else {
      return filename;
    }
  };
  return (
    <div className="card !mt-0 text-sm float-right floating !w-full flex-auto">
      <div className="flex justify-between">
        <div className="py-0.5">
          <p className="inline">Call ID:</p>
          <Popover content={<p className="text-xs">{id}</p>}>
            <p className="inline">{` ${formatName(id)}`}</p>
          </Popover>
        </div>
        {filename && (
          <div className="py-0.5">
            <p className="inline">File:</p>
            <Popover content={<p className="text-xs">{filename}</p>}>
              <p className="inline">{` ${formatName(filename)}`}</p>
            </Popover>
          </div>
        )}
      </div>
      <div className="flex justify-between">
        <div className="flex items-center py-0.5">
          <p className="inline title">Agent:</p>
          <p className="inline title ml-1">{` ${agent.name}`}</p>
        </div>
        <div className="py-0.5">
          <p className="inline">Time:</p>
          <p className="inline">{` ${time}`}</p>
        </div>
      </div>

      <div className="flex justify-between">
        {silent && (
          <div className="py-0.5">
            <p className="inline">Silent Time:</p>
            <p className="inline">{` ${silent.toFixed(2)}%`}</p>
          </div>
        )}
        {direction && (
          <div className="py-0.5">
            <p className="inline">Direction:</p>

            <Tag
              color={
                direction === "inbound"
                  ? "var(--vela-blue)"
                  : "var(--vela-green)"
              }
              className="ml-1 py-0 !text-vela-darkest-blue font-light"
            >
              {`${direction}`}
            </Tag>
          </div>
        )}
      </div>
      {topic && (
        <div>
          <p className="inline">Topic:</p>
          <p className="inline px-1 py-0.5 rounded-md bg-vela-light-orange m-1 text-vela-darkest-blue">{`${topic}`}</p>
        </div>
      )}
    </div>
  );
}
