/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Heading, { Level } from '@tiptap/extension-heading';
import { mergeAttributes } from '@tiptap/core';

import classNames from 'classnames';
import * as Icons from '../icons';
import { useEffect, useState } from 'react';

const Tiptap = () => {
  const editor = useEditor({
    editorProps: {
      handleKeyDown: (_view, event) => {
        if (event.key === 'Enter') {
          // editor.commands.unsetAllMarks() doesn't work as expected
          // below is an alternative
          editor.isActive('bold') && editor.commands.unsetBold();
          editor.isActive('italic') && editor.commands.unsetItalic();
          editor.isActive('underline') && editor.commands.unsetUnderline();
          editor.isActive('strike') && editor.commands.unsetStrike();
          editor.isActive('code') && editor.commands.unsetCode();
        }
      },
      attributes: {
        class:
          'prose-sm p-20 focus:outline-none h-full max-h-full overflow-y-auto',
      },
    },
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        code: {
          HTMLAttributes: {
            class:
              'not-prose font-mono text-[85%] text-[#eb5757] bg-[#87837826] rounded-sm py-2 px-2',
          },
        },
      }),
      Underline,
      Link,
      // Heading configuration for styling different Heading levels with Tailwindcss
      Heading.extend({
        levels: [1, 2, 3],
        renderHTML({ node, HTMLAttributes }) {
          const level = this.options.levels.includes(node.attrs.level)
            ? node.attrs.level
            : this.options.levels[0];
          const classes: { [index: number]: string } = {
            1: 'text-3xl',
            2: 'text-2xl',
            3: 'text-xl',
          };
          return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
              class: `${classes[level]}`,
            }),
            0,
          ];
        },
      }).configure({ levels: [1, 2, 3] }),
    ],
    content: '<h1>heading1</h1><h2>heading2</h2><h3>heading3</h3><p>text</p>',
  }) as Editor;

  const [menuDropdownText, setMenuDropdownText] = useState('Normal Text');

  const updateMenuDropdownText = (tagName: string) => {
    switch (tagName) {
      case 'H1':
        setMenuDropdownText('Heading 1');
        break;
      case 'H2':
        setMenuDropdownText('Heading 2');
        break;
      case 'H3':
        setMenuDropdownText('Heading 3');
        break;
      default:
        setMenuDropdownText('Normal Text');
        break;
    }
  };

  const getValidAncestorTagName = (target: HTMLElement) => {
    const validTags = ['P', 'H1', 'H2', 'H3'];

    if (!validTags.includes(target.tagName)) {
      return validTags.find((tag) => target.closest(tag.toLowerCase()));
    }

    return target.tagName;
  };

  const handleSetParagraph = () => {
    editor.chain().focus().setParagraph().run();
    updateMenuDropdownText('P');
  };

  const handleToggleHeading = (level: Level) => {
    editor.chain().focus().toggleHeading({ level }).run();
    updateMenuDropdownText(`H${level}`);
  };

  useEffect(() => {
    const handleMouseDown = (e: Event) => {
      const target = e.target;

      // if there is a vaid target and the clicked target is not a br (breakline)
      if (target && !((target as HTMLElement).tagName === 'BR')) {
        updateMenuDropdownText(
          getValidAncestorTagName(e.target as HTMLElement) as string
        );
      }
    };
    const handleMouseUp = (e: Event) => {
      console.log(e);
    };

    const editor = document.querySelector('.tiptap');

    editor?.addEventListener('mousedown', handleMouseDown);
    editor?.addEventListener('mouseup', handleMouseUp);

    return () => {
      editor?.removeEventListener('mousedown', handleMouseDown);
      editor?.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div className='flex items-center gap-1 px-5 shadow-sm'>
        <div
          className='tooltip tooltip-bottom'
          data-tip='Undo'
        >
          <button
            className='btn btn-ghost py-4 px-2'
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo()}
          >
            <Icons.Undo size={16} />
          </button>
        </div>
        <div
          className='tooltip tooltip-bottom'
          data-tip='Redo'
        >
          <button
            className='btn btn-ghost py-4 px-2'
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo()}
          >
            <Icons.Redo size={16} />
          </button>
        </div>
        <div className='dropdown'>
          <div
            tabIndex={0}
            role='button'
            className='btn btn-ghost font-normal'
          >
            {menuDropdownText}
            <span>
              <Icons.ArrowDropDown size={24} />
            </span>
          </div>
          <ul
            tabIndex={0}
            className='dropdown-content menu bg-base-100 rounded-box z-[1] w-52 shadow flex flex-col gap-2'
          >
            <li>
              <a
                onClick={handleSetParagraph}
                className={classNames('p-3', {
                  'bg-base-200': editor.isActive('paragraph'),
                })}
              >
                Normal Text
              </a>
            </li>
            <li>
              <button
                onClick={() => handleToggleHeading(1)}
                className={classNames('p-3', {
                  'bg-base-200': editor.isActive('heading', { level: 1 }),
                })}
              >
                Heading 1
              </button>
            </li>
            <li>
              <button
                onClick={() => handleToggleHeading(2)}
                className={classNames('p-3', {
                  'bg-base-200': editor.isActive('heading', { level: 2 }),
                })}
              >
                Heading 2
              </button>
            </li>
            <li>
              <button
                onClick={() => handleToggleHeading(3)}
                className={classNames('p-3', {
                  'bg-base-200': editor.isActive('heading', { level: 3 }),
                })}
              >
                Heading 3
              </button>
            </li>
          </ul>
        </div>
        <div
          className='tooltip tooltip-bottom'
          data-tip='Bold'
        >
          <button
            className={classNames('btn btn-ghost py-4 px-2', {
              'bg-base-200': editor.isActive('bold'),
            })}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Icons.Bold size={16} />
          </button>
        </div>
        <div
          className='tooltip tooltip-bottom'
          data-tip='Italic'
        >
          <button
            className={classNames('btn btn-ghost py-4 px-2', {
              'bg-base-200': editor.isActive('italic'),
            })}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Icons.Italic size={16} />{' '}
          </button>
        </div>
        <div
          className='tooltip tooltip-bottom'
          data-tip='Underline'
        >
          <button
            className={classNames('btn btn-ghost py-4 px-2', {
              'bg-base-200': editor.isActive('underline'),
            })}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <Icons.Underline size={16} />
          </button>
        </div>
        <div
          className='tooltip tooltip-bottom'
          data-tip='Strikethrough'
        >
          <button
            className={classNames('btn btn-ghost py-4 px-2', {
              'bg-base-200': editor.isActive('strike'),
            })}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Icons.Strikethrough size={16} />
          </button>
        </div>
        <div
          className='tooltip tooltip-bottom'
          data-tip='Mark as code'
        >
          <button
            className={classNames('btn btn-ghost py-4 px-2', {
              'bg-base-200': editor.isActive('code'),
            })}
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <Icons.Code size={16} />
          </button>
        </div>
        <div
          className='tooltip tooltip-bottom ml-auto'
          data-tip='More Actions'
        >
          {/* <button className='btn btn-ghost'>
            <Icons.MoreActions size={24} />
          </button> */}
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost m-1'
            >
              <Icons.MoreActions size={24} />
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 mt-2 shadow-md'
            >
              <li>
                <a>Pin note</a>
              </li>
              <li>
                <a>Archive note</a>
              </li>
              <li>
                <a className='text-error'>Move to trash</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <EditorContent
        spellCheck='false'
        editor={editor}
      />
    </>
  );
};

export default Tiptap;
