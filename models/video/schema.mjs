import mongoose, { Schema } from "mongoose";

const videoSchema = new Schema(
  {
    title: { type: String, required: [true, "Judul wajib diisi!"] },
    urlThumbnail: {
      type: String,
      required: [true, "URL Thumbnail wajib diisi!"],
    },
    src: { type: String, required: [true, "Link wajib diisi"] },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Pembuat sudah diisi"],
    },
    videoCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "videoCategory",
      required: false,
    },
    dealsCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "dealsCategory",
      required: false,
    },
    isOnlyLive: { type: Boolean, required: false, default: false },
    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "comment", required: false },
    ],
  },
  { timestamps: true }
);

export default videoSchema;
