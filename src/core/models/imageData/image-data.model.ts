export interface ImageData {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
  loaded?: boolean;
  // Adjust the index signature to allow both string and number types, including undefined
  [key: string]: string | number | boolean | undefined;
}
