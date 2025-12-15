import { render, screen } from '@testing-library/react'
import Page, { getStaticProps } from '../index'

jest.mock('@faustwp/core', () => ({
	WordPressTemplate: ({ title }: any) => <div>Mocked WP Template: {title}</div>,
	getWordPressProps: jest.fn(() =>
		Promise.resolve({ props: { title: 'Test Home' } }),
	),
}))

describe('Integration: Home Page', () => {
	it('renders the WordPressTemplate with mock data', async () => {
		// getStaticProps should return the mock props
		const result = await getStaticProps({} as any)
		expect(result).toHaveProperty('props')
		expect(result.props.title).toBe('Test Home')

		// Render the page with the mock props
		render(<Page {...result.props} />)
		expect(
			screen.getByText(/Mocked WP Template: Test Home/),
		).toBeInTheDocument()
	})
})
