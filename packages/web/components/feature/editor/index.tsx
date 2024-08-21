import React, { useMemo } from 'react';
import {
	type Editor as IEditor,
	EditorContent,
	ReactNodeViewRenderer,
	BubbleMenu,
	FloatingMenu,
	useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import Text from '@tiptap/extension-text';
import Paragraph from '@tiptap/extension-paragraph';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Document from '@tiptap/extension-document';
import Dropcursor from '@tiptap/extension-dropcursor';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';

import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { all, createLowlight } from 'lowlight';
import classNames from 'classnames';

import { Card } from '@lib/shadcn/components/ui/card';
import CodeBlockComponent from './code-block';
import './styles.scss';

interface IAction {
	key: string | { textAlign: string };
	title: string;
	attributes?:
		| {
				level: number;
		  }
		| {
				color: string;
		  };
	onClick: () => boolean;
	onDisabled: () => boolean;
}

interface IMenuBarProps {
	editor: IEditor | null;
}

const lowlight = createLowlight(all);

lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);

const MenuBar = ({ editor }: IMenuBarProps) => {
	if (!editor) {
		return null;
	}

	const actions = useMemo<Array<IAction>>(() => {
		return [
			{
				key: 'bold',
				title: 'Bold',
				onClick: () => editor.chain().focus().toggleBold().run(),
				onDisabled: () =>
					!editor.can().chain().focus().toggleBold().run(),
			},
			{
				key: 'italic',
				title: 'Italic',
				onClick: () => editor.chain().focus().toggleItalic().run(),
				onDisabled: () =>
					!editor.can().chain().focus().toggleItalic().run(),
			},
			{
				key: 'strike',
				title: 'Strike',
				onClick: () => editor.chain().focus().toggleStrike().run(),
				onDisabled: () =>
					!editor.can().chain().focus().toggleStrike().run(),
			},
			{
				key: 'code',
				title: 'Code',
				onClick: () => editor.chain().focus().toggleCode().run(),
				onDisabled: () =>
					!editor.can().chain().focus().toggleCode().run(),
			},
			{
				key: '.....',
				title: 'Clear marks',
				onClick: () => editor.chain().focus().unsetAllMarks().run(),
				onDisabled: () => false,
			},
			{
				key: '...',
				title: 'Clear node',
				onClick: () => editor.chain().focus().clearNodes().run(),
				onDisabled: () => false,
			},
			{
				key: 'paragraph',
				title: 'Paragraph',
				onClick: () => editor.chain().focus().setParagraph().run(),
				onDisabled: () => false,
			},
			{
				key: { textAlign: 'left' },
				title: 'Left',
				onClick: () =>
					editor.chain().focus().setTextAlign('left').run(),
				onDisabled: () => false,
			},
			{
				key: { textAlign: 'center' },
				title: 'Center',
				onClick: () =>
					editor.chain().focus().setTextAlign('center').run(),
				onDisabled: () => false,
			},
			{
				key: { textAlign: 'right' },
				title: 'Right',
				onClick: () =>
					editor.chain().focus().setTextAlign('right').run(),
				onDisabled: () => false,
			},
			{
				key: { textAlign: 'justify' },
				title: 'Justify',
				onClick: () =>
					editor.chain().focus().setTextAlign('justify').run(),
				onDisabled: () => false,
			},
			{
				key: 'highlight',
				title: 'Highlight',
				onClick: () => editor.chain().focus().toggleHighlight().run(),
				onDisabled: () => false,
			},
			{
				key: 'heading',
				title: 'H1',
				attributes: { level: 1 },
				onClick: () =>
					editor.chain().focus().toggleHeading({ level: 1 }).run(),
				onDisabled: () => false,
			},
			{
				key: 'heading',
				title: 'H2',
				attributes: { level: 2 },
				onClick: () =>
					editor.chain().focus().toggleHeading({ level: 2 }).run(),
				onDisabled: () => false,
			},
			{
				key: 'heading',
				title: 'H3',
				attributes: { level: 3 },
				onClick: () =>
					editor.chain().focus().toggleHeading({ level: 3 }).run(),
				onDisabled: () => false,
			},
			{
				key: 'heading',
				title: 'H4',
				attributes: { level: 4 },
				onClick: () =>
					editor.chain().focus().toggleHeading({ level: 4 }).run(),
				onDisabled: () => false,
			},
			{
				key: 'heading',
				title: 'H5',
				attributes: { level: 5 },
				onClick: () =>
					editor.chain().focus().toggleHeading({ level: 5 }).run(),
				onDisabled: () => false,
			},
			{
				key: 'heading',
				title: 'H6',
				attributes: { level: 6 },
				onClick: () =>
					editor.chain().focus().toggleHeading({ level: 6 }).run(),
				onDisabled: () => false,
			},
			{
				key: 'bulletList',
				title: 'Bullet list',
				onClick: () => editor.chain().focus().toggleBulletList().run(),
				onDisabled: () => false,
			},
			{
				key: 'orderedList',
				title: 'Ordered list',
				onClick: () => editor.chain().focus().toggleOrderedList().run(),
				onDisabled: () => false,
			},
			{
				key: 'codeBlock',
				title: 'Code block',
				onClick: () => editor.chain().focus().toggleCodeBlock().run(),
				onDisabled: () => false,
			},
			{
				key: 'blockquote',
				title: 'Blockquote',
				onClick: () => editor.chain().focus().toggleBlockquote().run(),
				onDisabled: () => false,
			},
			{
				key: '....',
				title: 'Horizontal rule',
				onClick: () => editor.chain().focus().setHorizontalRule().run(),
				onDisabled: () => false,
			},
			{
				key: '....',
				title: 'Hard break',
				onClick: () => editor.chain().focus().setHardBreak().run(),
				onDisabled: () => false,
			},
			{
				key: '......',
				title: 'Undo',
				onClick: () => editor.chain().focus().undo().run(),
				onDisabled: () => !editor.can().chain().focus().undo().run(),
			},
			{
				key: '.....',
				title: 'Redo',
				onClick: () => editor.chain().focus().redo().run(),
				onDisabled: () => !editor.can().chain().focus().redo().run(),
			},
			{
				key: 'textStyle',
				title: 'Purple',
				attributes: {
					color: '#958DF1',
				},
				onClick: () => editor.chain().focus().setColor('#958DF1').run(),
				onDisabled: () => false,
			},
			{
				key: 'codeBlock',
				title: 'Toggle code block',
				onClick: () => editor.chain().focus().toggleCodeBlock().run(),
				onDisabled: () => false,
			},
		];
	}, [editor]);

	return (
		<div className="mb-8">
			<div className="space-x-2 space-y-1">
				{actions.map(
					({ key, title, attributes, onClick, onDisabled }) => {
						return (
							<button
								onClick={() => onClick()}
								disabled={onDisabled()}
								className={classNames({
									'p-2 rounded-lg': true,
									'bg-green-500': editor.isActive(
										key,
										attributes
									),
									'bg-slate-300': !editor.isActive(
										key,
										attributes
									),
								})}
							>
								{title}
							</button>
						);
					}
				)}
				{/*
				<button
					onClick={() =>
						editor.chain().focus().setColor('#958DF1').run()
					}
					className={
						editor.isActive('textStyle', { color: '#958DF1' })
							? 'is-active'
							: ''
					}
				>
					Purple
				</button> */}
			</div>
		</div>
	);
};

export const Editor = () => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bulletList: {
					keepMarks: true,
					keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
				},
				orderedList: {
					keepMarks: true,
					keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
				},
			}),
			Color.configure({ types: [TextStyle.name, ListItem.name] }),
			TextStyle.configure({ types: [ListItem.name] }),
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
			Highlight,
			Document,
			Paragraph,
			Text,
			CodeBlockLowlight.extend({
				addNodeView() {
					return ReactNodeViewRenderer(CodeBlockComponent);
				},
			}).configure({ lowlight }),
			Image,
			Dropcursor
		],
		content: `
      <p>This is a basic example of implementing images. Drag to re-order.</p>
      <img src="https://placehold.co/600x400" />
      <img src="https://placehold.co/800x400" />
    `,
	});

	return (
		<Card className="p-4">
			{/* <BubbleMenu
				className="bubble-menu"
				tippyOptions={{ duration: 100 }}
				editor={editor}
			>
				<MenuBar editor={editor} />
			</BubbleMenu>
			<FloatingMenu
				className="floating-menu"
				tippyOptions={{ duration: 100 }}
				editor={editor}
			>
				<MenuBar editor={editor} />
			</FloatingMenu> */}
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</Card>
	);
};
