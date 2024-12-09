import { $createCodeNode, $isCodeNode } from '@lexical/code'
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND
} from '@lexical/list'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode
} from '@lexical/rich-text'
import { $setBlocksType } from '@lexical/selection'
import {
  $createParagraphNode,
  $isRangeSelection,
  ElementNode,
  FORMAT_TEXT_COMMAND,
  LexicalNode,
  RangeSelection
} from 'lexical'
import { $getSelection } from 'lexical'
import { useCallback, useContext, useEffect } from 'react'

import { Context } from '@/store'

const keyMappings: Record<string, string> = {
  Heading1: '1',
  Heading2: '2',
  Heading3: '3',
  Quote: '4',
  Code: '5',
  FormatCode: '6',
  NumberedList: '7',
  BulletList: '8',
  Strikethrough: '9'
}

const keyMappingsMac: Record<string, string> = {
  Heading1: '¡',
  Heading2: '™',
  Heading3: '£',
  Quote: '¢',
  Code: '∞',
  FormatCode: '§',
  NumberedList: '¶',
  BulletList: '•',
  Strikethrough: 'ª'
}

type Commands =
  | typeof INSERT_ORDERED_LIST_COMMAND
  | typeof INSERT_UNORDERED_LIST_COMMAND
  | typeof REMOVE_LIST_COMMAND
  | typeof FORMAT_TEXT_COMMAND

export function CustomShortcutPlugin() {
  const [editor] = useLexicalComposerContext()
  const {
    appStore: { userOs }
  } = useContext(Context)

  const executeCommand = useCallback(
    (command: any, value: unknown) => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const anchorNode = selection.anchor.getNode()
          const focusNode = selection.focus.getNode()
          const isCurrentNodeHeading = [
            anchorNode.getParent(),
            focusNode.getParent()
          ].some(node => {
            if ($isHeadingNode(node)) {
              const level = parseInt(node.getTag().slice(1), 10)
              return level >= 1 && level <= 3
            }
            return false
          })

          if (!isCurrentNodeHeading) {
            editor.dispatchCommand(command, value)
          }
        }
      })
    },
    [editor]
  )

  const formatBlock = useCallback(
    (
      condition: (selection: RangeSelection) => boolean,
      createNode?: () => ElementNode,
      removeCommand?: Commands,
      insertCommand?: Commands
    ) => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          if (condition(selection)) {
            removeCommand
              ? editor.dispatchCommand(removeCommand, undefined)
              : $setBlocksType(selection, () => $createParagraphNode())
          } else {
            insertCommand
              ? editor.dispatchCommand(insertCommand, undefined)
              : createNode && $setBlocksType(selection, createNode)
          }
        }
      })
    },
    [editor]
  )

  const checkForNodeType = (
    selection: RangeSelection,
    nodeTypeCheck: (node: LexicalNode, type?: string) => boolean,
    nodeType?: string,
    listType?: string
  ) => {
    const anchorNode = selection.anchor.getNode()
    const focusNode = selection.focus.getNode()
    const anchorParent = anchorNode.getTopLevelElementOrThrow()
    const focusParent = focusNode.getTopLevelElementOrThrow()

    if (listType) {
      return (
        $isListNode(anchorParent) &&
        anchorParent.getListType() === listType &&
        $isListNode(focusParent) &&
        focusParent.getListType() === listType
      )
    } else {
      return (
        nodeTypeCheck(anchorNode, nodeType) ||
        (anchorParent && nodeTypeCheck(anchorParent, nodeType)) ||
        nodeTypeCheck(focusNode, nodeType) ||
        (focusParent && nodeTypeCheck(focusParent, nodeType))
      )
    }
  }

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      const isMac = userOs === 'Mac'
      const isCorrectModifierPressed = isMac
        ? event.metaKey && event.altKey
        : event.ctrlKey && event.altKey

      if (!isCorrectModifierPressed) return

      const validKeys = isMac
        ? Object.values(keyMappingsMac).concat(Object.values(keyMappings))
        : Object.values(keyMappings)

      if (validKeys.includes(event.key)) {
        event.preventDefault()
        let keyAction =
          Object.keys(keyMappings).find(
            key => keyMappings[key] === event.key
          ) ||
          Object.keys(keyMappingsMac).find(
            key => keyMappingsMac[key] === event.key
          )

        switch (keyAction) {
          case 'Heading1':
            formatBlock(
              sel => checkForNodeType(sel, $isHeadingNode, 'h1'),
              () => $createHeadingNode('h1')
            )
            event.preventDefault()
            break
          case 'Heading2':
            formatBlock(
              sel => checkForNodeType(sel, $isHeadingNode, 'h2'),
              () => $createHeadingNode('h2')
            )
            event.preventDefault()
            break
          case 'Heading3':
            formatBlock(
              sel => checkForNodeType(sel, $isHeadingNode, 'h3'),
              () => $createHeadingNode('h3')
            )
            event.preventDefault()
            break
          case 'Quote':
            formatBlock(
              sel => checkForNodeType(sel, $isQuoteNode),
              $createQuoteNode
            )
            event.preventDefault()
            break
          case 'Code':
            formatBlock(
              sel => checkForNodeType(sel, $isCodeNode),
              $createCodeNode
            )
            event.preventDefault()
            break
          case 'FormatCode':
            executeCommand(FORMAT_TEXT_COMMAND, 'code')
            event.preventDefault()
            break
          case 'NumberedList':
            formatBlock(
              sel => checkForNodeType(sel, $isListNode, undefined, 'number'),
              undefined,
              REMOVE_LIST_COMMAND,
              INSERT_ORDERED_LIST_COMMAND
            )
            event.preventDefault()
            break
          case 'BulletList':
            formatBlock(
              sel => checkForNodeType(sel, $isListNode, undefined, 'bullet'),
              undefined,
              REMOVE_LIST_COMMAND,
              INSERT_UNORDERED_LIST_COMMAND
            )
            event.preventDefault()
            break
          case 'Strikethrough':
            executeCommand(FORMAT_TEXT_COMMAND, 'strikethrough')
            event.preventDefault()
            break
        }
      }
    }

    document.addEventListener('keydown', keyDownHandler)

    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [formatBlock, executeCommand, userOs])

  return null
}
