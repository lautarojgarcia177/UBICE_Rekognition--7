// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
import {
  IAWSCredentials,
  IAWSRekognitionSettings,
  IRekognitionFile,
} from "../interfaces";
import {
  APP_ERROR,
  AWS__GET_CREDENTIALS,
  AWS__GET_REKOGNITION_SETTINGS,
  AWS__SET_CREDENTIALS,
  AWS__SET_REKOGNITION_SETTINGS,
  REKOGNITION_FINISH,
  REKOGNITION_PROGRESS,
  START_IMAGES_REKOGNITION,
  SELECT_IMAGES,
} from "../ipc/ipc.messages.constants";

contextBridge.exposeInMainWorld("electron", {
  setAWSCredentials: (credentials: IAWSCredentials) =>
    ipcRenderer.send(AWS__SET_CREDENTIALS, credentials),
  getAWSCredentials: () => ipcRenderer.invoke(AWS__GET_CREDENTIALS),
  setAWSRekognitionSettings: (settings: IAWSRekognitionSettings) =>
    ipcRenderer.send(AWS__SET_REKOGNITION_SETTINGS, settings),
  getAWSRekognitionSettings: () =>
    ipcRenderer.invoke(AWS__GET_REKOGNITION_SETTINGS),
  startImagesRekognition: (files: IRekognitionFile[]) =>
    ipcRenderer.send(START_IMAGES_REKOGNITION, files),
  onRekognitionFinish: (callback) =>
    ipcRenderer.on(REKOGNITION_FINISH, callback),
  onRekognitionProgress: (callback) =>
    ipcRenderer.on(REKOGNITION_PROGRESS, callback),
  onError: (callback) => ipcRenderer.on(APP_ERROR, callback),
  selectImages: () => ipcRenderer.invoke(SELECT_IMAGES),
});
