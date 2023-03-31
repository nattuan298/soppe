/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "react-date-range" {
  import * as React from "react";
  export interface Range {
    /** default: today */
    startDate?: Date | undefined;
    /** default: today */
    endDate?: Date | undefined;
  }

  export type OnChangeProps = Range | { selection: RangeWithKey } | Date;

  export interface RangeWithKey extends Range {
    key: "selection";
  }

  export type AnyDate = string | Date;
  export type DateFunc = (now: Date) => AnyDate;
  export type DateInputType = AnyDate | DateFunc;

  export interface Range {
    startDate?: Date | undefined;
    endDate?: Date | undefined;
    color?: string | undefined;
    key?: string | undefined;
    autoFocus?: boolean | undefined;
    disabled?: boolean | undefined;
    showDateDisplay?: boolean | undefined;
  }

  export class DateRange extends React.Component<any> {}
  export class Calendar extends React.Component<any> {}
}

declare module "react-lightbox-pack";
declare module "next-csrf";
