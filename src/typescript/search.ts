import { SearchItem, SearchItemType } from './types/modalWindow';
import { DirectorySchema, SnippetsSchema } from './types/snippetsStore';
import { WINDOW_COMMANDS } from '../define';

/**
 * Search for directories
 * @param input - Input text
 * @returns ID of founded folders in snippets store
 */
export function searchFolder(directoriesList: DirectorySchema[], input: string): SearchItem[] {
  const searchedString = input.toLowerCase();
  const resultList: SearchItem[] = [];
  directoriesList.forEach((item, id) => {
    if (item.name.toLowerCase().indexOf(searchedString) !== -1) {
      resultList.push({storeId: id, type: SearchItemType.folder});
    }
  });

  return resultList;
}

/**
 * Search snippet by string
 * @param input - Input text
 * @returns ID of founded snippets in snippets store
 */
export function searchSnippet(snippetsList: SnippetsSchema[], input: string): SearchItem[] {
  const searchedString = input.toLocaleLowerCase();
  const resultList: SearchItem[] = [];
  snippetsList.forEach((item, id) => {
    if (item.title.toLowerCase().indexOf(searchedString) !== -1 ||
      item.description.toLowerCase().indexOf(searchedString) !== -1 ||
      item.language.toLowerCase().indexOf(searchedString) !== -1
    ) {
      resultList.push({storeId: id, type: SearchItemType.snippet});
    }
  });

  return resultList;
}

/**
 * Search for command
 * @param input - Input text
 * @returns Command item
 */
export function searchCommand(input: string): SearchItem[] {
  const searchedString = input.toLocaleLowerCase();
  const resultList: SearchItem[] = [];
  WINDOW_COMMANDS.forEach((command, index) => {
    if (command.name.toLowerCase().indexOf(searchedString) !== -1) {
      resultList.push({type: SearchItemType.command, storeId: index});
    }
  });
  return resultList;
}