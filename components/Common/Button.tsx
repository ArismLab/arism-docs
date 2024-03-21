import clsx from 'clsx'
import Link from 'next/link'

import ArrowIcon from '@components/Icons/ArrowIcon'

const variantStyles = {
	primary:
		'rounded-full py-2 px-5 text-white dark:text-black bg-zinc-900 hover:bg-zinc-600 dark:bg-zinc-100 dark:hover:bg-zinc-400  hover:text-white',
	secondary:
		'rounded-full bg-zinc-100 py-2 px-5 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300',
	filled:
		'rounded-full bg-zinc-900 py-2 px-5 text-white hover:bg-zinc-700 dark:bg-zinc-500 dark:text-white dark:hover:bg-zinc-400',
	outline:
		'rounded-full py-2 px-5 text-black dark:text-white ring-1 ring-zinc-900 hover:ring-zinc-600 dark:ring-zinc-100 dark:hover:ring-zinc-400 hover:bg-zinc-900/10 dark:hover:bg-zinc-100/10',
	text: 'text-primary-500 hover:text-primary-300 dark:text-primary-300 dark:hover:text-primary-500',
}

const Button = ({
	variant = 'primary',
	className,
	children,
	arrow,
	...props
}: any) => {
	const isAnchor = props?.href?.startsWith('http')
	props.target = isAnchor ? '_blank' : null

	const Component = props?.href ? (isAnchor ? 'a' : Link) : 'button'

	className = clsx(
		'not-prose inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition',
		variantStyles[variant],
		className
	)

	const arrowIcon = (
		<ArrowIcon
			className={clsx(
				'mt-0.5 h-5 w-5',
				variant === 'text' && 'top-px',
				arrow === 'left' && '-ml-1 rotate-180',
				arrow === 'right' && '-mr-1'
			)}
		/>
	)

	return (
		<Component className={className} {...props}>
			{arrow === 'left' && arrowIcon}
			{children}
			{arrow === 'right' && arrowIcon}
		</Component>
	)
}

export default Button
