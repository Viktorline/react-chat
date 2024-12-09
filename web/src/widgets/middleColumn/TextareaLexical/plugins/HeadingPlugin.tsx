import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createHeadingNode, $isHeadingNode } from '@lexical/rich-text'
import { $createTextNode, $getSelection, $isRangeSelection } from 'lexical'
import { useEffect } from 'react'

export function HeadingPlugin() {
  const [editor] = useLexicalComposerContext()

  useEffect(() => {
    return editor.registerUpdateListener(() => {
      editor.update(() => {
        const selection = $getSelection()
        if ($isRangeSelection(selection)) {
          const nodes = selection.getNodes()
          nodes.forEach(node => {
            if ($isHeadingNode(node)) {
              const tag = node.getTag()
              const level = parseInt(tag.slice(1), 10)
              if (level >= 4) {
                const newHeadingNode = $createHeadingNode('h3')
                newHeadingNode.append($createTextNode(node.getTextContent()))
                node.replace(newHeadingNode)
              }
            }
          })
        }
      })
    })
  }, [editor])

  return null
}
