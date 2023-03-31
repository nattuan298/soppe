import { Medal, MedalOrange } from "src/components";

export default function SmallMedal({
  isFull,
  className,
  medalSize = "8",
}: {
  isFull?: boolean;
  className?: string;
  medalSize?: string;
}) {
  return (
    <div className="bg-white rounded-full z-10">
      <div
        className={`rounded-full flex justify-center items-center ${
          isFull ? "bg-orange" : "border border-orange bg-opacity-10 bg-orange"
        } ${className ? className : "w-4 h-4"}`}
      >
        {isFull && <Medal width={medalSize} height={medalSize} />}
        {!isFull && <MedalOrange width={medalSize} height={medalSize} />}
      </div>
    </div>
  );
}
