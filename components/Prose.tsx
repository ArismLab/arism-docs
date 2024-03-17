import clsx from 'clsx'

const Prose = ({ as: Component = 'div', className, ...props }: any) => {
	return (
		<Component
			className={clsx(className, 'prose dark:prose-invert')}
			{...props}
		/>
	)
}

export default Prose
