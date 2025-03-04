"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdPhone, MdApartment, MdMenu, MdAdd, MdRemove } from "react-icons/md";
import { RiChatCheckFill } from "react-icons/ri";
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
// import { FaTools } from "react-icons/fa";

export default function VelaDrawer({ profile }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedTabs, setExpandedTabs] = useState({});
  const currentPage = usePathname();

  const tabs = [{ name: "calls", icon: <MdPhone size={24} /> }];

  const toggleCollapse = (tabName) => {
    setExpandedTabs((prev) => ({
      ...prev,
      [tabName]: !prev[tabName],
    }));
  };

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`sidebar bg-vela-background-drawer h-screen flex flex-col justify-between transition-all duration-300 ${
          isCollapsed ? "w-0" : "w-52"
        }  fixed top-0 left-0 z-40`}
      >
        {/* Top Section: Organization and Collapse Button */}
        <div className="bg-vela-orange p-3 flex justify-between items-center">
          {!isCollapsed && (
            <>
              <div className="bg-vela-darkest-blue rounded-full p-1 ">
                <MdApartment className="text-vela-orange" size={18} />
              </div>
              <div
                className="text-vela-darkest-blue font-medium ml-2 truncate overflow-hidden whitespace-nowrap flex-grow text-center"
                style={{ maxWidth: "120px" }}
              >
                {profile?.organisation?.name}
              </div>
            </>
          )}

          {/* Hamburger */}
          <div
            className="cursor-pointer p-2 -top-3"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <MdMenu
                className="text-vela-darkest-blue  bg-vela-orange"
                size={28}
              />
            ) : (
              <TbLayoutSidebarLeftCollapse
                className="text-vela-darkest-blue"
                size={28}
              />
            )}
          </div>
        </div>

        {/* Middle Section: Tabs */}
        {!isCollapsed && (
          <div className="h-full py-4 overflow-y-auto custom-scrollbar">
            <p className="text-vela-drawer-outline text-xs font-bold ml-5 tracking-wide">
              TOOLS
            </p>
            {tabs.map((tab, index) => (
              <div key={index}>
                {/* If tab is "smart_detector", separate Link + icon */}
                {tab.name === "smart_detector" ? (
                  <div
                    className={`text-sm p-3 capitalize flex items-center gap-3 hoverable ${
                      tab.name === currentPage.split("/")[1]
                        ? "active-link"
                        : ""
                    }`}
                  >
                    {/* The text + icon that navigates to /smart_detector */}
                    <Link
                      href={`/${tab.name}`}
                      className="flex items-center gap-3 flex-grow"
                    >
                      {tab.icon}
                      {!isCollapsed && tab.name.replace("_", " ")}
                    </Link>

                    {/* The '+' or '-' icon that toggles the subtasks */}
                    {tab.subtasks && (
                      <div
                        className="cursor-pointer ml-auto"
                        onClick={(e) => {
                          // Stop Link's navigation
                          e.preventDefault();
                          e.stopPropagation();
                          toggleCollapse(tab.name);
                        }}
                      >
                        {expandedTabs[tab.name] ? (
                          <MdRemove size={20} />
                        ) : (
                          <MdAdd size={20} />
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  // Otherwise, use a single Link that toggles on click (if subtasks)
                  <Link
                    href={`/${tab.name}`}
                    onClick={(e) => handleTabClick(tab, e)}
                    className={` text-sm p-3 capitalize cursor-pointer flex items-center gap-3 hoverable ${
                      tab.name === currentPage.split("/")[1]
                        ? "active-link"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 flex-grow">
                      {tab.icon}
                      {!isCollapsed && tab.name.replace("_", " ")}
                    </div>
                    {tab.subtasks && (
                      <div className="ml-auto">
                        {expandedTabs[tab.name] ? (
                          <MdRemove size={20} />
                        ) : (
                          <MdAdd size={20} />
                        )}
                      </div>
                    )}
                  </Link>
                )}

                {/* Render subtasks if expanded */}
                {expandedTabs[tab.name] && tab.subtasks && (
                  <div className="ml-10 mt-2">
                    {tab.subtasks.map((subtask, subIndex) => (
                      <Link
                        key={subIndex}
                        href={`/${tab.name}/${subtask.name}`}
                        className={`text-xs p-2 cursor-pointer block hoverable ${
                          currentPage === `/${tab.name}/${subtask.name}`
                            ? "active-link"
                            : ""
                        }`}
                      >
                        {subtask.displayName}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "ml-10" : "ml-52"
        }`}
      ></div>
    </div>
  );
}
