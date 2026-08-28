const express = require('express');
const router = express.Router();

const LLM_API_URL = process.env.LLM_API_URL || 'http://localhost:20128/v1';
const LLM_API_KEY = process.env.LLM_API_KEY || '';
const LLM_MODEL = process.env.LLM_MODEL || 'default';

// POST /api/chat
router.post('/', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Field "message" wajib diisi.' });
    }

    // Susun messages untuk format OpenAI-compatible
    const messages = [
      {
        role: 'system',
        content: 'Kamu adalah asisten AI yang membantu dan ramah. Jawab dalam bahasa Indonesia.',
      },
      ...history,
      { role: 'user', content: message },
    ];

    // Kirim request ke LLM API
    const response = await fetch(`${LLM_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('LLM API Error:', response.status, errorText);
      return res.status(502).json({
        error: 'Gagal mendapat respons dari LLM.',
        detail: errorText,
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Tidak ada respons.';

    res.json({
      reply,
      usage: data.usage || null,
    });
  } catch (error) {
    console.error('Chat error:', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
});

// POST /api/chat/stream — Streaming response (SSE)
router.post('/stream', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Field "message" wajib diisi.' });
    }

    const messages = [
      {
        role: 'system',
        content: 'Kamu adalah asisten AI yang membantu dan ramah. Jawab dalam bahasa Indonesia.',
      },
      ...history,
      { role: 'user', content: message },
    ];

    const response = await fetch(`${LLM_API_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${LLM_API_KEY}`,
      },
      body: JSON.stringify({
        model: LLM_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(502).json({ error: 'Gagal mendapat respons dari LLM.', detail: errorText });
    }

    // Set header SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      res.write(chunk);
    }

    res.end();
  } catch (error) {
    console.error('Stream error:', error.message);
    res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
  }
});

module.exports = router;
