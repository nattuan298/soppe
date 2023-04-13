import clsx from "clsx";

import "./styles.css";

interface TrackStageProps {
  name: string;
  description: string;
  dateTime: string;
  documentLink?: string;
  current?: boolean;
  last?: boolean;
}

export default function TrackStage({
  current,
  last,
  name,
  description,
  dateTime,
  documentLink,
}: TrackStageProps) {
  return (
    <>
      <div className={clsx("py-9 track-stage w-full relative", !last && "stage-line")}>
        <div className="flex items-center">
          <div className="indicator">{current && <div className="current-stage" />}</div>
          <div className="stage-description">
            <p className="font-bold">{name}</p>
            <p className="font-light text-sm">
              {description}{" "}
              {documentLink && (
                <a
                  href={documentLink}
                  className="text-blue"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
              )}
            </p>
            <p className="text-sm">{dateTime}</p>
          </div>
        </div>
      </div>
      <div className="stage-divider" />
    </>
  );
}
