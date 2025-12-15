import { render, screen } from '@testing-library/react';
import Badge from '../Badge/Badge';

describe('Badge', () => {
  it('renders the Badge component', () => {
    render(<Badge name="Test Badge" color="blue" />);
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });
});
