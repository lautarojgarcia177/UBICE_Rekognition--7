import {
  Menu as Feather_Menu_Icon,
  Image as Feather_Image_Icon,
} from "react-feather";
import { appRoutes } from "../../index";
import MenuEntry from "./MenuEntry";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export default function Rekognition_MenuDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <>
      <IconButton
        ref={btnRef}
        onClick={onOpen}
        aria-label="Menu"
        icon={<Feather_Menu_Icon />}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Flex direction="column" alignItems="start">
              <MenuEntry
                title="Rekonocer numeros"
                linkPath={appRoutes.rekognize}
                Feather_Icon={Feather_Image_Icon}
                onClose={onClose}
              />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
