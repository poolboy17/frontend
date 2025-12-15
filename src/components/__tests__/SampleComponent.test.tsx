import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SampleComponent from '../SampleComponent';

describe('SampleComponent', () => {
  it('renders the button', () => {
    render(<SampleComponent />);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });
});
