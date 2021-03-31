import CodeMirror from 'codemirror';
import React, { useCallback, useLayoutEffect, useEffect } from 'react';

import { IEditorProps } from '..';
import { EditorTheme } from '../models';
import { useHooksOnMods } from './useHooksOnMods';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/railscasts.css';

export function useEditor(props: IEditorProps) {
  const ref = React.useRef(null);
  const editor = React.useRef<CodeMirror.Editor | null>(null);
  const theme: EditorTheme = 'railscasts'; // Hardcoded for now. But may become dynamic in future.

  const modsHooks = useHooksOnMods(props.mods || []);

  const handleOnEditorChange = useCallback((editor: CodeMirror.Editor) => {
    props.onChange(editor.getValue());
  }, [props.onChange]);

  useLayoutEffect(() => {
    editor.current = CodeMirror(ref.current!, {
      value: props.value,
      mode: 'gfm',
      inputStyle: 'contenteditable',
      theme,
      tabSize: 4,
    });

    editor.current.on('change', handleOnEditorChange);

    // TODO: resources should be released on destruct
    modsHooks.onEditorInit(editor.current);

    editor.current.refresh();
    editor.current.focus();
  }, []);

  useEffect(() => {
    if (editor.current && (editor.current.getValue() !== props.value)) {
      editor.current.setValue(props.value);
    }
  }, [props]);

  return {
    editorRef: ref,
    theme,
  };
}
