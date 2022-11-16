import { Flex } from "@chakra-ui/react";
import { Link as Router_Link } from "react-router-dom";

export interface MenuEntryProps {
    Feather_Icon: any,
    title: string,
    linkPath: string,
    onClose?: any,
}

export default function MenuEntry({ Feather_Icon, title, linkPath, onClose}: MenuEntryProps) {
  return (
    <Router_Link onClick={onClose} to={linkPath} >
      <Flex>
        {<Feather_Icon style={{ marginRight: "5px" }} />}
        {title}
      </Flex>
    </Router_Link>
  );
}
