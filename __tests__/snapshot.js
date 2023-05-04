import {render} from '@testing-library/react'
import Home from '../src/pages/index'

it('renders homepage unchanged', () => {
  const {container} = render(<Home currencies={[]}/>)
  expect(container).toMatchSnapshot()
})