import Image from "next/image";
import { LuCopyright } from "react-icons/lu";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex justify-between z-10 bg-vela-background absolute bottom-0 w-full grid-rows-header p-3">
      <Link className="link" target="_blank" href={"https://botlhale.ai/"}>
        <p>
          Botlhale AI{" "}
          <span>
            <LuCopyright className="inline" />
          </span>
        </p>
      </Link>

      <Link
        className="link"
        target="_blank"
        href={"https://docs-vela.botlhale.xyz/"}
      >
        <p>Documentation</p>
      </Link>
    </div>
  );
}
