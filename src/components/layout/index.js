import LayoutDesktop from "./desktop";
import LayoutMobile from "./mobile";
import { useMediaQuery } from "@chakra-ui/react";

export default function Layout() {
  const [isMobile] = useMediaQuery("(max-width: 480px)");

  return <>{isMobile ? <LayoutMobile /> : <LayoutDesktop />}</>;
}
