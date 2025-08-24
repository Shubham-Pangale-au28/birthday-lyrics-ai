import { useState } from "react";

export default function LyricsPlayer({ lyrics }: { lyrics: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    if (!lyrics) return;
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(lyrics);
    utterance.lang = "en-IN"; // or "hi-IN" for Hindi
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);

    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="w-full max-w-md">
      {!isPlaying ? (
        <button onClick={play} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md text-lg">
          ▶️ Play Song
        </button>
      ) : (
        <button onClick={stop} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-md text-lg">
          ⏹ Stop
        </button>
      )}
    </div>
  );
}
