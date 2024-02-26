import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Table from '../Pages/Table';

const mockEntries = [
    {
        "title": "Winter Fashion Trends",
        "locale": "Polish",
        "content_type": "Blog Detail Page",
        "version": 25,
        "public_stages": 2,
        "workflow_Stages":"Text for Chips",
         "modified_at": "Dec 7,2019 05:18 ",
         "name": "France Delort",
        "tags": ["fashion", "style"],
        "action":"action",
        "isCheck":false
       
      },];

jest.mock('../entries.json', () => mockEntries);

describe('Table component', () => {
    render(<Table />);
  test('renders table with correct columns and data', () => {
    expect(screen.getByTestId('table')).toBeInTheDocument();
    expect(screen.getByTestId('title')).toBeInTheDocument();
    expect(screen.getByTestId('locale')).toBeInTheDocument();
    expect(screen.getByTestId('content_type')).toBeInTheDocument();
    expect(screen.getByTestId('version')).toBeInTheDocument();
    expect(screen.getByTestId('public_stages')).toBeInTheDocument();
    expect(screen.getByTestId('workflow_Stages')).toBeInTheDocument();
    expect(screen.getByTestId('modified_at')).toBeInTheDocument();
    expect(screen.getByTestId('tags')).toBeInTheDocument();
    expect(screen.getByTestId('isCheck')).toBeInTheDocument();
    
  });

  test('handles checkbox click', () => {
    const checkbox = screen.getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  test('render filter and sorting component',()=>{
    const sortingComponent = screen.queryByTestId('sorting-component');
    expect(sortingComponent).toBeInTheDocument();

    const filterComponent = screen.queryByTestId('filter-component');
    expect(filterComponent).toBeInTheDocument();
  })

});
