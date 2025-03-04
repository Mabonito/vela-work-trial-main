"use client";
import "./errors.css";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ErrorPage({ error, reset }) {

  return (
    <div className="box">
      <div className="box__ghost">
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>
        <div className="symbol"></div>

        <div className="box__ghost-container">
          <div className="box__ghost-eyes">
            <div className="box__eye-left"></div>
            <div className="box__eye-right"></div>
          </div>
          <div className="box__ghost-bottom">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="box__ghost-shadow"></div>
      </div>

      <div className="box__description">
        <div className="box__description-container">
          <div className="box__description-title">Whoops!</div>
          <div className="box__description-text">
            It seems like something went wrong on our side.
          </div>
        </div>

        <div
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="box__button"
        >
          Try again
        </div>
      </div>
    </div>
  );
}
