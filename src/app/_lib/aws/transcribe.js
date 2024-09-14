"use client";

// import {
//   TranscribeStreamingClient,
//   StartStreamTranscriptionCommand,
// } from "@aws-sdk/client-transcribe-streaming";
// import MicrophoneStream from "microphone-stream";
// import { Buffer } from "buffer";
// require("dotenv").config();

// let microphoneStream = undefined;
// const language = "en-US";
// const SAMPLE_RATE = 44100;
// let transcribeClient = undefined;

// const createMicrophoneStream = async () => {
//   microphoneStream = new MicrophoneStream();
//   microphoneStream.setStream(
//     await window.navigator.mediaDevices.getUserMedia({
//       video: false,
//       audio: true,
//     }),
//   );
// };

// const createTranscribeClient = () => {
//   transcribeClient = new TranscribeStreamingClient({
//     region: process.env.NEXT_PUBLIC_AWS_REGION,
//     credentials: {
//       accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
//       secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
//     },
//   });
// };

// const encodePCMChunk = (chunk) => {
//   const input = MicrophoneStream.toRaw(chunk);
//   let offset = 0;
//   const buffer = new ArrayBuffer(input.length * 2);
//   const view = new DataView(buffer);
//   for (let i = 0; i < input.length; i++, offset += 2) {
//     let s = Math.max(-1, Math.min(1, input[i]));
//     view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
//   }
//   return Buffer.from(buffer);
// };

// const getAudioStream = async function* () {
//   for await (const chunk of microphoneStream) {
//     if (chunk.length <= SAMPLE_RATE) {
//       yield {
//         AudioEvent: {
//           AudioChunk: encodePCMChunk(chunk),
//         },
//       };
//     }
//   }
// };

// const startStreaming = async (language, callback) => {
//   const command = new StartStreamTranscriptionCommand({
//     LanguageCode: language,
//     MediaEncoding: "pcm",
//     MediaSampleRateHertz: SAMPLE_RATE,
//     AudioStream: getAudioStream(),
//   });
//   const data = await transcribeClient.send(command);
//   for await (const event of data.TranscriptResultStream) {
//     const results = event.TranscriptEvent.Transcript.Results;
//     if (results.length && !results[0]?.IsPartial) {
//       const newTranscript = results[0].Alternatives[0].Transcript;
//       console.log(newTranscript);
//       callback(newTranscript + " ");
//     }
//   }
// };

// export const startRecording = async (callback) => {
//   if (microphoneStream || transcribeClient) {
//     stopRecording();
//   }
//   createTranscribeClient();
//   createMicrophoneStream();
//   await startStreaming(language, callback);
// };

// export const stopRecording = function () {
//   if (microphoneStream) {
//     microphoneStream.stop();
//     microphoneStream.destroy();
//     microphoneStream = undefined;
//   }
// };

import {
  TranscribeClient,
  StartTranscriptionJobCommand,
} from "@aws-sdk/client-transcribe";
require("dotenv").config();

const region = process.env.NEXT_PUBLIC_AWS_REGION;
const credentials = {
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
};

const input = {
  TranscriptionJobName: "my-first-transcription-job",
  LanguageCode: "en-US",
  Media: {
    MediaFileUri: "s3://hack-the-north-2024-audio/real.flac",
  },
  OutputBucketName: "hack-the-north-2024-text",
};

async function startTranscriptionRequest() {
  const transcribeConfig = {
    region,
    credentials,
  };
  const transcribeClient = new TranscribeClient(transcribeConfig);
  const transcribeCommand = new StartTranscriptionJobCommand(input);
  try {
    const transcribeResponse = await transcribeClient.send(transcribeCommand);
    console.log("Transcription job created, the details:");
    console.log(transcribeResponse.TranscriptionJob);
  } catch (err) {
    console.log(err);
  }
}

startTranscriptionRequest();
