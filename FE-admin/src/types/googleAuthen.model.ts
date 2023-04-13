export interface GoogleGenerate {
  qrCode: string;
  secret: string;
}
export interface modelGG {
  generate: GoogleGenerate;
  loading: boolean;
}
