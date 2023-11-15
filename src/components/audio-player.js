import usePlayer from "../hooks/usePlayer";
import {
  Flex,
  Button,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";

export default function AudioPlayer({ source, isBot }) {
  const { isPlaying, currentTime, duration, play, pause, seek } = usePlayer(
    source,
    isBot
  );

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <Flex
      bg="red.400"
      borderRadius="lg"
      p={2}
      w={{ base: "20vh", lg: "40vh" }}
      my={{ base: "2vh", lg: "0vh" }}
      justify="space-around"
      align="center"
    >
      <Button
        variant="ghost"
        onClick={() => (isPlaying ? pause() : play(source))}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </Button>
      <Box w="25vh" m="0vh 2.5vh 0vh 1vh">
        <Slider
          min={0}
          max={duration}
          value={currentTime}
          colorScheme="gray"
          onChange={(value) => seek(value)}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </Box>
      <Text as="b">
        {isPlaying ? formatTime(currentTime) : formatTime(duration)}
      </Text>
    </Flex>
  );
}
