import { languages } from 'prismjs/components.json';

// Collection of languages
export type SnippetLanguage = keyof typeof languages;

// Default snippet interface
export interface SnippetsSchema {
  id: number;
  title: string;
  language: SnippetLanguage;
  description: string;
  code: string;
}

// Folder for snippets
export interface DirectorySchema {
  name: string;
  id: number;
  snippetsList: number[];
}

// Pinia store
export interface SnippetsStore {
  directoriesList: DirectorySchema[];
  snippetsList: SnippetsSchema[];
}

// -- Leftmenu -- //
// Folders in leftmenu
export interface LeftmenuFolderItem {
  snippetsAmount: number;
  name: string;
  id: number;
}

export type LeftmenuFolderList = LeftmenuFolderItem[];
