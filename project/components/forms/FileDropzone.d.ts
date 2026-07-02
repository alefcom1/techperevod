import { ReactEventHandler } from "react";

export interface FileDropzoneProps {
  accept?: string;
  /** Small caption listing accepted formats, e.g. "DOCX, PDF, XLIFF, JSON". */
  hint?: string;
  state?: "idle" | "hover" | "done" | "error";
  fileName?: string;
  onFiles?: (files: FileList) => void;
  className?: string;
}

export function FileDropzone(props: FileDropzoneProps): JSX.Element;
