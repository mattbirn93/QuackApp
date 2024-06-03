// File: frontend/src/types/global.d.ts
import { EditorView } from 'prosemirror-view';

declare global {
  interface Window {
    view?: EditorView;  // Optional to ensure it doesn't raise an error when accessed without initialization
  }
}

export {};  // Important to make this file a module
