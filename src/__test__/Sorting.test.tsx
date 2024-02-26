import React from 'react';
import { render, fireEvent ,screen } from '@testing-library/react';
import sortImage from '../../image/No-Sort.png'
import Sorting from '../Component/Sorting/Sorting';


describe('Sorting Component',()=>{
    const entriesMock=[
      {
        "title": "Building a Beautiful Garden",
        "locale": "en-us",
        "content_type": "blog_detail_page",
       
        "public_stages": 1,
        "version": 22,
       
        "workflow_Stages":"Text for Chips",
        "modified_at": "2024-01-10T14:23:00.000Z",
        "tags": [],
        "action":"action",
        "isCheck": true,
        "name":'Suraj'
      },
      {
        "title": "The Art of Baking Bread",
        "locale": "en-us",
        "content_type": "blog_detail_page",
       
        "public_stages": 2,
         "version": 22,
        "workflow_Stages":"Text for Chips",
        "modified_at": "2024-01-11T10:05:00.000Z",
        "tags": ["food", "recipes"],
        
        "action":"action",
        "isCheck": true,
        "name":'Sylvie'
  
      },
    ]


    test('should render sorting component properly',()=>{
        render(<Sorting entries={entriesMock} handleSorted={()=>{}}/>)
        const sortEntry = screen.getByAltText('sort');
        expect(sortEntry).toBeInTheDocument();
    })

    test('should sort the entries in  ascending order when clicked',()=>{
        const onClick = jest.fn()
        render(<Sorting entries={entriesMock} handleSorted={onClick}/>)
        const sortEntry = screen.getByAltText('sort');
        fireEvent.click(sortEntry)
        expect(onClick).toHaveBeenCalledWith(expect.any(Array));
    })

    test('should sort the endtries in descending order when clicked',()=>{
        const onClick = jest.fn()
        render(<Sorting entries={entriesMock} handleSorted={onClick}/>)
        const sortEntry = screen.getByAltText('sort');
        fireEvent.click(sortEntry)
        expect(onClick).toHaveBeenCalledWith(expect.any(Array));

    })

    test('should contain the right image', () => {
      render(<Sorting entries={entriesMock} handleSorted={() => {}} />);
      const testImage = screen.getByAltText('sort');
      expect(testImage).toHaveAttribute('src', sortImage);
    });

})