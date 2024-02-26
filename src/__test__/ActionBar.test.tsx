import { render  ,screen } from '@testing-library/react';
import ActionBar from '../Component/ActionBar/ActionBar';


describe('Testing Action Bar Component',()=>{

 test('check all element is rendering properly',()=>{
    render(<ActionBar/>)
    expect(screen.getByTestId('edit')).toBeInTheDocument();
    expect(screen.getByTestId('delete')).toBeInTheDocument();
    expect(screen.getByTestId('publish')).toBeInTheDocument();
    expect(screen.getByTestId('unPulish')).toBeInTheDocument();
    expect(screen.getByTestId('release')).toBeInTheDocument();
 })

})


