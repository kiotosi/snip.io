import { defineStore } from 'pinia';
import {
  LeftmenuFolderList,
  SnippetsSchema,
  SnippetsStore,
} from '../typescript/types/snippetsStore';

export default defineStore('snippets', {
  state: () =>
    ({
      directoriesList: [],
      snippetsList: [],
    } as SnippetsStore),

  actions: {

    /**
     * Count snippets in folder
     * @param id - ID of folder
     * @returns Amount of snippets in folder
     */
    countSnippets(id: number): number {
      for (const folder of this.directoriesList) {
        if (folder.id === id) {
          return folder.snippetsList.length;
        }
      }

      return 0;
    },
  },

  getters: {

    /**
     * Retrieve folders for leftmenu
     * @returns All folder names
     */
    directoryList(state): LeftmenuFolderList {
      return state.directoriesList.map((folder) => ({
        name: folder.name,
        id: folder.id,
        snippetsAmount: folder.snippetsList.length,
      }));
    },

    /**
     * Retrieve all snippets
     * @returns All snippets in all folder
     */
    allSnippetsList(state): SnippetsSchema[] {
      return state.snippetsList;
    },

    /**
     * Get last ID for the snippet
     * @returns Last snippets id
     */
    lastSnippetID(state): number {
      const idList = state.snippetsList
        .filter((snippet) => snippet.id >= 0)
        .map((snippet) => snippet.id);

      if (idList.length === 0) {
        return -1;
      }

      return Math.max(...idList);
    },

    /**
     * Get last ID for the directory
     * @returns Last directory id
     */
    lastDirectoryID(state): number {
      const idList = state.directoriesList.map((folder) => folder.id);

      if (idList.length === 0) {
        return -1;
      }

      return Math.max(...idList);
    },
  },
});