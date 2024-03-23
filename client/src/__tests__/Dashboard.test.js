import { render, fireEvent, waitFor, screen, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Dashboard from '../Dashboard';

describe('Dashboard', () => {
    it('renders without crashing', () => {
        render(<Dashboard />);
    });

    it('renders My Dashboard title', () => {
        render(<Dashboard />);
        const title = screen.getByText('My Dashboard');
        expect(title).toBeInTheDocument();
    });

    it('renders My Network menu item', () => {
        const { getByText } = render(<Dashboard />);
        const menuItem = getByText('My Network');
        expect(menuItem).toBeInTheDocument();
    });

    it('renders Browse Available Jobs menu item', () => {
        const { getByText } = render(<Dashboard />);
        const menuItem = getByText('Browse Available Jobs');
        expect(menuItem).toBeInTheDocument();
    });

    it('renders My Applications menu item', () => {
        const { getByText } = render(<Dashboard />);
        const menuItem = getByText('My Applications');
        expect(menuItem).toBeInTheDocument();
    });

    it('renders pagination buttons correctly', () => {
        const { container } = render(<Dashboard companyPage={1} totalCompanyPages={5} />);
        const buttons = container.querySelectorAll('.pagination-button');
        expect(buttons.length).toBe(5);
    });

    it('Next button is present when company page < totalCompanyPages', () => {
        render(<Dashboard companyPage={1} totalCompanyPages={5} />);

        // The "Next" button should be in the document
        const nextButton = screen.getByText('Next');
        expect(nextButton).toBeInTheDocument();

        // Click the "Next" button until it disappears
        while (screen.queryByText('Next')) {
            userEvent.click(nextButton);
        }

        // After clicking "Next" button until it disappears, the "Next" button should not be in the document
        expect(screen.queryByText('Next')).not.toBeInTheDocument();
    });  
});
