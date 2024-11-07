// netlify/functions/transcribe.js
const fs = require('fs');
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.handler = async (event) => {
  try {
    // Parse incoming JSON data
    const { audio } = JSON.parse(event.body);
    const buffer = Buffer.from(audio, 'base64');

    // Write the buffer to a temporary file
    const tempFilePath = '/tmp/audio.wav';
    fs.writeFileSync(tempFilePath, buffer);

    // Send the audio file to OpenAI's Whisper API
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(tempFilePath),
      model: 'whisper-1',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ transcription: transcription.text }),
    };
  } catch (error) {
    console.error('Error transcribing audio:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to transcribe audio' }),
    };
  }
};
