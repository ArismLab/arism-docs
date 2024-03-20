import NavigationGroup from '@components/NavigationGroup'
import { internalLinks } from '@data/siteMetadata.json'

const Navigation = ({ className }: { className?: string }) => {
  return (
		<nav className={className}>
			<ul role="list">
				{internalLinks.map((group, groupIndex) => (
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
