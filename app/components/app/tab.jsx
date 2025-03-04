"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import Link from "next/link";
import { Popover } from "antd";
import LimitMessage from "./limitMessage";

export default function VelaTab({
  title,
  currentTab,
  paramName,
  disabled,
  sectionName,
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (metrics) => {
      const params = new URLSearchParams(searchParams);
      metrics.forEach((metric) => {
        params.set(metric.name, metric.value);
      });
      return params.toString();
    },
    [searchParams]
  );

  return (
    <>
      {!disabled ? (
        <Link
          href={`${pathname}?${createQueryString([
            { name: paramName || "tab", value: title },
          ])}`}
        >
          <button
            className={`rounded-2xl w-32 py-0 px-1 border  hover:bg-vela-orange hover:text-vela-darkest-blue hover:border-vela-orange text-base title mx-2 ${
              currentTab === title
                ? "bg-vela-orange text-vela-darkest-blue border-vela-orange"
                : "border-vela-text-color"
            }`}
          >
            <div className="mx-auto">{title}</div>
          </button>
        </Link>
      ) : (
        <Popover
          content={<LimitMessage sectionName={sectionName} />}
          trigger="hover"
          overlayClassName="custom-popover"
        >
          <button className="rounded-2xl w-32 py-0 px-1 text-base title cursor-not-allowed">
            <div className="mx-auto">{title}</div>
          </button>
        </Popover>
      )}
    </>
  );
}
