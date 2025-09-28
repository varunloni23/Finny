import { render, screen } from '@testing-library/react';
import { Card, CardHeader, CardTitle, CardContent } from './card';

describe('Card Component', () => {
  it('renders children correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Test Content</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <Card className="custom-class">
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Test Content</p>
        </CardContent>
      </Card>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });
});