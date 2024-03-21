const Logo = (props) => {
	return (
		<div className="flex flex-row items-center justify-start gap-3">
			<img
				src="/static/logo.png"
				{...props}
				alt="Arism Wallet"
				className="h-8 w-8"
			/>
			<span className="text-xl font-light tracking-wide text-zinc-900 dark:text-white">
				Arism Docs
			</span>
		</div>
	)
}

export default Logo
