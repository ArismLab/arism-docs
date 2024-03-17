const Logo = (props) => {
	return (
		<div className="flex flex-row items-center justify-start gap-2">
			<img
				src="/static/logo.png"
				{...props}
				alt="Arism Wallet"
				className="h-8 w-8"
			/>
			<span className="text-xl font-light text-zinc-900 dark:text-white">
				Arism Wallet
			</span>
		</div>
	)
}

export default Logo
