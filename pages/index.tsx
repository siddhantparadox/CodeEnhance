import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import axios from "axios";
import ToggleDarkMode from "../components/ToggleDarkMode"; // Ensure this is correctly imported

export default function Home() {
  const [code, setCode] = useState("");
  const [enhancedCode, setEnhancedCode] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [editorKey, setEditorKey] = useState(0);
  const [language, setLanguage] = useState("javascript"); // Language state

  const languageOptions = {
    javascript: "JavaScript",
    python: "Python",
    java: "Java",
    csharp: "C#",
    cpp: "C++",
    c: "C",
    ruby: "Ruby",
    go: "Go",
    rust: "Rust",
    swift: "Swift",
    kotlin: "Kotlin",
    typescript: "TypeScript",
    php: "PHP",
    sql: "SQL",
    perl: "Perl",
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setDescription("");
    setEnhancedCode("");
    try {
      const response = await axios.post("/api/review", { code, language });
      const { choices } = response.data;
      if (choices && choices.length > 0) {
        setEnhancedCode(choices[0].message.content);
        setDescription(
          "Here is the enhanced code based on the recommendations:"
        );
      } else {
        setDescription("No enhancements were returned.");
      }
    } catch (error) {
      console.error("Failed to submit code for review:", error);
      setDescription(
        error.response?.data?.error ||
          "Failed to submit code for review. Please try again."
      );
    } finally {
      setIsLoading(false);
      setEditorKey((prevKey) => prevKey + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
      <div className="py-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          CodeEnhance
        </h1>
      </div>
      <div className="px-10 flex justify-between items-center mb-4">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="rounded bg-white p-2 text-black dark:bg-gray-600 dark:text-white"
        >
          {Object.entries(languageOptions).map(([value, name]) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </select>
        <ToggleDarkMode />
      </div>
      <div className="px-10">
        <div className="mb-6">
          {" "}
          {/* Increased margin-bottom here */}
          <CodeEditor value={code} onChange={setCode} language={language} />
        </div>
        <div className="text-center mb-4">
          {" "}
          {/* Increased margin-bottom here */}
          <button
            onClick={handleSubmit}
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Reviewing Code..." : "Submit Code"}
          </button>
        </div>
        <p className="text-center text-red-500">{description}</p>
        {enhancedCode && (
          <CodeEditor
            key={editorKey}
            value={enhancedCode}
            onChange={() => {}}
            language={language}
            isReadOnly={true}
          />
        )}
      </div>
    </div>
  );
}
