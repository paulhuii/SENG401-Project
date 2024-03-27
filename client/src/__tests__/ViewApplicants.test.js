
import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ViewApplicants from '../components/ViewApplicants/ViewApplicants';

const dummyApplicants = [
    {
        name: 'Mia Lewis',
        email: 'MiaLewis@email.com',
        gender: 'Female',
        description: 'Hi i\'m Mia',
        resumeLink: '',
    },
    {
        name: 'Lucas Anderson',
        email: 'LucasAnderson@email.com',
        gender: 'Male',
        description: 'Hi i\'m Lucas',
        resumeLink: '',
    },
];


describe('ViewApplicants', () => {
    console.log("TestID: 17.1")

    /**
     * Before each test mock the useEffect function, force the promise to resolve, and pass into setApplicants the
     * dummy applicant data
     */
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(dummyApplicants),
        });
    });


    it('renders the name of applicants', async () => {

        render(<ViewApplicants jobID="123" />);

        // Wait for fetch and information in document
        await waitFor(() => {
            const nameElement =
                screen.getByRole('heading', { name: "Applicant Name: " + dummyApplicants[0].name});

            expect(nameElement).toBeInTheDocument();
        });


        await waitFor(() => {
            const nameElement =
                screen.getByRole('heading', { name: "Applicant Name: " + dummyApplicants[1].name});

            expect(nameElement).toBeInTheDocument();
        });
    });


    it('renders the email of applicants', async () => {

        render(<ViewApplicants jobID="123" />);

        // Wait for fetch and information in document
        await waitFor(() => {
            const emailElement =
                screen.getByRole('heading', { name: "Email: " + dummyApplicants[0].email});

            expect(emailElement).toBeInTheDocument();
        });


        await waitFor(() => {
            const emailElement =
                screen.getByRole('heading', { name: "Email: " + dummyApplicants[1].email});

            expect(emailElement).toBeInTheDocument();
        });
    });


    it('renders the gender of applicants', async () => {

        render(<ViewApplicants jobID="123" />);

        // Wait for fetch and information in document
        await waitFor(() => {
            const genderElement =
                screen.getByRole('heading', { name: "Gender: " + dummyApplicants[0].gender});
            expect(genderElement).toBeInTheDocument();
        });
        await waitFor(() => {
            const genderElement =
                screen.getByRole('heading', { name: "Gender: " + dummyApplicants[1].gender});
            expect(genderElement).toBeInTheDocument();
        });
    });


    it('renders the description of applicants', async () => {

        render(<ViewApplicants jobID="123" />);

        // Wait for fetch and information in document
        await waitFor(() => {
            const descriptionElement =
                screen.getByText(dummyApplicants[0].description);

            expect(descriptionElement).toBeInTheDocument();
        });


        await waitFor(() => {
            const descriptionElement =
                screen.getByText(dummyApplicants[1].description);

            expect(descriptionElement).toBeInTheDocument();
        });
    });
});
