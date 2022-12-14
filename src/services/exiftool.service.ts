import { padStart } from 'lodash';
import { ExifTool } from 'exiftool-vendored';
import { IRekognitionFile } from '../interfaces';

let exiftool: ExifTool;

export function initExiftool() {
  exiftool = new ExifTool();
}

export function endExifTool() {
  exiftool.end();
}

export async function writeMetadataOnRekognizedImage(image: IRekognitionFile) {
  if (exiftool) {
    if (!image.numbers.length) {
      image.numbers.push('#');
    } else {
      const numbersForTag: Array<string> = [];
      for (let number of image.numbers) {
        numbersForTag.push(padStart(String(number), 5, '0'));
      }
      // Convert numbers to strings
      image.numbers = numbersForTag.map((number) => String(number));
    }
    const { Keywords } = await exiftool.read(image.path);
    image.numbers = image.numbers.filter(
      (number) => !Keywords?.includes(number)
    );
    return exiftool.write(image.path, { Keywords: [...image.numbers] }, ['-overwrite_original']);
  } else {
    return Promise.reject('Exiftool not initialized');
  }
}
