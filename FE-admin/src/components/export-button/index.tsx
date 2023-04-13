import { ComponentPropsWithoutRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CSVLink } from "react-csv";

import { Button } from "../button";

export interface HeaderProps {
  label: string;
  key: string;
}

interface ExportButtonProps extends ComponentPropsWithoutRef<"button"> {
  className?: string;
  disabled?: boolean;
  url?: string;
  data: Array<Object>;
  headers?: Array<HeaderProps>;
  filename: string;
}

export function ExportButton({
  className,
  disabled,
  data,
  headers,
  filename,
  ...props
}: ExportButtonProps) {
  const { t } = useTranslation("common");

  return (
    <CSVLink data={data} headers={headers} filename={filename}>
      <Button disabled={disabled} variant="text" className={className} {...props}>
        {t`export`}
      </Button>
    </CSVLink>
  );
}
