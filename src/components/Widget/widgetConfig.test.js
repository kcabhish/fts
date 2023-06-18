import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WidgetConfig from './WidgetConfig';

describe('WidgetConfig', () => {
  const mockEditContainer = jest.fn();

  const defaultProps = {
    widgetChannel: 'default channel',
    languageCode: 'en',
    widgetTitle: 'Test Widget',
    editContainer: mockEditContainer,
  };

  beforeEach(() => {
    render(<WidgetConfig {...defaultProps} />);
  });

  it('renders the WidgetConfig component with initial values', () => {
    const channelInput = screen.getByPlaceholderText('Enter Channel name');
    const languageSelect = screen.getByDisplayValue('English');
  
    expect(channelInput).toBeInTheDocument();
    expect(channelInput).toHaveValue('default channel');
  
    expect(languageSelect).toBeInTheDocument();
  });
  

  it('calls the editContainer function with updated values on form submission', () => {
    const channelInput = screen.getByPlaceholderText('Enter Channel name');
    const languageSelect = screen.getByDisplayValue('English');
    const updateButton = screen.getByText('Update');

    fireEvent.change(channelInput, { target: { value: 'updated channel' } });
    fireEvent.change(languageSelect, { target: { value: 'fr' } });
    fireEvent.click(updateButton);

    expect(mockEditContainer).toHaveBeenCalledWith('Test Widget', 'fr', 'updated channel');
  });
});
