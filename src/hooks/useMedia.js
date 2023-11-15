import { useState, useEffect, useRef } from "react";

export default function useMedia() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState(null);
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const chunksRef = useRef([]);
  const startTimeRef = useRef(0);

  let mediaStream = null;

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      mediaStreamRef.current = mediaStream;
      mediaRecorderRef.current = new MediaRecorder(mediaStream);
      chunksRef.current = []; // Reset chunksRef.current for each recording

      mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
        chunksRef.current.push(e.data);
      });

      mediaRecorderRef.current.addEventListener("stop", async () => {
        const audioBlobMain = new Blob(chunksRef.current, {
          type: mediaRecorderRef.current.mimeType,
        });

        const audioUrl = URL.createObjectURL(audioBlobMain);
        const audioBuffer = await audioBlobMain.arrayBuffer();

        setAudioBuffer(audioBuffer);
        setAudioUrl(audioUrl);
      });

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      setError(err.message);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaStreamRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      setSeconds(0);
    }
  };

  useEffect(() => {
    let interval = null;

    if (isRecording) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setSeconds(0);
    }

    return () => clearInterval(interval);
  }, [isRecording]);

  return {
    isRecording,
    startRecording,
    stopRecording,
    seconds,
    audioUrl,
    audioBuffer,
    error,
  };
}
