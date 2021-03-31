import CodeMirror from 'codemirror';

export interface IEditorModification {
  isActive?: boolean;
  onEditorInit?: (editor: CodeMirror.Editor) => void;
}

export type VimMode = 'normal' | 'visual' | 'insert' | 'replace';

export type EditorTheme =  'railscasts' | 'default';
