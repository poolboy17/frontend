import React, { FC } from 'react'
import Heading from '@/components/Heading/Heading'
import SectionSliderPosts from '@/components/Sections/SectionSliderPosts'
import { PostDataFragmentType } from '@/data/types'

export interface SingleRelatedPostsProps {
	postDatabaseId: number
	posts: PostDataFragmentType[] | null
}

const SingleRelatedPosts: FC<SingleRelatedPostsProps> = ({
	postDatabaseId,
	posts,
}) => {
	if (!posts?.length) {
		return <div className="py-5" />
	}

	return (
		<div className="mt-16 bg-neutral-100/80 py-16 lg:mt-20 lg:py-20 dark:bg-neutral-800">
			{/* RELATED  */}
			<div className="container">
				<div>
					<Heading
						className="mb-10 text-neutral-900 dark:text-neutral-50"
						desc=""
					>
						Related posts
					</Heading>

					<SectionSliderPosts postCardName="card7" posts={posts || []} />
				</div>
			</div>
		</div>
	)
}

export default SingleRelatedPosts
