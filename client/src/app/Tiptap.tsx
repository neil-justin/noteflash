/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Heading, { Level } from '@tiptap/extension-heading';
import { JSONContent, mergeAttributes, generateHTML } from '@tiptap/core';
import classNames from 'classnames';
import * as Icons from '../icons';
import { useEffect, useState } from 'react';
import { QueryObserverResult, useMutation } from '@tanstack/react-query';
import noteService from '../services/note';
import { NoteDoc, NoteTitleDoc } from '../../../shared-types';

interface TiptapProps {
  refetchTitles: () => Promise<QueryObserverResult<NoteTitleDoc[], Error>>;
  updateNoteId: React.Dispatch<React.SetStateAction<string | undefined | null>>;
  activeNote: NoteDoc;
}

const Tiptap = ({ refetchTitles, updateNoteId, activeNote }: TiptapProps) => {
  const [showMenu, setShowMenu] = useState(true);
  const mutation = useMutation({ mutationFn: noteService.updateNote });
  const editor = useEditor({
    onUpdate({ editor }) {
      if (editor.isFocused) {
        const [noteTitleJSON, ...noteContentJSON] = editor.getJSON()
          .content as JSONContent[];
        const noteTitle = generateHTML(noteTitleJSON, [StarterKit]);
        const noteContent = generateHTML(
          { type: 'doc', content: noteContentJSON },
          [StarterKit, Underline, Link]
        );
        const prevNoteContent = activeNote.content
          ? generateHTML(activeNote.content, [StarterKit, Underline, Link])
          : '';
        const isTitleChanged = activeNote.title !== noteTitle;
        const isContentChanged = prevNoteContent !== noteContent;
        if (isTitleChanged || isContentChanged) {
          mutation.mutate({
            id: activeNote.id,
            ...(isTitleChanged && { title: noteTitle }),
            ...(isContentChanged && { content: noteContent }),
          });
          if (isTitleChanged) refetchTitles();
        }
      }
    },
    editorProps: {
      handleKeyDown: (_view, event) => {
        const editorElem = document.querySelector('.tiptap');

        // Toggles show menu when user presses "Enter" key at the end of note title
        // and "Backspace" key at the start of node below note title
        if (event.target === editorElem) {
          setShowMenu(!showMenu);
        }

        // this would remove all marks when user presses Enter at the end of a line
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
  }) as Editor;

  useEffect(() => {
    editor.commands.clearContent();

    if (editor.isEmpty) {
      editor.commands.insertContent(`<h1>${activeNote.title}</h1>`);

      if (activeNote.content) {
        // insert content
        editor.commands.insertContent(activeNote.content);
      }
    }

    const editorElem = document.querySelector('.tiptap');

    const handleMouseDown = (e: Event) => {
      const target = e.target;

      // if there is a vaid target in editor and the clicked target is not a br (breakline)
      if (target) {
        // if target element is the title
        if (editorElem?.firstElementChild === target) {
          // hide menu
          setShowMenu(false);
        } else {
          setShowMenu(true);
        }

        if (!((target as HTMLElement).tagName === 'BR')) {
          updateMenuDropdownText(
            getValidAncestorTagName(e.target as HTMLElement) as string
          );
        }
      }
    };

    editorElem?.addEventListener('mousedown', handleMouseDown);

    return () => {
      editorElem?.removeEventListener('mousedown', handleMouseDown);
    };
  }, [activeNote]);

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

  const handleTogglePinClick = () => {
    mutation.mutate(
      {
        id: activeNote.id,
        pinned: !activeNote.pinned,
      },
      { onSuccess: () => refetchTitles() }
    );
  };

  const handleArchiveClick = () => {
    mutation.mutate(
      {
        id: activeNote.id,
        archived: true,
        // if user archive, we also need to unpin note
        pinned: false,
      },
      {
        onSuccess: () => {
          updateNoteId(null);
          refetchTitles();
        },
      }
    );
  };

  const handleTrashNoteClick = () => {
    mutation.mutate(
      {
        id: activeNote.id,
        trashedAt: new Date(),
        // setting trashedAt field will schedule note for deletion and,
        // move note to trash folder
        // unpinning note is also needed
        pinned: false,
      },
      {
        onSuccess: () => {
          updateNoteId(null);
          refetchTitles();
        },
      }
    );
  };

  const handleSetParagraph = () => {
    editor.chain().focus().setParagraph().run();
    updateMenuDropdownText('P');
  };

  const handleToggleHeading = (level: Level) => {
    editor.chain().focus().toggleHeading({ level }).run();
    updateMenuDropdownText(`H${level}`);
  };

  return (
    <>
      <div
        className={classNames('flex items-center gap-1 px-5 shadow-sm', {
          visible: showMenu,
          invisible: !showMenu,
        })}
      >
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
                <button onClick={handleTogglePinClick}>
                  {activeNote.pinned ? 'Unpin' : 'Pin'} note
                </button>
              </li>
              <li>
                <button onClick={handleArchiveClick}>Archive note</button>
              </li>
              <li>
                <button
                  className='text-error'
                  onClick={handleTrashNoteClick}
                >
                  Move to trash
                </button>
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
