import { BrowserWindow, IpcMain } from "electron";
import {
  AWS__GET_CREDENTIALS,
  AWS__GET_REKOGNITION_SETTINGS,
  SELECT_IMAGES,
} from "./ipc.messages.constants";
import * as store from "../services/store.service";
import { selectImages } from "../services/rekognition.service";

// Two way ipc with ipcMain.handle
export function addIpcMainListeners__TwoWay(
  ipcMain: IpcMain,
  browserWindow: BrowserWindow
): void {
  ipcMain.handle(AWS__GET_CREDENTIALS, () => {
    return store.getAWSCredentials();
  });
  ipcMain.handle(AWS__GET_REKOGNITION_SETTINGS, () => {
    return store.getAWSRekognitionSettings();
  });
  ipcMain.handle(SELECT_IMAGES, () => {
    return selectImages(browserWindow);
  });
}
