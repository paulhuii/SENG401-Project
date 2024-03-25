import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ApplicationCard from '../components/Cards/ApplicationCard';

describe('ApplicationCard', () => {
    const application = {
        jobID: '123',
        jobTitle: 'Software Engineer',
        companyName: 'ABC Company',
        location: 'New York',
        dateApplied: '2022-01-01',
        salary: '$100,000',
        jobType: 'Full-time',
        description: 'Lorem ipsum dolor sit amet',
        contact: 'John Doe',
    };

    it('renders the job title', () => {
        const { getByText } = render(<ApplicationCard application={application} />);
        expect(getByText('Software Engineer')).toBeInTheDocument();
    });

    it('renders the company name', () => {
        const { getByText } = render(<ApplicationCard application={application} />);
        expect(getByText('ABC Company')).toBeInTheDocument();
    });

    it('renders the location', () => {
        const { getByText } = render(<ApplicationCard application={application} />);
        expect(getByText('New York')).toBeInTheDocument();
    });

    // it('renders the date applied', () => {
    //     const { getByText } = render(<ApplicationCard application={application} />);
    //     expect(getByText('Date Applied: 2022-01-01')).toBeInTheDocument();
    // });

    it('renders the salary', () => {
        const { getByText } = render(<ApplicationCard application={application} />);
        
        // Find the "View Details" button and click it
        const viewDetailsButton = getByText('View Details');
        fireEvent.click(viewDetailsButton);
    
        // Now the salary should be in the document
        expect(getByText(/.*\| \$100,000/i)).toBeInTheDocument();
    });

    it('renders the job type', () => {
        const { getByText } = render(<ApplicationCard application={application} />);
        
        // Find the "View Details" button and click it
        const viewDetailsButton = getByText('View Details');
        fireEvent.click(viewDetailsButton);
    
        // Now the job type should be in the document
        expect(getByText(/Full-time \| .*/i)).toBeInTheDocument();
    });

    it('renders the description', () => {
        const { getByText } = render(<ApplicationCard application={application} />);

        // Find the "View Details" button and click it
        const viewDetailsButton = getByText('View Details');
        fireEvent.click(viewDetailsButton);

        expect(getByText('Lorem ipsum dolor sit amet')).toBeInTheDocument();
    });

    it('renders the contact', () => {
        const { getByText } = render(<ApplicationCard application={application} />);

        // Find the "View Details" button and click it
        const viewDetailsButton = getByText('View Details');
        fireEvent.click(viewDetailsButton);

        expect(getByText(/Contact: John Doe/i)).toBeInTheDocument();
    });

    it('renders without crashing', () => {
        render(<ApplicationCard />);
    });

    it('renders default props correctly', () => {
        const { getByText } = render(<ApplicationCard />);
        expect(getByText('Job Title')).toBeInTheDocument();
        expect(getByText('Company Name')).toBeInTheDocument();
        expect(getByText('Location')).toBeInTheDocument();
        // expect(getByText('Date Applied: Date Applied')).toBeInTheDocument();
    });

    it('reveals additional details on "View Details" button click', () => {
        const { getByText } = render(<ApplicationCard />);
        const viewDetailsButton = getByText(/View Details/i);
        fireEvent.click(viewDetailsButton);
        expect(getByText('Type | $$$$$$')).toBeInTheDocument();
        expect(getByText('No description given')).toBeInTheDocument();
        expect(getByText('Contact: No contact information given')).toBeInTheDocument();
    });

    it('toggles button text upon clicking', () => {
        const { getByText } = render(<ApplicationCard application={application} />);
        const button = getByText('View Details');
        fireEvent.click(button);
        expect(getByText('Hide Details')).toBeInTheDocument();
        fireEvent.click(button);
        expect(getByText('View Details')).toBeInTheDocument();
    });

    it('renders the correct class names', () => {
        const { container, getByText } = render(<ApplicationCard application={application} />);
        const button = getByText('View Details');
        fireEvent.click(button);
        expect(container.querySelector('.description')).toBeInTheDocument();
        expect(container.querySelector('.jlcard-text')).toBeInTheDocument();
        expect(container.querySelector('.jlcard-hover-text')).toBeInTheDocument();
    });

});
