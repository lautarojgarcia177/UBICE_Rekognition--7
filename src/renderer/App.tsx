import { MemoryRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import MenuDrawer from "./components/MenuDrawer";

export default function App() {
  return (
    <ChakraProvider>
      <MenuDrawer />
      <Container marginTop="15px">
        <Outlet />
      </Container>
    </ChakraProvider>
  );
}
