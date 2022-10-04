import { INVOKE_METHODS } from '../define';
import { invoke } from '@tauri-apps/api';
import { FolderSchema } from './types/snippetsStore';

export default {
  snippets: {
    /**
     * Load snippets.json
     * @returns JSON from snippets.json
     */
    async loadSnippetsFile(): Promise<FolderSchema[]> {
      return JSON.parse(await invoke<string>('get_snippets')) as FolderSchema[];
    },

    /**
     * Saves snippets to snippets.json
     * @param snippetsObject Snippets object from store
     */
    saveSnippetsFile(json: string): void {
      invoke(INVOKE_METHODS.snippets.save, {
        json,
      });
    },
  },
};
