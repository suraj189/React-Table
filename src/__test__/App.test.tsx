import { render ,screen} from "@testing-library/react"
import App from '../App'

describe('rendering app component properly',()=>{
  render(<App/>)
  expect(screen.getByTestId('app')).toBeInTheDocument();

})