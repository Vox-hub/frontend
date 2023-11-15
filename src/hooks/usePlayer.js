import { useState, useEffect } from "react";
import axios from "axios";

const usePlayer = (source, isBot) => {
  const [audio, setAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const newAudio = new Audio(source);
    setAudio(newAudio);
  }, [source]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("play", handlePlay);
      audio.addEventListener("pause", handlePause);
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("loadedmetadata", handleLoadedMetadata);

      return () => {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [audio]);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audio.currentTime);
  };

  const handleLoadedMetadata = async () => {
    try {
      if (!isBot) {
        const audioContext = new AudioContext();
        const response = await axios.get(source, {
          responseType: "arraybuffer",
        });
        const arrayBuffer = response.data;
        const decodedAudioBuffer = await audioContext.decodeAudioData(
          arrayBuffer
        );
        setDuration(decodedAudioBuffer.duration);
      } else {
        setDuration(audio.duration);
      }

      console.log(arrayBuffer);
    } catch (error) {
      console.error("Error fetching audio data:", error);
    }
  };

  const play = (url) => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }

    const newAudio = new Audio(url);
    setAudio(newAudio);
    newAudio.play();
  };

  const pause = () => {
    if (audio) {
      audio.pause();
    }
  };

  const seek = (time) => {
    if (audio) {
      audio.currentTime = time;
    }
  };

  return {
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    seek,
  };
};

export default usePlayer;
