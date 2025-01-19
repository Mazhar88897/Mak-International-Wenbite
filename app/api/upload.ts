import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";

// Disable bodyParser to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm({
      uploadDir: "./public/uploads",
      keepExtensions: true, // Keep the file extensions
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: "Failed to upload file" });
      }

      const file = files.image;
      const filePath = file.filepath;

      // Respond with the file URL
      const fileUrl = `/uploads/${file.newFilename}`;
      return res.status(200).json({ url: fileUrl });
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default uploadHandler;
