import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProductsPage } from '../pages/ProductsPage';

describe('ProductsPage', () => {
  it('renderiza correctamente el encabezado', () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/buscar producto/i)).toBeInTheDocument();
  });
});