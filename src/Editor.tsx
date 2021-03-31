import React from 'react';

import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/keymap/vim';

import { useEditor } from './hooks/useEditor';
import { IEditorModification } from './models';
import { getStyles } from './themes/_getStyles';
import { Container } from './StyledContainer';

export interface IEditorProps {
  value: string;
  mods?: Array<IEditorModification>;
  onChange: (value: string) => void;
}

export const Editor = (props: IEditorProps) => {
  const {
    editorRef,
    theme,
  } = useEditor(props);

  return (
    <Container
      ref={editorRef}
      theme={getStyles(theme)}
    />
  );
};
