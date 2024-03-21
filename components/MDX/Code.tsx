import { useContext } from 'react'

import { CodeGroupContext } from '@components/MDX/Pre'

const Code = ({ children, ...props }) => {
	const isGrouped = useContext(CodeGroupContext)

	if (isGrouped) {
		return <code {...props} dangerouslySetInnerHTML={{ __html: children }} />
	}

	return <code {...props}>{children}</code>
}

export default Code
