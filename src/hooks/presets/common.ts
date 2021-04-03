import { useExitShortcut } from '../mods/useExitShortcut';
import { useVimCursor } from '../mods/useVimCursor';
import { useHighlightCurrentLine } from '../mods/useHighlightCurrentLine';
import { useLineNumbers } from '../mods/useLineNumbers';
import { useVimMode } from '../mods/useVimMode';

interface IUseCommonModsPresetParams {
  isVimMode: boolean;
  onEditorExit: () => void;
}

export function useCommonModsPreset({
  isVimMode,
  onEditorExit,
}: IUseCommonModsPresetParams) {
  return [
    useHighlightCurrentLine(),
    useExitShortcut({
      onExit: onEditorExit,
    }),
    useVimMode({
      isActive: isVimMode,
    }),
    useVimCursor({
      isActive: isVimMode,
    }),
    useLineNumbers({
      isRelativeLines: isVimMode,
    }),
  ];
}

