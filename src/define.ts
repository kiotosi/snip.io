import { SnippetLanguage } from './typescript/types/snippetsStore';
import { appWindow } from '@tauri-apps/api/window'

export const LANGUAGES_SELECTOR_LIST: Partial<Record<SnippetLanguage, string>> =
  {
    markup: 'Simple text',
    c: 'C',
    cpp: 'C++',
    csharp: 'C#',
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    coffeescript: 'CoffeeScript',
    python: 'Python',
    go: 'Go',
    java: 'Java',
    json: 'JSON',
    rust: 'Rust',
    php: 'PHP',
    d: 'D',
    dart: 'Dart',
    docker: 'Docker',
    fsharp: 'F#',
    haml: 'Haml',
    haskell: 'Haskell',
    ini: 'Ini',
    kotlin: 'Kotlin',
    less: 'Less',
    lisp: 'Lisp',
    lua: 'Lua',
    nasm: 'NASM',
    objectivec: 'Objective-C',
    powershell: 'Powershell',
    pug: 'Pug',
    r: 'R',
    jsx: 'React JSX',
    tsx: 'React TSX',
    sass: 'Sass',
    scss: 'Scss',
    sql: 'SQL',
    vim: 'Vim',
    yaml: 'YAML',
  };

export const IMMUTABLE_DIRECTORIES_LIST = [ 'All Snippets' ];

export const LOCAL_STORAGE_ITEMS = {
  current_directory: 'pager_current_directory',
  current_snippet: 'pager_current_snippet',
};

export const INVOKE_METHODS = {
  snippets: {
    save: 'save_snippets',
    load: 'get_snippets',
  },
};

export const WINDOW_COMMANDS = [
  {
    name: "Hide Window",
    command: (): Promise<void> => appWindow.minimize(),
  },
  {
    name: "Close App",
    command: (): Promise<void> => appWindow.close(),
  },
  {
    name: "Toggle Fullscreen",
    command: (): Promise<void> => appWindow.isFullscreen().then(async isFullscreen => {await appWindow.setFullscreen(!isFullscreen);}),
  },
  {
    name: "Maximize or minimize",
    command: (): Promise<void> => appWindow.toggleMaximize()
  }
];