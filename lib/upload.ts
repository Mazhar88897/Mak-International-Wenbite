import multer, { FileFilterCallback } from 'multer';
import { GridFSBucket, ObjectId } from 'mongodb';
import { Request, Response, NextFunction } from 'express';
import dbConnect, { getGridFSBucket } from './mongodb';

// Setup multer memory storage (store the file in memory for GridFS)
const storage = multer.memoryStorage();

// Setup multer upload with file size limit
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB
});

// TypeScript type for the file object that Multer adds to the request
interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

// Middleware function to upload image
export const uploadImage = async (
  req: Request & { file: File; fileId?: ObjectId }, 
  res: Response, 
  next: NextFunction
) => {
  try {
    await dbConnect();
    const bucket = getGridFSBucket();
    
    // Store the file buffer into MongoDB GridFS
    const uploadStream = bucket.openUploadStream(req.file.originalname);
    uploadStream.end(req.file.buffer);

    req.fileId = uploadStream.id; // Store the file ID in the request object
    next(); // Proceed to the next middleware (e.g., save the image ID with the record)
  } catch (err) {
    res.status(500).json({ error: 'Error uploading file', details: err.message });
  }
};

export default upload;
