import express from "express";
import "dotenv/config";
import connector from "./service/db/connector.mjs";
import withError from "./utils/response/withError.mjs";
import cors from 'cors'

import { Router as UserRouter } from "./routes/user/index.mjs";
import { Router as GuestRouter } from "./routes/guest/index.mjs";
import { Router as AuthRouter } from "./routes/auth/index.mjs";
import { Router as VideoRouter } from "./routes/video/index.mjs";
import { Router as CommentRouter } from "./routes/comment/index.mjs";
import { Router as ProductRouter } from "./routes/product/index.mjs";

const app = express();

app.use(express.json())
app.use(cors())

connector(process.env.MONGO_URL);

app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/guest", GuestRouter);
app.use("/api/videos", VideoRouter);
app.use("/api/comments", CommentRouter);
app.use("/api/products", ProductRouter);

app.use((req, res) => {
  withError(res, 404, `Tidak ada endpoint untuk ${req.originalUrl} !`);
});

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan pada ${process.env.PORT}`);
});
