import { AWSRekognitionErrorTypes } from "../enums";
import { UBICEAWSClient } from "../classes/UBICEAWSClient";
import { IRekognitionFile } from "../interfaces";
import * as storeSvc from "../services/store.service";
import * as exiftoolService from "../services/exiftool.service";
import { BrowserWindow, dialog } from "electron";

export function selectImages(browserWindow: BrowserWindow) {
  return dialog
    .showOpenDialog(browserWindow, {
      title: "Seleccionar imagenes",
      properties: ["openFile", "multiSelections"],
      filters: [
        {
          extensions: ["jpg", "png", "JPG", "PNG", "JPEG", "jpeg"],
          name: "image",
        },
      ],
    })
    .then((result) => {
      if (result.canceled) {
        return "Dialog was canceled";
      } else {
        return result;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function rekognizeImages(
  files: IRekognitionFile[],
  progressCallback: (...args: any) => void,
  finishCallback: (...args: any) => void,
  errorCallback: (...args: any) => void
): Promise<any> {
  const awsCredentials = storeSvc.getAWSCredentials();
  const awsRekognitionSettings = storeSvc.getAWSRekognitionSettings();
  const awsClient = new UBICEAWSClient(awsCredentials);
  function awsRekognitionPromiseErrorHandler(err: AWSRekognitionErrorTypes) {
    console.error("AWS REKOGNITION ERROR", err);
    // Generar el objeto de error
    const error = new Error();
    error.name = err;
    switch (error.name) {
      case AWSRekognitionErrorTypes.InvalidSignatureException:
        error.message = "Las credenciales de AWS son invalidas";
        break;
      case AWSRekognitionErrorTypes.ValidationException:
        error.message = "Variables de reconocimiento en AWS invalidas";
        break;
      default:
        error.message = "Hubo un error en el rekonocimiento de AWS";
    }
    errorCallback(error);
  }
  function exiftoolWriteMetadataPromiseErrorHandler(err) {
    console.error("EXIFTOOL WRITE METADATA ERROR", err);
    // Generar el objeto de error
    const error = new Error();
    error.name = err;
    switch (error.name) {
      default:
        error.message = "Hubo un error en el rekonocimiento de AWS";
    }
    errorCallback(error);
  }
  // Preparar el arreglo de promesas para rekonocimiento
  const rekognitionPromiseArray: Array<Promise<any>> = [];
  for (let image of files) {
    const rekognitionPromise = awsClient
      .rekognize(image.path, awsRekognitionSettings.minConfidence)
      .then((rekognizedNumbers) => {
        image.numbers = rekognizedNumbers;
        return exiftoolService
          .writeMetadataOnRekognizedImage(image)
          .then(() => progressCallback())
          .catch((err) => exiftoolWriteMetadataPromiseErrorHandler(err));
      });
    rekognitionPromiseArray.push(rekognitionPromise);
  }
  // Instanciar exiftool
  exiftoolService.initExiftool();
  // Disparar el reconocimiento de todas las imagenes
  Promise.allSettled(rekognitionPromiseArray).then((results) => {
    // Cerrar la instancia de exiftool
    exiftoolService.endExifTool();
    finishCallback();
  });
}
