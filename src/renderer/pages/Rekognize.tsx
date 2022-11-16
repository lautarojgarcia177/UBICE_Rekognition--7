import { Button } from "@chakra-ui/react";

export default function Rekognize() {
  function selectImages() {
    window.electron.selectImages().then((result: any) => {
      console.log(result);
    });
  }
  return (
    <>
      <Button onClick={selectImages} colorScheme="blue">
        Seleccionar Imagenes
      </Button>
    </>
  );
}
