import clsx from 'clsx'
import { Fragment, useId } from 'react'

const SearchResult = ({ result, resultIndex, autocomplete, collection }) => {
	const id = useId()

	const allLevels = Object.keys(result.hierarchy)
	const hierarchy = Object.entries(result._highlightResult.hierarchy).filter(
		(e: any) => Boolean(e[1].value)
	)
	const levels = hierarchy.map(([level]) => level)

	const level: any =
		result.type === 'content'
			? levels.pop()
			: levels
					.filter(
						(level) =>
							allLevels.indexOf(level) <= allLevels.indexOf(result.type)
					)
					.pop()

	const titleHtml = result._highlightResult.hierarchy[level].value
	const hierarchyHtml = hierarchy
		.slice(0, levels.indexOf(level))
		.map((e: any) => e[1].value)

	return (
		<li
			className={clsx(
				'group block cursor-pointer px-4 py-3 aria-selected:bg-zinc-50 dark:aria-selected:bg-zinc-800/50',
				resultIndex > 0 && 'border-t border-zinc-100 dark:border-zinc-800'
			)}
			aria-labelledby={`${id}-hierarchy ${id}-title`}
			{...autocomplete.getItemProps({
				item: result,
				source: collection.source,
			})}
		>
			<div
				id={`${id}-title`}
				aria-hidden="true"
				className="text-sm font-medium text-zinc-900 group-aria-selected:text-primary-500 dark:text-white"
				dangerouslySetInnerHTML={{ __html: titleHtml }}
			/>
			{hierarchyHtml.length > 0 && (
				<div
					id={`${id}-hierarchy`}
					aria-hidden="true"
					className="mt-1 truncate whitespace-nowrap text-2xs text-zinc-500"
				>
					{hierarchyHtml.map((item, itemIndex, items) => (
						<Fragment key={itemIndex}>
							<span dangerouslySetInnerHTML={{ __html: item }} />
							<span
								className={
									itemIndex === items.length - 1
										? 'sr-only'
										: 'mx-2 text-zinc-300 dark:text-zinc-700'
								}
							>
								/
							</span>
						</Fragment>
					))}
				</div>
			)}
		</li>
	)
}

export default SearchResult
