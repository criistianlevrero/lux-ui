import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders with provided value', () => {
    render(<Input aria-label="name" value="Lux" onChange={() => {}} />);

    const input = screen.getByRole('textbox', { name: 'name' }) as HTMLInputElement;
    expect(input.value).toBe('Lux');
  });

  it('fires onChange when typing', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Input aria-label="query" defaultValue="" onChange={onChange} />);
    await user.type(screen.getByRole('textbox', { name: 'query' }), 'abc');

    expect(onChange).toHaveBeenCalled();
  });
});
