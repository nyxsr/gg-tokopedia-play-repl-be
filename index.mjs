import express from "express";
import "dotenv/config";
import connector from "./service/db/connector.mjs";
import withError from "./utils/response/withError.mjs";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import CommentController from "./controllers/comment/index.mjs";

import { Router as UserRouter } from "./routes/user/index.mjs";
import { Router as GuestRouter } from "./routes/guest/index.mjs";
import { Router as AuthRouter } from "./routes/auth/index.mjs";
import { Router as VideoRouter } from "./routes/video/index.mjs";
import { Router as CommentRouter } from "./routes/comment/index.mjs";
import { Router as ProductRouter } from "./routes/product/index.mjs";
import { Router as DealsCategoryRouter } from "./routes/dealsCategory/index.mjs";
import { Router as VideoCategoryRouter } from "./routes/videoCategory/index.mjs";

const app = express();
app.use(express.json());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://gg-tokopedia-play-repl-fe.vercel.app",
    methods: ["GET", "POST"],
  },
});

connector(process.env.MONGO_URL);

app.use(cors({
  origin: "https://gg-tokopedia-play-repl-fe.vercel.app",
  methods: ["GET", "POST"],
}));

app.use("/api/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/guest", GuestRouter);
app.use("/api/videos", VideoRouter);
app.use("/api/comments", CommentRouter);
app.use("/api/products", ProductRouter);
app.use("/api/deals-category", DealsCategoryRouter);
app.use("/api/video-category", VideoCategoryRouter);

app.use((req, res) => {
  withError(res, 404, `Tidak ada endpoint untuk ${req.originalUrl} !`);
});

io.on("connection", (socket) => {
  console.log("User konek!");

  socket.on("send_comments", async ({ username, comment, video }) => {
    const Comment = new CommentController
    try {
      const newComment = await Comment.commentIo({username,comment,video})

      io.emit('new_comment',newComment)
    } catch (error) {
      console.log(error.message);
    }
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server berjalan pada ${process.env.PORT}`);
});
