const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');

router.get('/chats', auth, async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user.id,
    })
      .populate('participants', 'username avatar lastSeen')
      .populate('lastMessage')
      .sort('-updatedAt');

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/messages/:chatId', auth, async (req, res) => {
  try {
    const messages = await Message.find({
      chat: req.params.chatId,
    })
      .populate('sender', 'username avatar')
      .sort('-createdAt')
      .limit(50);

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/chat', auth, async (req, res) => {
  try {
    const { userId } = req.body;

    const existingChat = await Chat.findOne({
      type: 'private',
      participants: { $all: [req.user.id, userId] },
    });

    if (existingChat) {
      return res.json(existingChat);
    }

    const chat = new Chat({
      participants: [req.user.id, userId],
      type: 'private',
    });

    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/message', auth, async (req, res) => {
  try {
    const { chatId, content } = req.body;

    const message = new Message({
      chat: chatId,
      sender: req.user.id,
      content,
      readBy: [req.user.id],
    });

    await message.save();

    await Chat.findByIdAndUpdate(chatId, {
      lastMessage: message._id,
    });

    await message.populate('sender', 'username avatar');
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
