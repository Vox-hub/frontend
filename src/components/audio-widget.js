import ReactMarkdown from "react-markdown";
import { Flex, Box, Stack, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import AudioPlayer from "./audio-player";
import GPT3Logo from "../assets/gpt3.png";
import GPT4Logo from "../assets/gpt4.png";

const AudioWidget = ({ isBot, isLoading, user, settings, source, text }) => {
  const TextWidget = ({ text }) => (
    <Box
      maxW="80vh"
      my={{ base: "2.5vh", lg: "0vh" }}
      bg="red.400"
      borderRadius="lg"
      p={2}
    >
      <Stack>
        <ReactMarkdown
          children={text}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  {...props}
                  children={String(children).replace(/\n$/, "")}
                  style={atomDark}
                  language={match[1]}
                  wrapLongLines
                  PreTag="div"
                />
              ) : (
                <code {...props} className={className}>
                  {children}
                </code>
              );
            },
            li({ node, ...props }) {
              return <li style={{ marginLeft: "1.5vh" }} {...props} />;
            },
          }}
        />
      </Stack>
    </Box>
  );

  return (
    <Flex
      my={8}
      ml={{ base: "0vh", lg: isBot && "2.5vh" }}
      justify={!isBot && "flex-end"}
      align={settings?.type === "audio" && "center"}
    >
      <Image
        mr="2vh"
        src={
          isBot
            ? settings?.model === "gpt-4"
              ? GPT4Logo
              : GPT3Logo
            : user?.picture
        }
        borderRadius="50px"
        h="5vh"
      />
      {isLoading ? (
        <Flex
          fontSize="xl"
          background={"red.400"}
          p={"5px 10px 5px 10px"}
          borderRadius={"lg"}
        >
          <motion.span
            animate={{ opacity: [0.2, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ...
          </motion.span>
        </Flex>
      ) : !isBot && source === null ? (
        <TextWidget text={text} />
      ) : settings?.type === "audio" ? (
        <AudioPlayer source={source} isBot={isBot} />
      ) : (
        <TextWidget text={text} />
      )}
    </Flex>
  );
};

export default AudioWidget;
