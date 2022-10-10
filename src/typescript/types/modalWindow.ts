export enum ModalWindowSize {
  'small',
  'medium',
  'large'
}

// Search
export enum SearchType {
  'folder',
  'snippets',
  'commands',
  'all'
}

export enum SearchItemType {
  'folder',
  'snippet',
  'command'
}

export interface SearchItem {
  storeId: number,
  type: SearchItemType,
}