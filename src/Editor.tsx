import React from 'react';

import { useEditor, IEditorProps } from './hooks/useEditor';
import { getStyles } from './themes/_getStyles';
import { Container } from './StyledContainer';

import 'codemirror/mode/gfm/gfm';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/jsx/jsx';
import 'codemirror/mode/shell/shell';
import 'codemirror/keymap/vim';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/railscasts.css';

export const Editor = (props: IEditorProps) => {
  const {
    editorRef,
    theme,
  } = useEditor(props);

  return (
    <Container
      ref={editorRef}
      className={props.className}
      theme={getStyles(theme)}
    />
  );
};
