// src/routes/TranscribeRoute.js
import express from 'express';
import OpenAI from 'openai';
import fs from 'fs';

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post('/transcribe', async (req, res) => {
  const base64Audio = req.body.audio;
  const buffer = Buffer.from(base64Audio, 'base64');
  fs.writeFileSync('/tmp/audio.wav', buffer);

  try {
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream('/tmp/audio.wav'),
      model: 'whisper-1',
    });
    res.json({ transcription: transcription.text });
  } catch (error) {
    console.error('Transcription error:', error);
    res.status(500).json({ error: 'Failed to transcribe audio' });
  }
});

export default router;
