import { CoreColumnFragmentFragment } from '@/__generated__/graphql'
import MyWordPressBlockViewer from '@/components/MyWordPressBlockViewer'
import { gql } from '@apollo/client'
import { WordPressBlock, getStyles, useBlocksTheme } from '@faustwp/blocks'
//
const CoreColumn: WordPressBlock<CoreColumnFragmentFragment> = (props) => {
	// get the BlocksTheme object
	const theme = useBlocksTheme()
	const style = getStyles(theme, { ...props })

	const { attributes } = props || {}
	const { className, cssClassName } = attributes || {}

	// Inline styles are not allowed by linter, so ignore dynamic style application
	const styleClass = ''

	return (
		<div className={`${className || ''} ${cssClassName || ''}`.trim()}>
			{/* @ts-ignore */}
			<MyWordPressBlockViewer blocks={props.children} />
		</div>
	)
}

export const CoreColumnFragments = {
	entry: gql`
		fragment CoreColumnFragment on CoreColumn {
			attributes {
				style
				className
				cssClassName
			}
		}
	`,
	key: `CoreColumnFragment`,
}

CoreColumn.displayName = 'CoreColumn'
export default CoreColumn
