import {
  TranscribeClient,
  StartTranscriptionJobCommand,
} from "@aws-sdk/client-transcribe";

const transcribeClient = new TranscribeClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export const params = {
  TranscriptionJobName: "Test",
  LanguageCode: "en-US",
  MediaFormat: "mp3",
  Media: {
    MediaFileUri:
      "https://hack-the-north-2024-audio.s3-us-east-1.amazonaws.com/audio.mp3",
  },
  OutputBucketName: "hack-the-north-2024-text",
  OutputKey: "transcription.json",
};

export const transcribe = async () => {
  try {
    const data = await transcribeClient.send(
      new StartTranscriptionJobCommand(params),
    );
    console.log("Success - put", data);
  } catch (err) {
    console.log("Error", err);
  }
};
