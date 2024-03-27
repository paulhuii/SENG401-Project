import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from '../Dashboard';

describe('Dashboard', () => {
    
    beforeEach(() => {
        render(
            <Router>
            <Dashboard companyPage={1} totalCompanyPages={5} />
            </Router>
        );
    });

    it('renders without crashing', () => {
        const title = screen.getByText('My Dashboard');
        expect(title).toBeInTheDocument();
    });

    it('renders My Dashboard title', () => {
        const title = screen.getByText('My Dashboard');
        expect(title).toBeInTheDocument();
    });

    // it('renders My Network menu item', () => {
    //     const menuItem = screen.getByText('My Network');
    //     expect(menuItem).toBeInTheDocument();
    // });

    it('renders Browse Available Jobs menu item', () => {
        const menuItem = screen.getByText('Browse Available Jobs');
        expect(menuItem).toBeInTheDocument();
    });

    it('renders My Applications menu item', () => {
        const menuItem = screen.getByText('My Applications');
        expect(menuItem).toBeInTheDocument();
    });

});