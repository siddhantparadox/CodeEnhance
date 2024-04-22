// components/CodeEditor.tsx
import Editor from "@monaco-editor/react";
import PropTypes from "prop-types";

// Define a mapping from your friendly language names to Monaco's language identifiers
const languageToMonacoMapping = {
  javascript: "javascript",
  python: "python",
  java: "java",
  csharp: "csharp", // C#
  cpp: "cpp", // C++
  c: "c", // C
  ruby: "ruby",
  go: "go",
  rust: "rust",
  swift: "swift",
  kotlin: "kotlin",
  typescript: "typescript",
  php: "php",
  sql: "sql",
  perl: "perl",
  // Add more languages here as you support them in your dropdown
};

function CodeEditor({
  value,
  onChange,
  language = "javascript",
  isReadOnly = false,
}) {
  // Convert friendly language names to Monaco editor language identifiers
  const monacoLanguage = languageToMonacoMapping[language] || language; // Default to passed language if not mapped

  return (
    <Editor
      height="50vh"
      language={monacoLanguage}
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{
        readOnly: isReadOnly,
        lineNumbers: "on",
        // Add any other Monaco editor options here
        automaticLayout: true, // Recommended to ensure the editor adjusts to container's resizing
        minimap: { enabled: false }, // Disable minimap for simplicity
      }}
    />
  );
}

CodeEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  language: PropTypes.string,
  isReadOnly: PropTypes.bool,
};

export default CodeEditor;
