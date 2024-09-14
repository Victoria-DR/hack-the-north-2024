import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
  } catch (err) {
    console.error(err);
  }
};
