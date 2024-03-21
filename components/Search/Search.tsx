import { useEffect, useState } from 'react'

import SearchDialog from '@components/Search/SearchDialog'
import { useSearchProps } from '@hooks/search'

import SearchIcon from '../Icons/SearchIcon'

const Search = () => {
	const [modifierKey, setModifierKey] = useState()
	const { buttonProps, dialogProps } = useSearchProps()

	useEffect(() => {
		setModifierKey(
			/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
				? '⌘ '
				: ('Ctrl ' as any)
		)
	}, [])

	return (
		<div className="hidden lg:block lg:max-w-md lg:flex-auto">
			<button
				type="button"
				className="hidden h-8 w-full items-center gap-2 rounded-full bg-white pl-2 pr-3 text-sm text-zinc-500 ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 dark:bg-white/5 dark:text-zinc-400 dark:ring-inset dark:ring-white/10 dark:hover:ring-white/20 lg:flex focus:[&:not(:focus-visible)]:outline-none"
				{...buttonProps}
			>
				<SearchIcon className="h-5 w-5 stroke-current" />
				Find something...
				<kbd className="ml-auto text-2xs text-zinc-400 dark:text-zinc-500">
					<kbd className="font-sans">{modifierKey}</kbd>
					<kbd className="font-sans">K</kbd>
				</kbd>
			</button>
			<SearchDialog className="hidden lg:block" {...dialogProps} />
		</div>
	)
}

export default Search
