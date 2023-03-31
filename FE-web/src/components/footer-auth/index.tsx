import useTranslation from "next-translate/useTranslation";
import React from "react";
import { Button, Facebook, PhoneIcon } from "src/components";
export function FooterAuth() {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="relative h-9">
        <div className="border h-0.316 bg-lighterGray"></div>
        <div className="class-or-text absolute w-9 h-9 bg-white text-lighterGray text-center">
          {t`or`}
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          <Button className="button-login-other focus:ring-0 bg-white hover:bg-whiteHover shadow-full mr-5">
            <Facebook className="mx-auto" />
            <p className="hidden">facebook</p>
          </Button>
        </div>
        <div>
          <Button className="button-login-other focus:ring-0 bg-white hover:bg-whiteHover shadow-full">
            <PhoneIcon className="mx-auto" />
            <p className="hidden">phone</p>
          </Button>
        </div>
      </div>
    </>
  );
}
