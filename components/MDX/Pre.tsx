import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import { Children, createContext, useContext } from 'react'

import CodePanel from '@components/MDX/CodePanel'
import { useTabGroupProps } from '@hooks/code'
import { getPanelTitle } from '@libs/code'

export const CodeGroupContext = createContext(false)

const Pre = ({ children, title, ...props }: any) => {
	const isGrouped = useContext(CodeGroupContext)

	if (isGrouped) {
		return children
	}

	const languages = Children.map(children, (child) =>
		getPanelTitle(child.props)
	)
	const tabGroupProps = useTabGroupProps(languages)
	const hasTabs = Children.count(children) > 1
	const Container: any = hasTabs ? Tab.Group : 'div'
	const containerProps = hasTabs ? tabGroupProps : {}

	return (
		<CodeGroupContext.Provider value={true}>
			<Container
				{...containerProps}
				className="not-prose my-6 overflow-hidden rounded-2xl bg-zinc-900 shadow-md dark:ring-1 dark:ring-white/10"
			>
				{!title && !hasTabs && (
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
											childIndex === tabGroupProps.selectedIndex
												? 'border-primary-500 text-primary-400'
												: 'border-transparent text-zinc-400 hover:text-zinc-300'
										)}
									>
										{getPanelTitle(child.props)}
									</Tab>
								))}
							</Tab.List>
						)}
					</div>
				)}
				{hasTabs ? (
					<Tab.Panels>
						{Children.map(children, (child) => (
							<Tab.Panel>
								<CodePanel {...props}>{child}</CodePanel>
							</Tab.Panel>
						))}
					</Tab.Panels>
				) : (
					<CodePanel {...props}>{children}</CodePanel>
				)}
			</Container>
		</CodeGroupContext.Provider>
	)
}

export default Pre
