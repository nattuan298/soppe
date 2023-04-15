import Link from "next/link";
import React from "react";
import { AppStore } from "src/components/svg";
import Image from "next/image";
import clsx from "clsx";

function GetAppFooter({ className }: { className?: string }) {
  return (
    <div>
      <div className={clsx("flex justify-center	items-center space-x-3", className)}>
        <Link href="">
          <a className="flex" target="_blank">
            <AppStore />
          </a>
        </Link>
        <Link href="">
          <a className="flex" target="_blank">
            <Image
              src="/assets/images/google-play.png"
              alt="image delivery"
              width={160}
              height={54}
            />
          </a>
        </Link>
      </div>
    </div>
  );
}

export { GetAppFooter };
