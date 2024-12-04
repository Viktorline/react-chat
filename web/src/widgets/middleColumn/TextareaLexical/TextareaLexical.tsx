import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

const editorConfig = {
  theme: {
    paragraph: {
      margin: 0,
    },
  },
  onError: (error: Error) => {
    console.error(error);
  },
};

const Editor = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) => {
  const [editor] = useLexicalComposerContext();

  const handleChange = () => {
    editor.update(() => {
      const text = editor
        .getEditorState()
        .read(() => editor.getRootElement()?.innerText || '');
      setValue(text);
    });
  };

  return (
    <>
      <RichTextPlugin
        contentEditable={<ContentEditable className='editor-content' />}
        placeholder={<div style={{ color: '#666' }}>Write a message...</div>}
        ErrorBoundary={undefined}
      />
      <HistoryPlugin />
      <div className='editor-content' onInput={handleChange} />
    </>
  );
};

const TextareaLexical = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Editor value={value} setValue={setValue} />
    </LexicalComposer>
  );
};

export default TextareaLexical;
