import { DirectorySchema, SnippetsSchema } from './types/snippetsStore';
export function createSnippetMock(id: number): SnippetsSchema {
  return {
    title: 'New Snippet',
    id,
    code: '',
    description: '',
    language: 'markup',
  };
}

export function createDirectoryMock(id: number): DirectorySchema {
  return {
    id,
    name: 'New directory',
    snippets_list: [],
  };
}
