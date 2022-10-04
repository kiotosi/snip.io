import { defineStore } from 'pinia';
import {
  LeftmenuFolderList,
  SnippetSchema,
  SnippetsStore,
} from '../typescript/types/snippetsStore';

export default defineStore('snippets', {
  state: () =>
    ({
      folders: [],
    } as SnippetsStore),

  actions: {
    /**
     * Count snippets in folder
     * @param name Name of a folder
     * @returns Amount of snippets in folder
     */
    countSnippets(name: string): number {
      for (const folder of this.folders) {
        if (folder.name === name) {
          return folder.snippets.length;
        }
      }

      return 0;
    },

    getActualIndexes(folderId: number, snippetId: number): [number, number] {
      let directoryIndex = -1;
      let snippetIndex = -1;

      // Searching for folder
      for (const [index, folder] of this.folders.entries()) {
        if (folder.id === folderId) {
          directoryIndex = index;
          break;
        }
      }

      // Searching for snippet
      if (directoryIndex !== -1) {
        for (const [index, snippet] of this.folders[
          directoryIndex
        ].snippets.entries()) {
          if (snippet.id === snippetId) {
            snippetIndex = index;
            break;
          }
        }
      }

      return [directoryIndex, snippetIndex];
    },
  },

  getters: {
    /**
     * Retrieve folders for leftmenu
     * @returns All folder names
     */
    folderList(state): LeftmenuFolderList {
      return state.folders.map((folder) => ({
        name: folder.name,
        id: folder.id,
        snippetsAmount: folder.snippets.length,
      }));
    },

    /**
     * Retrieve all snippets
     * @returns All snippets in all folder
     */
    allSnippetsList(state): SnippetSchema[] {
      const snippets: SnippetSchema[] = [];

      state.folders.forEach((folder) => {
        snippets.push(...folder.snippets);
      });

      return snippets;
    },

    /**
     * Get last ID for the snippet
     * @returns Last snippets id
     */
    lastSnippetID(): number {
      return Math.max(...this.allSnippetsList.map((snippet) => snippet.id));
    },
  },
});
