import { useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

import Link from '@components/Link'
import Tag from '@components/Tag'
import { useSectionStore } from '@hooks/navigation'
import { remToPx } from '@libs/remToPx'

import AnchorIcon from './icons/AnchorIcon'

const Eyebrow = ({ tag, label }) => {
	if (!tag && !label) {
		return null
	}

	return (
		<div className="flex items-center gap-x-3">
			{tag && <Tag>{tag}</Tag>}
			{tag && label && (
				<span className="h-0.5 w-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
			)}
			{label && (
				<span className="font-mono text-xs text-zinc-400">{label}</span>
			)}
		</div>
	)
}

const Anchor = ({ id, inView, children }) => {
	return (
		<Link
			href={`#${id}`}
			className="group text-inherit no-underline hover:text-inherit"
		>
			{inView && (
				<div className="absolute ml-[calc(-1*var(--width))] mt-[0.625rem] w-[var(--width)] opacity-100 transition [--width:calc(2.625rem+0.5px+50%-min(50%,calc(theme(maxWidth.lg)+theme(spacing.8))))] group-focus:opacity-100 md:block lg:z-50 2xl:[--width:theme(spacing.10)]">
					<div className="group/anchor block h-5 w-5 rounded-lg bg-zinc-50 ring-1 ring-inset ring-zinc-300 transition hover:ring-zinc-500 dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-700 dark:hover:ring-zinc-600">
						<AnchorIcon className="h-5 w-5 stroke-zinc-500 transition dark:stroke-zinc-400 dark:group-hover/anchor:stroke-primary-900" />
					</div>
				</div>
			)}
			{children}
		</Link>
	)
}

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
			<Eyebrow tag={tag} label={label} />
			<Component
				ref={ref}
				id={anchor ? id : undefined}
				className={tag || label ? 'mt-2 scroll-mt-32' : 'scroll-mt-24'}
				{...props}
			>
				{anchor ? (
					<Anchor id={id} inView={inView}>
						{children}
					</Anchor>
				) : (
					children
				)}
			</Component>
		</>
	)
}

export default Heading
