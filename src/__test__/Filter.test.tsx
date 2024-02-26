import React from 'react';
import { render  ,screen } from '@testing-library/react';
import Filter from '../Component/Filter/Filter'

describe('Test cases for filter Element',()=>{
   it('Image tag should render properly',()=>{
      render (<Filter/>)
      const FilterImage = screen.getByTestId('filterIcon')
      expect(FilterImage).toBeInTheDocument();
   })
})