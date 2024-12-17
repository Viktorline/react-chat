import express, { Request, Response, NextFunction } from "express";
import auth from "../middleware/auth";
import Chat from "../models/Chat";
import Message from "../models/Message";

const router = express.Router();

// Тип для аутентифицированного запроса
interface AuthRequest extends Request {
  user: { id: string };
}

// Middleware для приведения req к AuthRequest
const withAuth = (req: Request, res: Response, next: NextFunction) => {
  auth(req, res, () => {
    (req as AuthRequest).user = (req as any).user; // Приведение типов
    next();
  });
};

// Получение всех чатов пользователя
router.get("/chats", withAuth, async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  try {
    const chats = await Chat.find({
      participants: authReq.user.id,
    })
      .populate("participants", "username avatar lastSeen")
      .populate("lastMessage")
      .sort("-updatedAt");

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Получение сообщений для определённого чата
router.get("/messages/:chatId", withAuth, async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chat: chatId }).populate("sender", "username avatar").sort("-createdAt").limit(50);

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Создание приватного чата
router.post("/chat", withAuth, async (req: Request, res: Response): Promise<void> => {
  const authReq = req as AuthRequest;
  try {
    const { userId } = req.body;

    const existingChat = await Chat.findOne({
      type: "private",
      participants: { $all: [authReq.user.id, userId] },
    });

    if (existingChat) {
      res.json(existingChat);
      return;
    }

    const chat = new Chat({
      participants: [authReq.user.id, userId],
      type: "private",
    });

    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
// Создание сообщения
router.post("/message", withAuth, async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  try {
    const { chatId, content } = req.body;

    const message = new Message({
      chat: chatId,
      sender: authReq.user.id,
      content,
      readBy: [authReq.user.id],
    });

    await message.save();

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: message.id,
    });

    await message.populate("sender", "username avatar");
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
