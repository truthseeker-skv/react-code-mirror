import React, { useCallback, useLayoutEffect, useEffect } from 'react';
import CodeMirror from 'codemirror';

import { EditorTheme, IEditorModification, EditorModes } from '../models';
import { useHooksOnMods } from './useHooksOnMods';

export interface IEditorProps {
  value: string;
  mods?: Array<IEditorModification>;
  mode?: EditorModes;
  className?: string;
  isReadOnly?: boolean;
  onChange?: (value: string) => void;
}

export function useEditor(props: IEditorProps) {
  const ref = React.useRef(null);
  const editor = React.useRef<CodeMirror.Editor | null>(null);
  const theme: EditorTheme = 'railscasts'; // Hardcoded for now. But may become dynamic in future.
  const mode = getEditorMode(props.mode);

  const modsHooks = useHooksOnMods(props.mods || []);

  const handleOnEditorChange = useCallback((editor: CodeMirror.Editor) => {
    if (props.onChange) {
      props.onChange(editor.getValue());
    }
  }, [props.onChange]);

  useLayoutEffect(() => {
    editor.current = CodeMirror(ref.current!, {
      value: props.value,
      mode,
      inputStyle: 'contenteditable',
      theme,
      tabSize: 4,
      readOnly: props.isReadOnly && 'nocursor',
    });

    editor.current.on('change', handleOnEditorChange);

    // TODO: resources should be released on destruct
    modsHooks.onEditorInit(editor.current);

    editor.current.refresh();
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

function getEditorMode(mode?: EditorModes): string {
  switch (mode) {
    case 'shell':
      return 'text/x-sh';
    case 'tsx':
      return 'text/typescript-jsx'
    default:
      return 'gfm';
  }
}
