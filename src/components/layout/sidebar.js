import React, { useState, useContext } from "react";
import UserContext from "../../context/userContext";
import SettingsContext from "../../context/settingsContext";
import { logout } from "../../services/auth";
import { Link as Routing } from "react-router-dom";
import CustomModal from "../custom-modal";
import ProfileModal from "../profile-modal";
import ChatModal from "../chat-modal";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  Heading,
  useColorModeValue,
  Link,
  Drawer,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Image,
  useColorMode,
  DrawerContent,
  Text,
  HStack,
  useDisclosure,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FiMenu, FiSettings } from "react-icons/fi";
import { MdSubscriptions } from "react-icons/md";
import { ImPriceTag } from "react-icons/im";
import {
  AiFillHome,
  AiFillAudio,
  AiFillContacts,
  AiOutlineLogout,
} from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { BsFillChatDotsFill } from "react-icons/bs";

const LinkItems = [
  { name: "Home", to: "ai-tool", icon: AiFillHome },
  { name: "Subscription", to: "subscription", icon: MdSubscriptions },
  { name: "Pricing", to: "pricing", icon: ImPriceTag },
  { name: "Contact us", to: "contact-us", icon: AiFillContacts },
];

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onCloseBar={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onCloseBar, ...rest }) => {
  const { user } = useContext(UserContext);
  const { settings, setSettings } = useContext(SettingsContext);

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [modal, setModal] = useState("");

  const OpenModal = (modal) => {
    setModal(modal);
    onOpen();
  };

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <CustomModal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        children={
          modal === "profile" ? (
            <ProfileModal user={user} onClose={onClose} />
          ) : (
            <ChatModal onClose={onClose} />
          )
        }
      />
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Heading fontSize="3xl">
          Vox
          <Text as="span" color="red.300">
            Hub
          </Text>{" "}
        </Heading>
        <CloseButton
          display={{ base: "flex", md: "none" }}
          onClick={onCloseBar}
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} to={link.to} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
      <Box position="fixed" bottom="2vh">
        <HStack>
          <Menu>
            <MenuButton as={Button} variant="ghost">
              <Flex align="center">
                <Image
                  mr="1vh"
                  borderRadius={"3xl"}
                  h="4.5vh"
                  src={user?.picture}
                />
                <Text>{user?.firstname}</Text>
              </Flex>
            </MenuButton>
            <MenuList ml="2.5vh">
              <MenuItem onClick={() => OpenModal("profile")} icon={<BiUser />}>
                Edit profile
              </MenuItem>
              <MenuItem onClick={() => OpenModal("chat")} icon={<FiSettings />}>
                Manage settings
              </MenuItem>
              <MenuItem
                onClick={() => {
                  let { type } = settings;

                  if (type === "audio") {
                    window.localStorage.setItem("type", "text");
                    setSettings({ ...settings, type: "text" });
                  } else {
                    window.localStorage.setItem("type", "audio");
                    setSettings({ ...settings, type: "audio" });
                  }
                }}
                icon={
                  settings?.type === "text" ? (
                    <AiFillAudio />
                  ) : (
                    <BsFillChatDotsFill />
                  )
                }
              >
                Switch to {settings?.type === "text" ? "audio" : "text"}
              </MenuItem>
              <MenuItem icon={<AiOutlineLogout />} onClick={() => logout()}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
          <Button variant="ghost" onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, to, children, ...rest }) => {
  return (
    <Link
      as={Routing}
      to={to}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "red.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="3xl" ml="4" fontFamily="monospace" fontWeight="bold">
        Vox
        <Text as="span" color="red.300">
          Hub
        </Text>{" "}
      </Text>
    </Flex>
  );
};
