import { useContext, useEffect, useState } from "react";
import API from "../api";
import UserContext from "../context/userContext";
import SettingsContext from "../context/settingsContext";
import { sendAudio, sendText } from "../services/request";
import useMedia from "../hooks/useMedia";
import AudioWidget from "../components/audio-widget";
import ChatWidget from "../components/chat-widget";
import { Flex, Stack } from "@chakra-ui/react";

export default function AiTool() {
  const { user } = useContext(UserContext);
  const { settings, setSettings } = useContext(SettingsContext);
  const [audios, setAudios] = useState([]);
  const [subscription, setSubscription] = useState([]);
  const [isFetch, setIsFetch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAudioUrl, setShowAudioUrl] = useState(false);
  const {
    isRecording,
    startRecording,
    stopRecording,
    seconds,
    audioUrl,
    audioBuffer,
  } = useMedia();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/user/${user?.userId}`);
        setSubscription(response.data.subscription);
        setAudios(response.data.chat);
      } catch (err) {
        setAudios([]);
        setSubscription({});
      }
    };

    if (user) fetchData();
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.get(`/user/${user?.userId}`);
      setIsFetch(false);
      setShowAudioUrl(false);
      return setAudios(response.data.chat);
    };

    if (isFetch) fetchData();
  }, [isFetch]);

  const handleSendingAudio = async () => {
    if (audioBuffer) {
      setIsLoading(true);
      if (audioBuffer.byteLength > 0) {
        try {
          let userId = user?.userId;
          const data = await sendAudio(userId, audioBuffer);

          setAudios((prevAudios) => [...prevAudios, data]);
          setIsLoading(false);
          setIsFetch(true);
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  const handleForm = async (values, setIsLoading, { resetForm }) => {
    try {
      let { prompt } = values;
      let userId = user?.userId;

      setIsLoading(true);
      setSettings({ ...settings, type: "text" });

      setAudios((prevAudios) => [
        ...prevAudios,
        {
          prompt,
          isLoading: true,
        },
      ]);

      const data = await sendText(userId, prompt);
      setIsLoading(false);
      resetForm();
      setAudios((prevAudios) => [...prevAudios, data]);
      setIsFetch(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleSendingAudio();
  }, [audioBuffer]);

  return (
    <>
      <Flex h="85vh" overflowY="scroll" direction="column" align="center">
        <Flex
          w="100%"
          p={{ base: "0", md: "10vh" }}
          borderRadius="lg"
          direction="column"
        >
          <Stack spacing={6}>
            {audios?.map((item, idx) => (
              <div key={idx}>
                <AudioWidget
                  user={user}
                  settings={settings}
                  text={item?.prompt}
                  source={
                    item?.question
                      ? `https://voxhub.s3.amazonaws.com/${item?.question}`
                      : null
                  }
                />
                <AudioWidget
                  isBot
                  isLoading={item?.isLoading}
                  settings={settings}
                  text={item?.text}
                  source={`https://voxhub.s3.amazonaws.com/${item?.answer}`}
                />
              </div>
            ))}
            {showAudioUrl && (
              <AudioWidget settings={settings} user={user} source={audioUrl} />
            )}
            {isLoading && <AudioWidget isBot isLoading />}
          </Stack>
        </Flex>
        <ChatWidget
          user={user}
          handleForm={handleForm}
          seconds={seconds}
          isRecording={isRecording}
          subscription={subscription}
          startRecording={startRecording}
          stopRecording={() => {
            stopRecording();
            setShowAudioUrl(true);
          }}
        />
      </Flex>
    </>
  );
}
