
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import PatientList from './PatientList';
import { within } from '@testing-library/react';

describe('PatientList', () => {
  it('renders all expected table headers', () => {
    render(
      <MemoryRouter>
        <PatientList />
      </MemoryRouter>
    );
    // Get the table and its headers for clarity
    const table = screen.getByRole('table');
    const headers = within(table).getAllByRole('columnheader');
    const headerTexts = headers.map((th) => th.textContent?.replace(/\s+/g, ' ').trim());
    // Check for all expected headers
    expect(headerTexts).toEqual(
      expect.arrayContaining(['Name ▲', 'Age', 'Last Visit', 'Status'])
    );
  });
});
