import {render, screen} from '@testing-library/react'
import Home from '../src/pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
	it('checking ui elements', () => {
		render(<Home currencies={[]}/>)
		
		const fromCurrency = screen.getByRole('combobox', {
			name: /From Currency/i,
		})
		
		expect(fromCurrency).toBeInTheDocument()
		
		const toCurrency = screen.getByRole('combobox', {
			name: /To Currency/i,
		})
		
		expect(toCurrency).toBeInTheDocument()
	})
});