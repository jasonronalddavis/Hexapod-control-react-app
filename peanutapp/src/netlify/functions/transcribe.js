const OpenAI = require('openai');

exports.handler = async (event) => {
  // Handle preflight requests for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
  }

  try {
    // Initialize OpenAI with API key
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Parse the incoming request body
    const { audio } = JSON.parse(event.body);

    if (!audio) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Audio data is required' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      };
    }

    // Convert base64 to buffer
    const audioBuffer = Buffer.from(audio, 'base64');

    // Create temporary file path for the audio
    const tempFilePath = `/tmp/audio_${Date.now()}.wav`;
    require('fs').writeFileSync(tempFilePath, audioBuffer);

    // Send to OpenAI Whisper API
    const transcription = await openai.audio.transcriptions.create({
      file: require('fs').createReadStream(tempFilePath),
      model: 'whisper-1'
    });

    // Clean up temp file
    require('fs').unlinkSync(tempFilePath);

    // Return the transcription
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        transcription: transcription.text,
        status: 'success'
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Transcription error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to transcribe audio',
        details: error.message 
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
  }
};
