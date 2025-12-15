import { render, screen } from '@testing-library/react'
import Badge from '../Badge/Badge'

describe('Badge', () => {
	it('renders the name as text', () => {
		render(<Badge name="Test Badge" color="blue" />)
		expect(screen.getByText('Test Badge')).toBeInTheDocument()
	})

	it('applies the correct color class', () => {
		render(<Badge name="Color Test" color="green" />)
		const badge = screen.getByText('Color Test')
		expect(badge.className).toMatch(/text-green-700/)
		expect(badge.className).toMatch(/bg-green-50/)
	})

	it('renders as a link when href is provided', () => {
		render(<Badge name="Link Badge" color="red" href="/test-link" />)
		const link = screen.getByRole('link', { name: 'Link Badge' })
		expect(link).toBeInTheDocument()
		expect(link).toHaveAttribute('href', '/test-link')
	})

	it('renders as a span when href is not provided', () => {
		render(<Badge name="No Link" color="yellow" />)
		const badge = screen.getByText('No Link')
		expect(badge.tagName).toBe('SPAN')
	})

	it('applies custom className and roundedClassName', () => {
		render(
			<Badge
				name="Custom Class"
				color="blue"
				className="my-custom-class"
				roundedClassName="rounded-xl"
			/>,
		)
		const badge = screen.getByText('Custom Class')
		expect(badge.className).toMatch(/my-custom-class/)
		expect(badge.className).toMatch(/rounded-xl/)
	})
})
