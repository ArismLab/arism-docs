import { useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

import Link from '@components/Common/Link'
import Tag from '@components/Common/Tag'
import AnchorIcon from '@components/Icons/AnchorIcon'
import { useSectionStore } from '@hooks/navigation'
import { remToPx } from '@libs/remToPx'

const Heading = ({
	level = 2,
	children,
	id,
	tag,
	label,
	anchor = true,
	...props
}: any) => {
	const Component: any = `h${level}`
	const ref: any = useRef()
	const registerHeading: any = useSectionStore((s: any) => s.registerHeading)

	const inView = useInView(ref, {
		margin: `${remToPx(-3.5)}px 0px 0px 0px`,
		amount: 'all',
	})

	useEffect(() => {
		if (level === 2) {
			registerHeading({ id, ref, offsetRem: tag || label ? 8 : 6 })
		}
	})

	return (
		<>
			{tag ||
				(label && (
					<div className="flex items-center gap-x-3">
						{tag && <Tag>{tag}</Tag>}
						{tag && label && (
							<span className="h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
						)}
						{label && (
							<span className="font-mono text-xs text-zinc-400">{label}</span>
						)}
					</div>
				))}
			<Component
				ref={ref}
				id={anchor ? id : undefined}
				className={tag || label ? 'mt-2 scroll-mt-32' : 'scroll-mt-24'}
				{...props}
			>
				{anchor ? (
					<Link
						href={`#${id}`}
						className="group text-inherit no-underline hover:text-inherit"
					>
						{inView && (
							<div className="absolute z-50 mt-[0.6rem] hidden w-[var(--width)] opacity-100 transition [--width:calc(2.625rem+0.5px+45%-min(50%,calc(theme(maxWidth.lg)+theme(spacing.8))))] group-focus:opacity-100 lg:left-[-0.75rem] lg:block xl:left-[-0.625rem] 2xl:left-[3.25rem] 2xl:[--width:theme(spacing.10)]">
								<div className="group/anchor block h-5 w-5 rounded-lg bg-zinc-50 ring-1 ring-inset ring-zinc-300 transition hover:ring-zinc-500 dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-700 dark:hover:ring-zinc-600">
									<AnchorIcon className="h-5 w-5 stroke-zinc-500 transition dark:stroke-zinc-400 dark:group-hover/anchor:stroke-primary-900" />
								</div>
							</div>
						)}
						{children}
					</Link>
				) : (
					children
				)}
			</Component>
		</>
	)
}

export default Heading
