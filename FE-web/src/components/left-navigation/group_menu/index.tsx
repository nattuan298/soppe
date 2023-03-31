import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import Header from "./header";
import ArrowRightNavigation from "@material-ui/icons/ChevronRight";
import cls from "../index.module.css";
import { Divider } from "@material-ui/core";

interface OneGroupProps {
  title: string;
  childMenu: { title: string; icon: ReactElement; urlBase?: string }[];
  isMobile?: boolean;
  handleClose?: () => void;
}

export default function OneGroup({
  title,
  childMenu,
  isMobile = true,
  handleClose,
}: OneGroupProps) {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(true);

  const router = useRouter();

  const toggleOpen = () => {
    setIsOpen((preState) => !preState);
  };

  const handleClick = (url?: string) => () => {
    url && router.push(url);
    isMobile && handleClose?.();
  };

  return (
    <div className={cls.item}>
      <Header isOpen={isOpen} onClick={toggleOpen} title={title} />

      {isOpen &&
        childMenu.map((item) => (
          <div
            className={`flex justify-between items-center cursor-pointer ${cls.item} ${
              item.urlBase && router.route.startsWith(item.urlBase) ? "text-orange" : ""
            }`}
            onClick={handleClick(item.urlBase)}
            key={item.title}
          >
            <div className="flex justify-start">
              <div className="w-10 text-orange">{item.icon}</div>
              <div>{t(item.title)}</div>
            </div>

            <div className="w-6 h-6 flex justify-center">
              <ArrowRightNavigation className="text-inherit" />
            </div>
          </div>
        ))}

      <Divider />
    </div>
  );
}
