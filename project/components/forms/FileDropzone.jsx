import React from "react";

/**
 * Drag-and-drop file target that drives the "instant quote" flow — the
 * hero's central interaction. Purely presentational; wire onFiles to your
 * own upload/estimate logic.
 */
export function FileDropzone({
  accept = ".docx,.pdf,.xliff,.json,.yaml",
  hint = "DOCX, PDF, XLIFF, JSON",
  state = "idle",
  fileName,
  onFiles,
  className = "",
}) {
  const [dragOver, setDragOver] = React.useState(false);
  const inputRef = React.useRef(null);

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    if (onFiles && e.dataTransfer.files.length) onFiles(e.dataTransfer.files);
  }

  return (
    <div
      className={["tp-dropzone", dragOver ? "tp-dropzone--over" : "", `tp-dropzone--${state}`, className]
        .filter(Boolean)
        .join(" ")}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current && inputRef.current.click()}
      role="button"
      tabIndex={0}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(e) => onFiles && e.target.files.length && onFiles(e.target.files)}
      />
      <div className="tp-dropzone__icon" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
          <path d="M12 16V4M12 4l-4 4M12 4l4 4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="tp-dropzone__text">
        {state === "done" && fileName ? (
          <span className="tp-dropzone__filename">{fileName}</span>
        ) : (
          <>
            <strong>Перетащите файл</strong>
            <span className="tp-dropzone__hint">{hint}</span>
          </>
        )}
      </div>
    </div>
  );
}
