"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Popover } from "antd";
import moment from "moment-timezone";
import { IoMdSearch } from "react-icons/io";

import { toTimeString, highlightText } from "../../../lib/formatting";
import AgentScore from "../../components/calls/agentScore";
import VelaPageTitle from "../../components/layout/title";

export default function CallsTable({ calls, headings }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCalls, setFilteredCalls] = useState(calls);
  // Format filename to display
  const formatName = (filename) => {
    if (filename.length > 12) {
      return filename.slice(0, 4) + "..." + filename.slice(-8);
    }
    return filename;
  };

  // Handle search/filter logic
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = calls.filter((call) => {
      const filename = call.filename || "";
      const id = call.id.toString();
      return (
        filename.toLowerCase().includes(lowerCaseQuery) ||
        id.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setFilteredCalls(filtered);
  }, [searchQuery, calls]);

  return (
    <div>
      <div className="flex justify-between items-end py-3">
        <VelaPageTitle title={"Calls"} />
      </div>

      <div className="flex justify-end">
        {/* Search input */}
        <div className="flex items-center border-b border-vela-grey pb-1 mx-5">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border-none text-base outline-none bg-transparent"
          />
          <IoMdSearch className="text-vela-grey" size={25} />
        </div>
      </div>

      <div className="overflow-x-hidden flex justify-center flex-col">
        <div className="card floating px-7 py-5 overflow-x-hidden mx-auto">
          <div className="table-wrapper">
            <table className="text-left text-sm">
              <thead>
                <tr className="border-b border-vela-grey">
                  <td></td>
                  {headings.map((heading, index) => (
                    <th key={index} scope="col" className="px-4 py-3 title">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredCalls.length > 0 ? (
                  filteredCalls.map((call, index) => {
                    return (
                      <tr
                        className={`border-b border-vela-grey ${
                          !call.supported && "text-vela-grey"
                        } text-ellipsis`}
                        key={index}
                      >
                        <td>{`${index + 1}. `}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <Link
                              className="hover:underline hover:text-vela-orange"
                              href={`/calls/${call.id.toString()}`}
                            >
                              <Popover
                                content={
                                  <p className="text-xs">
                                    {searchQuery.length > 0 ? (
                                      <>
                                        <div
                                          className="italic"
                                          style={{ fontSize: "10px" }}
                                        >
                                          <p>
                                            Filename:{" "}
                                            {call.filename
                                              ? highlightText(
                                                  call.filename,
                                                  searchQuery
                                                )
                                              : "N/A"}
                                          </p>
                                          <p>
                                            Call ID:{" "}
                                            {call.id
                                              ? highlightText(
                                                  call.id.toString(),
                                                  searchQuery
                                                )
                                              : "N/A"}
                                          </p>
                                        </div>
                                      </>
                                    ) : call.filename ? (
                                      highlightText(call.filename, searchQuery)
                                    ) : call.id ? (
                                      highlightText(
                                        call.id.toString(),
                                        searchQuery
                                      )
                                    ) : (
                                      "No data available"
                                    )}
                                  </p>
                                }
                              >
                                <p>
                                  {/* Highlighting filename or call ID */}
                                  {searchQuery.length > 0 ? (
                                    <>
                                      <div
                                        className="italic"
                                        style={{ fontSize: "10px" }}
                                      >
                                        <p>
                                          Filename:{" "}
                                          {call.filename
                                            ? highlightText(
                                                call.filename,
                                                searchQuery
                                              )
                                            : "N/A"}
                                        </p>
                                        <p>
                                          Call ID:{" "}
                                          {call.id
                                            ? highlightText(
                                                call.id.toString(),
                                                searchQuery
                                              )
                                            : "N/A"}
                                        </p>
                                      </div>
                                    </>
                                  ) : call.filename ? (
                                    formatName(call.filename)
                                  ) : call.id ? (
                                    formatName(call.id.toString())
                                  ) : (
                                    "No data available"
                                  )}
                                </p>
                              </Popover>
                            </Link>
                          </div>
                        </td>

                        <td className="px-4 py-3 title">
                          <p>
                            {moment(call.recorded)
                              .tz("Africa/Johannesburg")
                              .format("DD/MM/YYYY HH:mm:ss")}
                          </p>
                        </td>

                        <td className="px-4 py-3 title">
                          <p>{call.agent.name}</p>
                        </td>

                        <td className="px-4 py-3">
                          <p>{toTimeString(call.duration * 1000)}</p>
                        </td>

                        <td className="px-4 py-3">
                          <p>
                            {call?.silent ? `${call?.silent.toFixed(2)}%` : "-"}
                          </p>
                        </td>

                        <td className="px-4 py-3 title">
                          {call.topic ? (
                            call.topic?.length > 20 ? (
                              <Popover content={call.topic}>
                                <p>{`${call.topic?.slice(0, 20)} …`}</p>
                              </Popover>
                            ) : (
                              <p>{call.topic}</p>
                            )
                          ) : (
                            <p>{"-"}</p>
                          )}
                        </td>

                        <td className="px-4 py-3 flex title my-3">
                          {call.total_agent_score ? (
                            <AgentScore score={call.total_agent_score} />
                          ) : (
                            <p>{"-"}</p>
                          )}
                        </td>

                        <td className="px-4 py-3 title">
                          <p>{call.team.name}</p>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={headings.length + 2}
                      className="text-center py-5"
                    >
                      No calls matching the search query found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
