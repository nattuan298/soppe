import JoditEditor, { ConfigProps } from "jodit-react";
import { useRef, useState } from "react";
interface EditorDescriptionProps {
  description: string;
  onBlurEditor?: (content: string, chars: number, words: number) => void;
  onChangeEditor?: (content: string, chars: number, words: number) => void;
  configs?: ConfigProps;
  errors?: string;
}

const config = {
  limitChars: 2500,
  askBeforePasteHTML: false,
  askBeforePasteFromWord: false,
};

function EditorDescription({
  onBlurEditor,
  onChangeEditor,
  description,
  configs,
  errors,
}: EditorDescriptionProps) {
  const editor = useRef(null);
  const [clearError, setClearError] = useState(true);
  const handleBlur = (newContent: string) => {
    const { chars, words } = getCharsAndWords();
    onBlurEditor?.(newContent, chars, words);
  };

  const handleChange = (newContent: string) => {
    if (newContent.length === 0) {
      setClearError(true);
    } else {
      setClearError(false);
    }
    const { chars, words } = getCharsAndWords();

    onChangeEditor && onChangeEditor(newContent, chars, words);
  };

  return (
    <div id="scm-editor">
      <JoditEditor
        ref={editor}
        value={description}
        onBlur={(newContent: string) => handleBlur(newContent)}
        config={configs || config}
        onChange={(newContent: string) => handleChange(newContent)}
      />
      {errors && clearError && <p className="text-sm text-red-light mt-2">{errors}</p>}
    </div>
  );
}

function getCharsAndWords() {
  const charCountEl = document.querySelector(
    "#scm-editor div.jodit-status-bar > div:nth-child(1) > span",
  );
  const charsContent = charCountEl?.textContent || "";
  const chars = +(charsContent.split(" ")[1] || 0);

  const wordsCountEl = document.querySelector(
    "#scm-editor div.jodit-status-bar > div:nth-child(2) > span",
  );
  const wordsContent = wordsCountEl?.textContent || "";
  const words = +(wordsContent.split(" ")[1] || 0);
  return { chars, words };
}

export { EditorDescription, getCharsAndWords };
