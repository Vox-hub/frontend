import { useState, useEffect } from "react";
import { Link as Routing } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Heading,
  Button,
  Link,
  Icon,
  Stack,
  Collapse,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function LayoutMobile() {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"70px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
          align="center"
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
          <Heading fontSize="2xl">
            Vox
            <Text as="span" color="red.300">
              Hub
            </Text>{" "}
          </Heading>
        </Flex>
        <Button ml="3vh" variant="ghost" onClick={toggleColorMode}>
          {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      <MobileNavItem to="home" label={"Home"} />
      <MobileNavItem to="pricing" label={"Pricing"} />
      <MobileNavItem to="contact-us" label={"Contact us"} />
      <MobileNavItem to="signin" label={"Sign in"} />
      <MobileNavItem to="signup" label={"Sign up"} />
    </Stack>
  );
};

const MobileNavItem = ({ to, label }) => {
  return (
    <Stack as={Routing} to={to} spacing={4}>
      <Flex
        py={2}
        as={Link}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};
