import InfoIcon from '@components/icons/InfoIcon'

const Note = ({ children }) => {
	return (
		<div className="my-6 flex gap-2.5 rounded-2xl border border-primary-500/20 bg-primary-50/50 p-4 leading-6 text-primary-900 dark:border-primary-500/30 dark:bg-primary-500/5 dark:text-primary-200 dark:[--tw-prose-links-hover:theme(colors.primary.300)] dark:[--tw-prose-links:theme(colors.white)]">
			<InfoIcon className="mt-1 h-4 w-4 flex-none fill-primary-600 stroke-white dark:fill-primary-400 dark:stroke-black" />
			<div className="[&>:first-child]:mt-0 [&>:last-child]:mb-0">
				{children}
			</div>
		</div>
	)
}

export default Note
