import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Children, createContext, useContext, useEffect, useState } from 'react'

import Tag from '@components/Tag'
import { useTabGroupProps } from '@hooks/code'

import { ClipboardIcon } from './icons/ClipboardIcon'

const languageNames = {
	js: 'JavaScript',
	ts: 'TypeScript',
	javascript: 'JavaScript',
	typescript: 'TypeScript',
	php: 'PHP',
	python: 'Python',
	ruby: 'Ruby',
	go: 'Go',
}

const getPanelTitle = ({ title, language }) => {
	return title ?? languageNames[language] ?? 'Code'
}

const CodePanelHeader = ({ tag, label }) => {
	if (!tag && !label) {
		return null
	}

	return (
		<div className="border-b-white/7.5 bg-white/2.5 dark:bg-white/1 flex h-9 items-center gap-2 border-y border-t-transparent bg-zinc-900 px-4 dark:border-b-white/5">
			{tag && (
				<div className="dark flex">
					<Tag variant="small">{tag}</Tag>
				</div>
			)}
			{tag && label && (
				<span className="h-0.5 w-0.5 rounded-full bg-zinc-500" />
			)}
			{label && (
				<span className="font-mono text-xs text-zinc-400">{label}</span>
			)}
		</div>
	)
}

const CodePanel = ({ tag, label, code, children }: any) => {
	const child = Children.only(children)

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
			<CodePanelHeader
				tag={child.props.tag ?? tag}
				label={child.props.label ?? label}
			/>
			<div className="relative">
				<pre className="overflow-x-auto p-4 text-xs text-white">{children}</pre>
				<button
					type="button"
					className={clsx(
						'group/button text-2xs absolute right-4 top-3.5 overflow-hidden rounded-full py-1 pl-2 pr-3 font-medium opacity-0 backdrop-blur transition focus:opacity-100 group-hover:opacity-100',
						copied
							? 'bg-emerald-400/10 ring-1 ring-inset ring-emerald-400/20'
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
							'pointer-events-none absolute inset-0 flex items-center justify-center text-emerald-400 transition duration-300',
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

const CodeGroupHeader = ({ title, children, selectedIndex }: any) => {
	const hasTabs = Children.count(children) > 1

	if (!title && !hasTabs) {
		return null
	}

	return (
		<div className="flex min-h-[calc(theme(spacing.12)+1px)] flex-wrap items-start gap-x-4 border-b border-zinc-700 bg-zinc-800 px-4 dark:border-zinc-800 dark:bg-transparent">
			{title && (
				<h3 className="mr-auto pt-3 text-xs font-semibold text-white">
					{title}
				</h3>
			)}
			{hasTabs && (
				<Tab.List className="-mb-px flex gap-4 text-xs font-medium">
					{Children.map(children, (child, childIndex) => (
						<Tab
							className={clsx(
								'border-b py-3 transition focus:[&:not(:focus-visible)]:outline-none',
								childIndex === selectedIndex
									? 'border-emerald-500 text-emerald-400'
									: 'border-transparent text-zinc-400 hover:text-zinc-300'
							)}
						>
							{getPanelTitle(child.props)}
						</Tab>
					))}
				</Tab.List>
			)}
		</div>
	)
}

const CodeGroupPanels = ({ children, ...props }) => {
	const hasTabs = Children.count(children) > 1

	if (hasTabs) {
		return (
			<Tab.Panels>
				{Children.map(children, (child) => (
					<Tab.Panel>
						<CodePanel {...props}>{child}</CodePanel>
					</Tab.Panel>
				))}
			</Tab.Panels>
		)
	}

	return <CodePanel {...props}>{children}</CodePanel>
}

const CodeGroupContext = createContext(false)

export const CodeGroup = ({ children, title, ...props }: any) => {
	const languages = Children.map(children, (child) =>
		getPanelTitle(child.props)
	)
	const tabGroupProps = useTabGroupProps(languages)
	const hasTabs = Children.count(children) > 1
	const Container: any = hasTabs ? Tab.Group : 'div'
	const containerProps = hasTabs ? tabGroupProps : {}
	const headerProps = hasTabs
		? { selectedIndex: tabGroupProps.selectedIndex }
		: {}

	return (
		<CodeGroupContext.Provider value={true}>
			<Container
				{...containerProps}
				className="not-prose my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10"
			>
				<CodeGroupHeader title={title} {...headerProps}>
					{children}
				</CodeGroupHeader>
				<CodeGroupPanels {...props}>{children}</CodeGroupPanels>
			</Container>
		</CodeGroupContext.Provider>
	)
}

export const Code = ({ children, ...props }) => {
	const isGrouped = useContext(CodeGroupContext)

	if (isGrouped) {
		return <code {...props} dangerouslySetInnerHTML={{ __html: children }} />
	}

	return <code {...props}>{children}</code>
}

export const Pre = ({ children, ...props }) => {
	const isGrouped = useContext(CodeGroupContext)

	if (isGrouped) {
		return children
	}

	return <CodeGroup {...props}>{children}</CodeGroup>
}
