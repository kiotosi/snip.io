import { defineStore } from 'pinia';
import { LOCAL_STORAGE_ITEMS } from '../define';
import { PagerStore } from '../typescript/types/pagerStore';

export default defineStore('pager', {
  state: () =>
    ({
      currentSnippet: -1,
      currentDirectory: -1,
    } as PagerStore),

  actions: {
    /**
     * Collect data about pager state in Local Storage
     */
    fetchPagerInfo(): void {
      this.currentDirectory = +(
        localStorage.getItem(LOCAL_STORAGE_ITEMS.current_directory) ?? -1
      );
      this.currentSnippet = +(
        localStorage.getItem(LOCAL_STORAGE_ITEMS.current_snippet) ?? -1
      );
    },

    /**
     * Saving local states in Local Storage
     */
    savePagerInfo(): void {
      localStorage.setItem(
        LOCAL_STORAGE_ITEMS.current_directory,
        this.currentDirectory.toString()
      );
      localStorage.setItem(
        LOCAL_STORAGE_ITEMS.current_snippet,
        this.currentSnippet.toString()
      );
    },

    /**
     * Flush all states
     */
    clearAll(): void {
      this.currentDirectory = -1;
      this.currentSnippet = -1;
    },

    /**
     * Flush current snippet state
     */
    clearSnippet(): void {
      this.currentSnippet = -1;
    },
  },
});
