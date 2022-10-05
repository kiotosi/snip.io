import { INVOKE_METHODS } from '../define';
import { invoke } from '@tauri-apps/api';
import { SnippetsStore } from './types/snippetsStore';
import { TauriEvent, listen } from '@tauri-apps/api/event';

export default {
  snippets: {
    /**
     * Load snippets.json
     * @returns JSON from snippets.json
     */
    async loadSnippetsFile(): Promise<SnippetsStore> {
      return JSON.parse(await invoke<string>('get_snippets')) as SnippetsStore;
    },

    /**
     * Saves snippets to snippets.json
     * @param snippetsObject Snippets object from store
     */
    async saveSnippetsFile(json: string): Promise<void> {
      await invoke(INVOKE_METHODS.snippets.save, {
        json,
      });
    },
  },
};
