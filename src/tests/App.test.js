import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Criando testes para requisito 5', () => {
  it('Verifica renderização', () => {
    render(<App />);

    const textbox = screen.getAllByRole('textbox');
    const combobox = screen.getAllByRole('combobox');
    const button = screen.getByRole('button', {
      name: /filtrar/i,
    });

    expect(textbox.length).toBe(1);
    expect(combobox.length).toBe(2);
    expect(button).toBeInTheDocument();
  });
  it('Verifica filtragem', async() => {
    render(<App />);

    const searchedPlanet = await screen.findByText(/tatooine/i, {}, { timeout: 20000 });
    const searchInput = screen.getByPlaceholderText('pesquisar');
    const searchFilter = screen.getByTestId('value-filter');
    const columnsFilter = screen.getByTestId('column-filter');
    const operatorsFilter = screen.getByTestId('comparison-filter');
    const button = screen.getByRole('button', {
      name: /filtrar/i,
    });

    expect(searchedPlanet).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchFilter).toBeInTheDocument();
    expect(columnsFilter).toBeInTheDocument();

    userEvent.type(searchInput, 'Tatooine');
    userEvent.selectOptions(columnsFilter, 'population');
    userEvent.selectOptions(operatorsFilter, 'maior que');
    userEvent.type(searchInput, '0');
    userEvent.click(button);
    userEvent.selectOptions(operatorsFilter, 'menor que');
    userEvent.click(button);
    userEvent.selectOptions(operatorsFilter, 'igual a');
    userEvent.click(button);
    // userEvent.type(searchInput, 'oo');
    // expect(searchedPlanet).toBeInTheDocument();

  });
});
