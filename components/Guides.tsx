import Button from '@components/Button'
import Heading from '@components/Heading'

const guides = [
	{
		href: '/whitepaper',
		name: 'Whitepaper',
		description: 'Learn about the core concepts of the protocol.',
	},
	{
		href: '/how-to-use',
		name: 'How to use',
		description: 'Start your journey with guides and recommended practices.',
	},
	{
		href: '/node-setup',
		name: 'Node setup',
		description: 'Learn how to set up nodes and start earning rewards.',
	},
	{
		href: '/sdk-integration',
		name: 'SDK integration',
		description: 'Use our SDK to integrate the protocol into your DApps.',
	},
]

const Guides = () => {
	return (
		<div className="my-16 xl:max-w-none">
			<Heading level={2} id="guides">
				Guides
			</Heading>
			<div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4">
				{guides.map((guide) => (
					<div key={guide.href}>
						<h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
							{guide.name}
						</h3>
						<p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
							{guide.description}
						</p>
						<p className="mt-4">
							<Button href={guide.href} variant="text" arrow="right">
								Read more
							</Button>
						</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Guides
