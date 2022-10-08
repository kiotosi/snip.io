import { defineStore } from 'pinia';
import {
  LeftmenuFolderList,
  SnippetsSchema,
  SnippetsStore,
} from '../typescript/types/snippetsStore';

export default defineStore('snippets', {
  state: () =>
    ({
      directories: [],
      snippets: [],

      // IMPL Maybe we can implement here `currentSnippet`, for changing it not through computed proprty in CurrentSnippet.vue
    } as SnippetsStore),

  actions: {

    /**
     * Count snippets in folder
     * @param id - ID of folder
     * @returns Amount of snippets in folder
     */
    countSnippets(id: number): number {
      for (const folder of this.directories) {
        if (folder.id === id) {
          return folder.snippets_list.length;
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
      return state.directories.map((folder) => ({
        name: folder.name,
        id: folder.id,
        snippetsAmount: folder.snippets_list.length,
      }));
    },

    /**
     * Retrieve all snippets
     * @returns All snippets in all folder
     */
    allSnippetsList(state): SnippetsSchema[] {
      return state.snippets;
    },

    /**
     * Get last ID for the snippet
     * @returns Last snippets id
     */
    lastSnippetID(state): number {
      const ids = state.snippets
        .filter((snippet) => snippet.id >= 0)
        .map((snippet) => snippet.id);

      if (ids.length === 0) {
        return -1;
      }

      return Math.max(...ids);
    },

    /**
     * Get last ID for the directory
     * @returns Last directory id
     */
    lastDirectoryID(state): number {
      const ids = state.directories.map((folder) => folder.id);

      if (ids.length === 0) {
        return -1;
      }

      return Math.max(...ids);
    },
  },
});

///

// Достать сниппет
// Добавить сниппет
// Удалить сниппет
// Изменить сниппет
// Удалить директорию
// Добавить директорию
// Изменить имя директории
