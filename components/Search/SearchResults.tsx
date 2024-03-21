import NoResultsIcon from '@components/Icons/NoResultIcon'
import SearchResult from '@components/Search/SearchResult'

const SearchResults = ({ autocomplete, query, collection }) => {
	if (collection.items.length === 0) {
		return (
			<div className="p-6 text-center">
				<NoResultsIcon className="mx-auto h-5 w-5 stroke-zinc-900 dark:stroke-zinc-600" />
				<p className="mt-2 text-xs text-zinc-700 dark:text-zinc-400">
					Nothing found for{' '}
					<strong className="break-words font-semibold text-zinc-900 dark:text-white">
						&lsquo;{query}&rsquo;
					</strong>
					. Please try again.
				</p>
			</div>
		)
	}

	return (
		<ul role="list" {...autocomplete.getListProps()}>
			{collection.items.map((result, resultIndex) => (
				<SearchResult
					key={result.objectID}
					result={result}
					resultIndex={resultIndex}
					autocomplete={autocomplete}
					collection={collection}
				/>
			))}
		</ul>
	)
}

export default SearchResults
