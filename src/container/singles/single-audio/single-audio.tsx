import React, { FC } from 'react'
import ButtonPlayMusicPlayer from '@/components/ButtonPlayMusicPlayer'
import { SingleType1Props } from '../single/single'
import { getPostDataFromPostFragment } from '@/utils/getPostDataFromPostFragment'
import MyImage from '@/components/MyImage'
import SingleHeader from '../SingleHeader'
import { PostDataFragmentType } from '@/data/types'

interface Props extends SingleType1Props {}

const SingleTypeAudio: FC<Props> = ({ post }) => {
	//
	const { title, featuredImage, postFormats } = getPostDataFromPostFragment(
		post || {},
	)
	const isAudio = postFormats === 'audio'
	//

	const renderIcon = (playing: boolean) => {
		if (playing) {
			return (
				<MyImage
					className="w-7"
					src={'/images/icon-playing.gif'}
					alt="music playing"
					width={28}
					height={28}
				/>
			)
		}

		return (
			<svg
				className="h-11 w-11 rtl:rotate-180"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke="currentColor"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="1.5"
					d="M18.25 12L5.75 5.75V18.25L18.25 12Z"
				></path>
			</svg>
		)
	}

	const renderButtonPlay = (playing: boolean) => {
		return (
			<div
				className={`group z-10 overflow-hidden shadow-2xl ${
					isAudio
						? `aspect-h-1 aspect-w-1 cursor-pointer rounded-full`
						: 'rounded-3xl'
				}`}
			>
				{featuredImage?.sourceUrl && (
					<MyImage
						className={`z-0 transition-transform ${
							isAudio
								? 'nc-animation-spin h-full w-full rounded-full object-cover'
								: 'rounded-3xl'
						} ${playing && isAudio ? 'playing' : ''}`}
						alt={title}
						src={featuredImage?.sourceUrl || ''}
						fill={isAudio}
						width={
							isAudio ? undefined : featuredImage?.mediaDetails?.width || 1000
						}
						height={
							isAudio ? undefined : featuredImage?.mediaDetails?.height || 750
						}
						priority
					/>
				)}

				{isAudio && (
					<>
						<div className="rounded-full bg-neutral-900 bg-opacity-75 bg-blend-multiply"></div>
						<div className="flex items-center justify-center">
							<div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-neutral-300 bg-black bg-opacity-50 text-white bg-blend-multiply">
								{renderIcon(playing)}
							</div>
						</div>
					</>
				)}
			</div>
		)
	}

	return (
		<>
			<div className={`relative pt-8 lg:pt-16`}>
				{/* Overlay */}
				<div className="absolute inset-x-0 top-0 h-60 w-full bg-primary-50 dark:bg-neutral-800"></div>

				{/* SINGLE_AUDIO HEADER */}
				<header className="relative lg:container">
					<div
						className={`flex flex-col gap-8 rounded-2xl bg-white px-4 py-7 shadow-2xl sm:px-5 md:flex-row md:rounded-[40px] lg:gap-10 lg:p-11 dark:bg-neutral-900 ${
							isAudio ? 'items-center justify-center' : 'items-start'
						}`}
					>
						<div
							className={`${
								isAudio ? 'w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5' : 'sm:max-w-xs'
							} flex-shrink-0`}
						>
							{isAudio ? (
								<ButtonPlayMusicPlayer
									renderChildren={renderButtonPlay}
									post={post as PostDataFragmentType}
								/>
							) : (
								renderButtonPlay(false)
							)}
						</div>
						<SingleHeader hiddenDesc className="flex-1" post={post} />
					</div>
				</header>
			</div>
		</>
	)
}

export default SingleTypeAudio
