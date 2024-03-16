const FeedbackButton = (props) => {
	return (
		<button
			type="submit"
			className="hover:bg-zinc-900/2.5 px-3 text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
			{...props}
		/>
	)
}

export default FeedbackButton
