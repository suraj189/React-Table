import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for additional matchers
import Pagination from '../Component/Pagination/Pagination';

// Mocking images
jest.mock('../../image/CaretCircleLeft.png', () => 'MockCaretCircleLeft');
jest.mock('../../image/CaretCircleRight.png', () => 'MockCaretCircleRight');
jest.mock('../../image/CaretCircleDoubleRight.png', () => 'MockCaretCircleDoubleRight');
jest.mock('../../image/CaretCircleDoubleLeft.png', () => 'MockCaretCircleDoubleLeft');

describe('Pagination Component', () => {
  // Define mock functions for props
  const mockOnEntriesPerPageChange = jest.fn();
  const mockHandlePageChange = jest.fn();

  // Mock data for props
  const mockProps = {
    length: 50,
    currentPage: 2,
    totalPages: 5,
    onEntriesPerPageChange: mockOnEntriesPerPageChange,
    handlePagechange: mockHandlePageChange,
  };

  
    render(<Pagination {...mockProps} />);
  

  test('renders component with proper props', () => {
    const selectElement = screen.getByTestId('select');
    expect(selectElement).toBeInTheDocument();
    expect(selectElement).toHaveValue(10); 
    expect(selectElement).toContainHTML('<option value="2">2</option>'); 

    const lengthElement = screen.getByText('of 50 records');
    expect(lengthElement).toBeInTheDocument();

    expect(screen.getByTestId('First')).toBeInTheDocument();
    expect(screen.getByTestId('Previous')).toBeInTheDocument();
    expect(screen.getByTestId('Next')).toBeInTheDocument();
    expect(screen.getByTestId('Last')).toBeInTheDocument();

    const pageSelect = screen.getByRole('combobox');
    expect(pageSelect).toBeInTheDocument();
    expect(pageSelect).toHaveValue(2);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('handles entries per page change', () => {
    const selectElement = screen.getByTestId('select');
    fireEvent.change(selectElement, { target: { value: '5' } });
    expect(mockOnEntriesPerPageChange).toHaveBeenCalledWith(5);
  });

  test('handles page change', () => {
    fireEvent.click(screen.getByTestId('Next'));
    expect(mockHandlePageChange).toHaveBeenCalledWith(3, 10); 
  });

  test('handles Previous change', () => {
    fireEvent.click(screen.getByTestId('Previous'));
    expect(mockHandlePageChange).toHaveBeenCalledWith(1, 5); 
  });
  
  test('handleEntriesPerPageChange updates state correctly', () => {
    const selectElement = screen.getByTestId('select');
    fireEvent.change(selectElement, { target: { value: '5' } });
    expect(selectElement).toHaveValue(5);
  });

  it('handlePageChange calls handlePagechange with valid arguments', () => {
    const nextButton = screen.getByTestId('Next');
    fireEvent.click(nextButton);
    expect(mockHandlePageChange).toHaveBeenCalledWith(3, 10); 
  });

  it('handlePageChange does not call handlePagechange with invalid arguments', () => {
    const nextButton = screen.getByTestId('Next');
    mockProps.totalPages = 2;

    fireEvent.click(nextButton);
    expect(mockHandlePageChange).not.toHaveBeenCalled();
  });
});
