import { v2 as cloudinary } from "cloudinary";

// The Cloudinary SDK automatically parses process.env.CLOUDINARY_URL
// (already in your .env.local) as soon as this module is imported.
// Calling config() explicitly just makes sure it's applied and forces https URLs.
cloudinary.config({
  secure: true,
});

export default cloudinary;
