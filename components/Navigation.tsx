import Link from '@components/Link'
import NavigationGroup from '@components/NavigationGroup'
import { mainNav } from '@data/siteMetadata.json'

const TopLevelNavItem = ({ href, children }) => {
	return (
		<li className="md:hidden">
			<Link
				href={href}
				className="block py-1 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
			>
				{children}
			</Link>
		</li>
	)
}

const Navigation = ({ className }: { className?: string }) => {
	return (
		<nav className={className}>
			<ul role="list">
				<TopLevelNavItem href="/">API</TopLevelNavItem>
				<TopLevelNavItem href="#">Documentation</TopLevelNavItem>
				{mainNav.map((group, groupIndex) => (
					<NavigationGroup
						key={group.title}
						group={group}
						className={groupIndex === 0 && 'md:mt-0'}
					/>
				))}
			</ul>
		</nav>
	)
}

export default Navigation
