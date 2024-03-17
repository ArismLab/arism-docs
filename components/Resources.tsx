import Heading from '@components/Heading'
import ChatBubbleIcon from '@components/icons/ChatBubbleIcon'
import EnvelopeIcon from '@components/icons/EnvelopeIcon'
import UserIcon from '@components/icons/UserIcon'
import UsersIcon from '@components/icons/UsersIcon'
import Resource from '@components/Resource'

const resources = [
	{
		href: '/contacts',
		name: 'Contacts',
		description:
			'Learn about the contact model and how to create, retrieve, update, delete, and list contacts.',
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
		href: '/conversations',
		name: 'Conversations',
		description:
			'Learn about the conversation model and how to create, retrieve, update, delete, and list conversations.',
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
		href: '/messages',
		name: 'Messages',
		description:
			'Learn about the message model and how to create, retrieve, update, delete, and list messages.',
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
		href: '/groups',
		name: 'Groups',
		description:
			'Learn about the group model and how to create, retrieve, update, delete, and list groups.',
		icon: UsersIcon,
		pattern: {
			y: 22,
			squares: [[0, 1]],
		},
	},
]

const Resources = () => {
	return (
		<div className="my-16 xl:max-w-none">
			<Heading level={2} id="resources">
				Resources
			</Heading>
			<div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-zinc-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
				{resources.map((resource) => (
					<Resource key={resource.href} resource={resource} />
				))}
			</div>
		</div>
	)
}

export default Resources
