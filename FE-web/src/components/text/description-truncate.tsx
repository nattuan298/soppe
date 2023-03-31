import useTranslation from "next-translate/useTranslation";
import { useEffect, useRef, useState } from "react";

export default function DescriptionTruncate({ value }: { value: string }) {
  const { t } = useTranslation("common");
  const ref = useRef<HTMLDivElement>(null);
  const [seeMore, setSeeMore] = useState(false);
  const [seeLess, setSeeLess] = useState(false);

  useEffect(() => {
    const clientHeight = ref.current?.clientHeight || 0;
    const scrollHeight = ref.current?.scrollHeight || 0;

    if (scrollHeight > clientHeight) {
      setSeeMore(true);
    } else {
      setSeeMore(false);
    }
  }, [ref, value]);

  const toggle = () => {
    setSeeLess(!seeLess);
    if (seeLess) {
      ref.current?.scrollIntoView();
    }
  };

  return (
    <div className="jodit">
      <div
        ref={ref}
        className="overflow-x-auto relative"
        style={seeLess ? {} : { maxHeight: 300, overflowY: "hidden" }}
      >
        <div dangerouslySetInnerHTML={{ __html: value }} />
        {seeMore && !seeLess && (
          <div
            className="w-full absolute bottom-0 left-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255) 100%, #fff 55%)",
              height: 50,
            }}
          />
        )}
      </div>
      {seeMore && (
        <p className="cursor-pointer text-blue mt-1 flex justify-center sm:block" onClick={toggle}>
          {seeLess ? t`see_less` : t`see_more`}
        </p>
      )}
    </div>
  );
}
