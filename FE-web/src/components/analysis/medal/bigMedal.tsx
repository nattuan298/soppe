import { Medal, MedalOrange } from "src/components";

export default function BigMedal({ isFull, className }: { isFull?: boolean; className?: string }) {
  return (
    <div className="bg-white rounded-full z-10">
      <div
        className={`w-6 h-6 rounded-full flex justify-center items-center ${
          isFull ? "bg-orange" : "border border-orange bg-opacity-10 bg-orange"
        } ${className ? className : ""}`}
      >
        {isFull && <Medal width="15" height="15" />}
        {!isFull && <MedalOrange width="15" height="15" />}
      </div>
    </div>
  );
}
