import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders as checked when checked=true', () => {
    render(<Checkbox checked onChange={() => {}} label="Enable" />);

    const checkbox = screen.getByRole('checkbox', { name: 'Enable' }) as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('calls onChange with next state on click', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox checked={false} onChange={onChange} label="Enable" />);
    await user.click(screen.getByRole('checkbox', { name: 'Enable' }));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('does not call onChange when disabled', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Checkbox checked={false} onChange={onChange} disabled label="Enable" />);
    await user.click(screen.getByRole('checkbox', { name: 'Enable' }));

    expect(onChange).not.toHaveBeenCalled();
  });
});
