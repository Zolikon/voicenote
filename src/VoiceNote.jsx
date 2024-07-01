import { useState } from "react";
import PropTypes from "prop-types";
import CopyButton from "./CopyButton";

function VoiceNote() {
  const [results, setResults] = useState([]);
  const [recognition, setRecognition] = useState(null);

  const triggerPhrase = "the end";

  function startListening(onMessage, onError = () => {}) {
    try {
      let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = "hu-HU";
      setRecognition(recognition);

      recognition.onresult = function (event) {
        let transcript = event.results[event.results.length - 1][0].transcript.trim();
        onMessage(transcript);
        if (transcript.toLowerCase().includes(triggerPhrase.toLowerCase())) {
          console.log("Dictation stopped");
          toggleDictation();
        }
      };

      recognition.onerror = function (event) {
        console.error("Speech recognition error", event.error);
        onError(event.error);
      };

      recognition.start();
    } catch (error) {
      console.error(error);
    }
  }

  function startDictation() {
    setResults([]);
    startListening(
      (message) => {
        setResults((results) => [...results, message]);
      },
      (error) => console.error(error)
    );
  }

  function stopDictation() {
    recognition.stop();
    setRecognition(null);
  }

  function toggleDictation() {
    if (recognition) {
      stopDictation();
    } else {
      startDictation();
    }
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-start gap-5">
      <button
        onClick={toggleDictation}
        className={`rounded-full   p-2 aspect-square w-24 group relative ${
          recognition ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
        }`}
      >
        <span className="material-symbols-outlined text-4xl  group-hover:scale-125 transition-all duration-100">
          mic
        </span>
        {recognition && (
          <div className="h-4 w-4 bg-red-800 rounded-full animate-pulse absolute right-2 bottom-2 duration-200 border-4 border-stone-200" />
        )}
      </button>

      {recognition ? (
        <div>Dictation in progress...</div>
      ) : (
        results.length > 0 && <ResultDisplay results={results} isTimestamped={false} />
      )}
    </div>
  );
}

function ResultDisplay({ results }) {
  const [content, setContent] = useState(
    results
      .map((line) => `${line[0].toUpperCase()}${line.slice(1)}.`)
      .join("\n")
      .trim()
  );

  return (
    <div className="flex flex-col gap-2 m-2 border-2 border-stone-700 rounded-lg h-4/5 w-[90%] xl:w-1/2 relative overflow-y-auto">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="h-full w-full focus:border-none p-2 resize-none bg-stone-100 rounded-lg"
        data-gramm="false"
      />
      <CopyButton textToCopy={content} />
    </div>
  );
}

ResultDisplay.propTypes = {
  results: PropTypes.array.isRequired,
};

export default VoiceNote;
