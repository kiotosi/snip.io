// Saves store to file every time, when store states is changed
import useSnippetsStore from '../store/snippets.store';

// System functions to save and load data from snippets.json
import System from './system';

// Data types for store
import { SnippetsStore } from './types/snippetsStore';

async function saveSnippets(snippetsStore: SnippetsStore): Promise<void> {
  await System.snippets.saveSnippetsFile(

    JSON.stringify({
      directories: snippetsStore.directoriesList, // eslint-disable-line @typescript-eslint/naming-convention
      snippets: snippetsStore.snippetsList, // eslint-disable-line @typescript-eslint/naming-convention
    })
  );
}

export default function initializeAutoSave(): void {
  const snippetsStore = useSnippetsStore();

  // Save snippets on change
  snippetsStore.$subscribe(() => {
    saveSnippets(snippetsStore).catch(err => console.error(err));
  });
}
