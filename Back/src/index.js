const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.post('/quotes/:id/like', async (req, res) => {
  const { id } = req.params;
  try {
    const quote = await prisma.quote.findUnique({ where: { id: Number(id) } });
    if (!quote) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    const updatedQuote = await prisma.quote.update({
      where: { id: Number(id) },
      data: { likes: quote.likes + 1 },
    });
    res.json(updatedQuote);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/quotes/:id/dislike', async (req, res) => {
  const { id } = req.params;
  try {
    const quote = await prisma.quote.findUnique({ where: { id: Number(id) } });
    if (!quote) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    const updatedQuote = await prisma.quote.update({
      where: { id: Number(id) },
      data: { likes: quote.likes - 1 },
    });
    res.json(updatedQuote);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/quotes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: Number(id) },
    });
    if (!quote) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.put('/quotes/:id', async (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;
  try {
    const updatedQuote = await prisma.quote.update({
      where: { id: Number(id) },
      data: { author, content },
    });
    if (!updatedQuote) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    res.json(updatedQuote);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.delete('/quotes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedQuote = await prisma.quote.delete({
      where: { id: Number(id) },
    });
    if (!deletedQuote) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    res.json(deletedQuote);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/quotes/:id/comments', async (req, res) => {
  const { id } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { quoteId: Number(id) },
    });
    if (!comments) {
      return res.status(404).json({ error: 'Comments not found' });
    }
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/quotes/:id/comments', async (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;
  try {
    const newComment = await prisma.comment.create({
      data: { author, content, quoteId: Number(id) },
    });
    res.json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.put('/comments/:id', async (req, res) => {
  const { id } = req.params;
  const { author, content } = req.body;
  try {
    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { author, content },
    });
    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.delete('/comments/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await prisma.comment.delete({
      where: { id: Number(id) },
    });
    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json(deletedComment);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

 const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});