import styled, { css } from 'styled-components';

import { blinkingCursorAnimation } from './animations/blinkingCursor';
import { ThemeType } from './themes/default';

interface IContainerProps {
  theme: ThemeType;
}

export const Container = styled.div<IContainerProps>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  
  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }

  & .CodeMirror-lines {
    padding: 0;

    & .CodeMirror-line {
      padding-left: 8px;
    }
  }
  
  .CodeMirror-code {
    & .CodeMirror-gutter-wrapper {
      top: 0;
    }
    
    & > div:first-child {
      padding-top: 4px;

      & .CodeMirror-linenumber {
        padding-top: 4px;
      }
    }

    & > div:last-child {
      padding-bottom: 4px;

      & .CodeMirror-linenumber {
        padding-bottom: 4px;
      }
    }

    & .CodeMirror-linenumber {
      padding-right: 6px;
      background-color: #242424;
    }
  }

  .CodeMirror-line::selection,
  .CodeMirror-line > span::selection,
  .CodeMirror-line > span > span::selection {
    ${({ theme }) => css`
      background-color: ${theme.lineSelection.bgColor};
      color: ${theme.lineSelection.color};
    `}
  }

  & > div.CodeMirror {
    position: relative;
    height: 440px;
    font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
    font-size: 16px;

    &-focused .activeline {
      position: relative;

      ${({ theme }) => css`
        background-color: ${theme.activeLine.bgColor};
      `}
      & .CodeMirror-linenumber {
        ${({ theme }) => css`
          background-color: ${theme.activeLineNumber.bgColor};
          color: ${theme.activeLineNumber.color} !important;
        `}
      }
    }

    & .fake-caret::before {
      position: absolute;
      content: '';
      left: 4px;
      top: 1px;
      height: calc(100% - 3px);
      width: 4px;
    }

    & .cm-fat-cursor-mark,
    & .cm-animate-fat-cursor,
    & .fake-caret::before {
      animation: none;
      background-color: transparent;
    }

    &-focused .cm-fat-cursor-mark,
    &-focused .cm-animate-fat-cursor,
    &-focused .fake-caret::before {
      animation: ${({ theme }) => css`
        ${blinkingCursorAnimation(theme.blinkingCursorAnimation)} 1.06s steps(1) infinite;
      `};
    }


    & .CodeMirror-dialog-bottom {
      position: relative;
      display: none;
      z-index: 3;

      & input {
        width: calc(100% - 16px);
        outline: none;
        ${({ theme }) => css`
          background-color: ${theme.bottomDialogInput.bgColor};
          color: ${theme.bottomDialogInput.color};
        `}
      }
    }

    & .anki-card-side-title {
      background-color: #353535;

      &, .cm-link {
        color: #826464;
        font-size: 14px;
      }
    }
  }

  //& .cm-header-1 {
  //  font-size: 22px !important;
  //}
  //
  //& .cm-header-2 {
  //  font-size: 20px !important;
  //}
  //
  //& .cm-header-3 {
  //  font-size: 18px !important;
  //}
  //
  //& .cm-tag {
  //  color: #52a4fb !important;
  //}
`;
