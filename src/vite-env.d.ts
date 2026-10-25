/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Access key pública de Web3Forms (se incrusta en el bundle; Web3Forms la diseña para ser pública). */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
