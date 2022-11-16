import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Container, Flex, Spacer } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import MenuDrawer from "./components/Drawers/MenuDrawer";
import UserDrawer from "./components/Drawers/UserDrawer";

export default function App() {
  return (
    <ChakraProvider>
      <Flex>
        <MenuDrawer />
        <Spacer />
        <UserDrawer />
      </Flex>
      <Container marginTop="15px">
        <Outlet />
      </Container>
    </ChakraProvider>
  );
}
