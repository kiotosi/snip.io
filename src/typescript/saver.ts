// Saves store to file every time, when store states is changed
import useSnippetsStore from '../store/snippets.store';

// Tauri api to listen when app is quitting
import { appWindow } from '@tauri-apps/api/window';

// System functions to save and load data from snippets.json
import System from './system';

// Data types for store
import { SnippetsStore } from './types/snippetsStore';

async function saveSnippets(snippetsStore: SnippetsStore): Promise<void> {
  await System.snippets.saveSnippetsFile(
    JSON.stringify({
      directories: snippetsStore.directories,
      snippets: snippetsStore.snippets,
    })
  );
}

export default function initializeAutoSave() {
  const snippetsStore = useSnippetsStore();

  // Save snippets on change
  snippetsStore.$subscribe(async () => {
    await saveSnippets(snippetsStore);
  });

  // Save snippets, when user requested exit
  appWindow.onCloseRequested(async () => {
    await saveSnippets(snippetsStore);
  });
}
