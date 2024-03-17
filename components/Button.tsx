import clsx from 'clsx'
import Link from 'next/link'

import ArrowIcon from './icons/ArrowIcon'

const variantStyles = {
	primary:
		'rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-primary-400/10 dark:text-primary-400 dark:ring-1 dark:ring-inset dark:ring-primary-400/20 dark:hover:bg-primary-400/10 dark:hover:text-primary-300 dark:hover:ring-primary-300',
	secondary:
		'rounded-full bg-zinc-100 py-1 px-3 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800/40 dark:text-zinc-400 dark:ring-1 dark:ring-inset dark:ring-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-300',
	filled:
		'rounded-full bg-zinc-900 py-1 px-3 text-white hover:bg-zinc-700 dark:bg-primary-500 dark:text-white dark:hover:bg-primary-400',
	outline:
		'rounded-full py-1 px-3 text-zinc-700 ring-1 ring-inset ring-zinc-900/10 hover:bg-zinc-900/2.5 hover:text-zinc-900 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white',
	text: 'text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500',
}

const Button = ({
	variant = 'primary',
	className,
	children,
	arrow,
	...props
}: any) => {
	const Component = props?.href ? Link : 'button'

	className = clsx(
		'inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition',
		variantStyles[variant],
		className
	)

	const arrowIcon = (
		<ArrowIcon
			className={clsx(
				'mt-0.5 h-5 w-5',
				variant === 'text' && 'relative top-px',
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
