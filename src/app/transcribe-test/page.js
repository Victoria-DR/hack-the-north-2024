import { startRecording, stopRecording } from "./_lib/aws/transcribe.js";

export default function TranscribeTest() {
  return (
    <div>
      <button id="start" onClick={startRecording}>
        Start Recording
      </button>
      <button id="stop" onClick={stopRecording}>
        Stop Recording
      </button>
      <div id="transcription"></div>
    </div>
  );
}
