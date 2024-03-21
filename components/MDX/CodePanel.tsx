import clsx from 'clsx'
import { Children, useEffect, useState } from 'react'

import Tag from '@components/Common/Tag'
import { ClipboardIcon } from '@components/Icons/ClipboardIcon'

const CodePanel = ({ tag, label, code, children }: any) => {
	const child = Children.only(children)

	const codeTag = child.props.tag ?? tag
	const codeLabel = child.props.label ?? label

	const [copyCount, setCopyCount] = useState(0)
	const copied = copyCount > 0

	useEffect(() => {
		if (copyCount > 0) {
			const timeout = setTimeout(() => setCopyCount(0), 1000)
			return () => {
				clearTimeout(timeout)
			}
		}
	}, [copyCount])

	return (
		<div className="dark:bg-white/2.5 group">
			<div className="border-b-white/7.5 bg-white/2.5 dark:bg-white/1 flex h-9 items-center gap-2 border-y border-t-transparent bg-zinc-900 px-4 dark:border-b-white/5">
				{codeTag && (
					<div className="dark flex">
						<Tag variant="small">{codeTag}</Tag>
					</div>
				)}
				{codeTag && codeLabel && (
					<span className="h-0.5 w-0.5 rounded-full bg-zinc-500" />
				)}
				{codeLabel && (
					<span className="font-mono text-xs text-zinc-400">{codeLabel}</span>
				)}
			</div>
			<div className="relative">
				<pre className="overflow-x-auto p-4 text-xs text-white">{children}</pre>
				<button
					type="button"
					className={clsx(
						'group/button absolute right-4 top-3.5 overflow-hidden rounded-full py-1 pl-2 pr-3 text-2xs font-medium opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100',
						copied
							? 'bg-primary-400/10 ring-1 ring-inset ring-primary-400/20'
							: 'hover:bg-white/7.5 dark:bg-white/2.5 bg-white/5 dark:hover:bg-white/5'
					)}
					onClick={() => {
						window.navigator.clipboard.writeText(code).then(() => {
							setCopyCount((count) => count + 1)
						})
					}}
				>
					<span
						aria-hidden={copied}
						className={clsx(
							'pointer-events-none flex items-center gap-0.5 text-zinc-400 transition duration-300',
							copied && '-translate-y-1.5 opacity-0'
						)}
					>
						<ClipboardIcon className="h-5 w-5 fill-zinc-500/20 stroke-zinc-500 transition-colors group-hover/button:stroke-zinc-400" />
						Copy
					</span>
					<span
						aria-hidden={!copied}
						className={clsx(
							'pointer-events-none absolute inset-0 flex items-center justify-center text-primary-400 transition duration-300',
							!copied && 'translate-y-1.5 opacity-0'
						)}
					>
						Copied!
					</span>
				</button>
			</div>
		</div>
	)
}

export default CodePanel
