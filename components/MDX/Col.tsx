import clsx from 'clsx'

const Col = ({ children, sticky = false }) => {
	return (
		<div
			className={clsx(
				'[&>:first-child]:mt-0 [&>:last-child]:mb-0',
				sticky && 'xl:sticky xl:top-24'
			)}
		>
			{children}
		</div>
	)
}

export default Col
