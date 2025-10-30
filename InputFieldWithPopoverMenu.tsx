import { useAtom } from 'jotai';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { generatorAtom } from './store/atoms';
import { BubbleMenu, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Link from '@tiptap/extension-link';
import { LinkIcon } from './LinkIcon';
import { BoldIcon } from './BoldIcon';
import { ItalicIcon } from './ItalicIcon';
import { SubscriptIcon } from './SubscriptIcon';
import { SuperscriptIcon } from './SuperscriptIcon';
import { BulletsIcon } from './BulletsIcon';

import './InputFieldWithPopoverMenu.css';
import { Node, nodeToMarkdown } from '@/components/home/generator/nodeToMarkdown';
import { InputFieldCharacterCount } from './InputFieldCharacterCount';

export function InputFieldWithPopoverMenu(props: { title: string; atomKey: string; placeholder: string }) {
  const [generatorValues, setGeneratorValues] = useAtom(generatorAtom);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [url, setUrl] = useState('');
  const [hoveredButton, setHoveredButton] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: 'list-disc px-[20px]'
          }
        }
      }),
      Placeholder.configure({
        placeholder: props.placeholder
      }),
      Superscript,
      Subscript,
      Link.extend({
        inclusive: false
      })
    ],
    editorProps: {
      attributes: {
        class: `mb-2.5 mt-2.5 rounded bg-[#fff] py-[14px] px-[20px] text-[15px] min-h-[75px]`
      }
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      const md = nodeToMarkdown(json as unknown as Node);
      setGeneratorValues({ ...generatorValues, [props.atomKey]: md });
    },
    content: props.atomKey ? generatorValues[props.atomKey] : ''
  });

  const openUrlInput = () => {
    const previousLink = editor?.getAttributes('link').href;
    if (previousLink) setUrl(previousLink);
    setShowUrlInput(true);
  };

  const submitUrl = () => {
    if (url) {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    } else {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
    }
    setShowUrlInput(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      submitUrl();
    }
  };

  const editorContent = generatorValues[props.atomKey];

  const clearContent = useCallback(() => {
    editor?.commands.clearContent();
  }, [editor]);

  useEffect(() => {
    //To clear the text content of the editor when the reset button is triggered in the footer
    if (editorContent === '') {
      clearContent();
    }
  }, [editorContent, clearContent]);

  const inputLength = useMemo(() => editorContent?.length ?? 0, [editorContent]);

  return (
    <div className="mt-2.5 flex flex-col">
      <div className="flex flex-row justify-between text-[14px] font-bold">
        <div>
          {props.title}
          <span className="font-normal"> (Optional)</span>
        </div>
        <InputFieldCharacterCount length={inputLength} />
      </div>
      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
          className="flex flex-row rounded-[4px] bg-white shadow-[0_3px_10px_0px_rgba(19,127,194,0.2)]"
        >
          {showUrlInput === false && (
            <div>
              <button
                onClick={openUrlInput}
                className={`py-[5px] pl-[5px] pr-[10px] ${editor.isActive('link') ? 'is-active' : ''}`}
                onMouseEnter={() => setHoveredButton('link')}
                onMouseLeave={() => setHoveredButton('')}
              >
                <LinkIcon
                  color={'black'}
                  background={'white'}
                  width={30}
                  height={30}
                  hover={hoveredButton === 'link'}
                  hoverColor={'#2682ff'}
                  hoverBackground={'#2682ff'}
                />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                onMouseEnter={() => setHoveredButton('bold')}
                onMouseLeave={() => setHoveredButton('')}
                className={`px-[10px] py-[5px] ${editor.isActive('bold') ? 'is-active' : ''} fill-cyan-700`}
              >
                <BoldIcon
                  color={'black'}
                  background={'white'}
                  width={30}
                  height={30}
                  hover={hoveredButton === 'bold'}
                  hoverColor={'#2682ff'}
                  hoverBackground={'#2682ff'}
                />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-[10px] py-[5px] ${editor.isActive('italic') ? 'is-active' : ''}`}
                onMouseEnter={() => setHoveredButton('italic')}
                onMouseLeave={() => setHoveredButton('')}
              >
                <ItalicIcon
                  color={'black'}
                  background={'white'}
                  width={30}
                  height={30}
                  hover={hoveredButton === 'italic'}
                  hoverColor={'#2682ff'}
                  hoverBackground={'#2682ff'}
                />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleSuperscript().run()}
                className={`px-[10px] py-[5px] ${editor.isActive('superscript') ? 'is-active' : ''}`}
                onMouseEnter={() => setHoveredButton('superscript')}
                onMouseLeave={() => setHoveredButton('')}
              >
                <SuperscriptIcon
                  color={'black'}
                  background={'white'}
                  width={30}
                  height={30}
                  hover={hoveredButton === 'superscript'}
                  hoverColor={'#2682ff'}
                  hoverBackground={'#2682ff'}
                />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleSubscript().run()}
                className={`px-[10px] py-[5px] ${editor.isActive('subscript') ? 'is-active' : ''}`}
                onMouseEnter={() => setHoveredButton('subscript')}
                onMouseLeave={() => setHoveredButton('')}
              >
                <SubscriptIcon
                  color={'black'}
                  background={'white'}
                  width={30}
                  height={30}
                  hover={hoveredButton === 'subscript'}
                  hoverColor={'#2682ff'}
                  hoverBackground={'#2682ff'}
                />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`py-[5px] pl-[10px] pr-[5px] ${editor.isActive('bulletList') ? 'is-active' : ''}`}
                onMouseEnter={() => setHoveredButton('bullets')}
                onMouseLeave={() => setHoveredButton('')}
              >
                <BulletsIcon
                  color={'black'}
                  background={'white'}
                  width={30}
                  height={30}
                  hover={hoveredButton === 'bullets'}
                  hoverColor={'#2682ff'}
                  hoverBackground={'#2682ff'}
                />
              </button>
            </div>
          )}
          {showUrlInput === true && (
            <div className="bg-[#fff] px-[20px] py-[20px]">
              <p className="text-[14px]">URL link</p>
              <input
                className="mb-2.5 mt-2.5 w-[276px] rounded border border-[#2682ff] bg-[#fff] py-[8px] pl-[10px] text-[16px] placeholder:not-italic"
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                value={url}
                onBlur={() => submitUrl()}
                autoFocus
                placeholder="Enter URL"
              />
            </div>
          )}
        </BubbleMenu>
      )}
      {editor && <EditorContent editor={editor} />}
    </div>
  );
}