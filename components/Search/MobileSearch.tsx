import SearchIcon from '@components/icons/SearchIcon'
import { useSearchProps } from '@hooks/search'

import SearchDialog from './SearchDialog'

const MobileSearch = () => {
	const { buttonProps, dialogProps } = useSearchProps()

	return (
		<div className="contents lg:hidden">
			<button
				type="button"
				className="flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-zinc-900/5 dark:hover:bg-white/5 lg:hidden focus:[&:not(:focus-visible)]:outline-none"
				aria-label="Find something..."
				{...buttonProps}
			>
				<SearchIcon className="h-5 w-5 stroke-zinc-900 dark:stroke-white" />
			</button>
			<SearchDialog className="lg:hidden" {...dialogProps} />
		</div>
	)
}

export default MobileSearch
