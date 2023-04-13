// / <reference types="react-scripts" />
declare module "jodit-react" {
  import React from "react";
  interface ConfigProps {
    limitChars?: number;
    limitWords?: number;
    askBeforePasteHTML?: boolean;
    askBeforePasteFromWord?: boolean;
  }
  interface JoditProps {
    value?: string;
    onBlur?: (newContent: string) => void;
    onChange?: (newContent: string) => void;
    config?: ConfigProps;
  }

  export default class JoditEditor extends React.Component<JoditProps> {}
}
