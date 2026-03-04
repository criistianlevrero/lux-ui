import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders children content by default', () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole('button', { name: 'Click me' })).toBeDefined();
  });

  it('hides text when iconOnly is true', () => {
    render(
      <Button iconOnly icon={<span aria-hidden="true">+</span>}>
        Hidden Label
      </Button>,
    );

    expect(screen.getByRole('button').textContent).toBe('+');
  });

  it('calls onClick when pressed', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Save</Button>);
    await user.click(screen.getByRole('button', { name: 'Save' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
