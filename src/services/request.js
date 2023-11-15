import API from "../api";

export const sendAudio = async (userId, audioBuffer) => {
  try {
    const formData = new FormData();
    formData.append(
      "audio",
      new Blob([audioBuffer], { type: "audio/mpeg" }),
      "audio.mp3"
    );

    const audioContext = new AudioContext();
    const decodedAudioBuffer = await audioContext.decodeAudioData(audioBuffer);

    formData.append("voiceId", window.localStorage.getItem("voice"));
    formData.append("question_duration", decodedAudioBuffer.duration);
    formData.append("userId", userId);
    formData.append("model", window.localStorage.getItem("model"));
    formData.append("language", window.localStorage.getItem("language"));

    const response = await API.post("/request", formData);

    return response.data;
  } catch (error) {
    return error.response;
  }
};

export const sendText = async (userId, prompt) => {
  try {
    let Data = {
      voiceId: window.localStorage.getItem("voice"),
      userId: userId,
      model: window.localStorage.getItem("model"),
      language: window.localStorage.getItem("language"),
      prompt: prompt,
    };

    const response = await API.post("/request/text", Data);

    return response.data;
  } catch (error) {
    return error.response;
  }
};
