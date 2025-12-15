type EntryHeaderProps = {
	title: string
	date?: Date | string
	author?: string
}

export default function EntryHeader({ title, date, author }: EntryHeaderProps) {
	return (
		<div className="mb-10 text-center">
			{title && <h2 className="text-3xl xl:text-4xl">{title}</h2>}

			{date && author && (
				<div className="mt-5 text-sm">
					By {author} on <time>{new Date(date).toDateString()}</time>
				</div>
			)}
		</div>
	)
}
