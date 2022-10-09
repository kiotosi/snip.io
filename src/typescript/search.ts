import useSnippetsStore from '../store/snippets.store';
const snippetsStore = useSnippetsStore();

/**
 * Search for directories
 * @param input - Input text
 * @returns ID of founded folders in snippets store
 */
export function searchFolder(input: string): number[] {
  const searchedString = input.toLowerCase();
  const resultList: number[] = [];
  snippetsStore.directoriesList.forEach((item, index) => {
    if (item.name.toLowerCase().indexOf(searchedString) !== -1) {
      resultList.push(index);
    }
  });

  return resultList;
}