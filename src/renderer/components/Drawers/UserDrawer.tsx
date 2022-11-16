import {
  Key as Feather_Key_Icon,
  User as Feather_User_Icon,
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
        icon={<Feather_User_Icon />}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Flex direction="column" alignItems="start">
              <MenuEntry
                title="Credenciales AWS"
                linkPath={appRoutes.awsCredentials}
                Feather_Icon={Feather_Key_Icon}
                onClose={onClose}
              />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
