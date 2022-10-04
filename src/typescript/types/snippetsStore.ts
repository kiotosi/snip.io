import { languages } from 'prismjs/components.json';

// Collection of languages
export type SnippetLanguage = keyof typeof languages;

// Default snippet interface
export interface SnippetSchema {
  id: number;
  title: string;
  language: SnippetLanguage;
  description: string;
  code: string;
}

// Folder for snippets
export interface FolderSchema {
  name: string;
  id: number;
  snippets: SnippetSchema[];
}

// Pinia store
export interface SnippetsStore {
  folders: FolderSchema[];
}

// -- Leftmenu -- //
// Folders in leftmenu
export interface LeftmenuFolderItem {
  snippetsAmount: number;
  name: string;
  id: number;
}

export type LeftmenuFolderList = LeftmenuFolderItem[];
