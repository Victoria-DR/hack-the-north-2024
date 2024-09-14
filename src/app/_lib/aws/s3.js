import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { transcribe } from "./transcribe";

const client = new S3Client({});

export const putAudio = async (data) => {
  const command = new PutObjectCommand({
    Bucket: "hack-the-north-2024-audio",
    Key: "audio.mp3",
    Body: data,
  });

  try {
    const response = await client.send(command);
    console.log(response);
    transcribe();
  } catch (err) {
    console.error(err);
  }
};

export const getText = async () => {
  const command = new GetObjectCommand({
    Bucket: "hack-the-north-2024-text",
    Key: "transcription.json",
  });

  try {
    const response = await client.send(command);
    const str = await response.Body.transformToString();
    console.log(str);
    return str;
  } catch (err) {
    console.error(err);
  }
};
