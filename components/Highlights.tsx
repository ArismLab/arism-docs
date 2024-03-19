import Heading from '@components/Heading'
import Highlight from '@components/Highlight'
import ChatBubbleIcon from '@components/icons/ChatBubbleIcon'
import EnvelopeIcon from '@components/icons/EnvelopeIcon'
import UserIcon from '@components/icons/UserIcon'
import UsersIcon from '@components/icons/UsersIcon'

const highlights = [
	{
		name: 'Friendliness',
		description:
			'One-click login via third-party platforms. No need to remember seed phrases or private keys.',
		icon: UserIcon,
		pattern: {
			y: 16,
			squares: [
				[0, 1],
				[1, 3],
			],
		},
	},
	{
		name: 'Loss Prevention',
		description:
			'Easy recovery with MFA. No longer worry about losing access to accounts by mistakes.',
		icon: ChatBubbleIcon,
		pattern: {
			y: -6,
			squares: [
				[-1, 2],
				[1, 3],
			],
		},
	},
	{
		name: 'Security',
		description:
			'Protected by a distributed network of nodes. Keep your accounts safe from any attack attempts.',
		icon: EnvelopeIcon,
		pattern: {
			y: 32,
			squares: [
				[0, 2],
				[1, 4],
			],
		},
	},
	{
		name: 'Feature Variety',
		description:
			'Account Abstraction and Distributed Identifier support. Manage and represent everything by a single identity.',
		icon: UsersIcon,
		pattern: {
			y: 22,
			squares: [[0, 1]],
		},
	},
]

const Highlights = () => {
	return (
		<div className="my-16 xl:max-w-none">
			<Heading level={2} id="Highlights">
				Highlights
			</Heading>
			<div className="mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 dark:border-white/5 sm:grid-cols-2 xl:grid-cols-4">
				{highlights.map((highlight, i) => (
					<Highlight key={i} highlight={highlight} />
				))}
			</div>
		</div>
	)
}

export default Highlights
