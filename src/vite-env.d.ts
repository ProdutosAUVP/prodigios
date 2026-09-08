/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE?: string;
  readonly VITE_FORM_ENDPOINT?: string;
  readonly VITE_APPLY_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
