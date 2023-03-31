import React from "react";

export interface AvatarType {
  name?: string;
  src?: string;
  className?: string;
  textClassName?: string;
}

export default function Avatar({ name, src, className, textClassName }: AvatarType) {
  return (
    <div
      className={`rounded-full bg-orangeSuperLight flex items-center justify-center mr-2 ${className}`}
    >
      {src && <img src={src} alt="avatar" className="h-full w-full rounded-full" />}
      {!src && (
        <div className={`text-orange uppercase ${textClassName}`}>{name?.charAt(0) || "a"}</div>
      )}
    </div>
  );
}
