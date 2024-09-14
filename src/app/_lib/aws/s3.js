import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { transcribe } from "./transcribe";

const client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
  },
});

export const putAudio = async (filename, data) => {
  const command = new PutObjectCommand({
    Bucket: "hack-the-north-2024-audio",
    Key: filename,
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

export const getAudio = async () => {
  const command = new GetObjectCommand({
    Bucket: "hack-the-north-2024-audio",
    Key: "ai.mp3",
  });

  try {
    const response = await client.send(command);
    const result = await response.Body;
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
