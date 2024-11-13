import { useRef } from 'react';

export default function useStorySpeech() {
  const audioRef = useRef(null);

  // use Google Text-to-Speech API
  const playStoryAsSpeech = async (text) => {
    try {
      const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyBoZ1j6OBsSvVrg2Pcx08d6RT6HzmUA3ww', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: { text },
          voice: { languageCode: 'en-US', name: 'en-US-Wavenet-D' },
          audioConfig: { audioEncoding: 'MP3' },
        }),
      });

      const data = await response.json();
      const audioContent = data.audioContent;

      if (audioContent) {
        const audioSrc = `data:audio/mp3;base64,${audioContent}`;


        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current = null;
        }


        const audio = new Audio(audioSrc);
        audioRef.current = audio;
        audio.play();
      }
    } catch (error) {
      console.error('Error synthesizing story speech:', error);
    }
  };

  return {
    playStoryAsSpeech,
    unloadSound: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    },
  };
}