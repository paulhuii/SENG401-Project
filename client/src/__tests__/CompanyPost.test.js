import React from 'react';
import {render, screen, waitFor, within} from '@testing-library/react';
import CompanyPost from "../CompanyPost";
import { BrowserRouter as Router } from 'react-router-dom';
import user from '@testing-library/user-event'


const dummyJobData = {
    title: 'Software Engineer',
    jobType: 'Full-time',
    location: 'Canada',
    salary: '100,000',
    contact: 'James@company.com',
    description: 'Software engineer role',
    postedBy: ''
};

function getJobTitle() {
    return screen.getByRole('textbox', {
        name: /Job Title/i
    });
}

function getJobType(jobType) {
    const dropdown = screen.getByRole('combobox', { name: /Job Type/i});
    user.selectOptions(
        dropdown,
        within(dropdown).getByRole('option', {name: jobType})
    );
}

function getLocation() {
    return screen.getByRole('textbox', {
        name: /Location/i
    });
}

function getSalary() {
    return screen.getByRole('textbox', {
        name: /Salary/i
    });
}

function getContactInfo() {
    return screen.getByRole('textbox', {
        name: /Contact Information/i
    });
}

function getDescription() {
    return screen.getByRole('textbox', {
        name: /description/i
    })
}

// Mock react router dom useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('CompanyPost', () => {
    console.log("TestID: 5.2")
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    beforeEach(() => {
        window.localStorage.clear();
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
            <Router>
                <CompanyPost/>
            </Router>
        );
    });

    afterAll(() =>{
        errorSpy.mockRestore();
    });

    it('onSubmit when all correct fields are entered should pass', async () => {
        // Spy on console.error to suppress specific warnings
        

        const navigate = jest.fn();
        jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(navigate);

        const data = {"_id":"6603595d86c8672453b281b9"};
        localStorage.setItem('user', JSON.stringify(data));

        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(JSON.stringify(dummyJobData)),
        });

        user.type(getJobTitle(), dummyJobData.title)
        getJobType(dummyJobData.jobType)
        user.type(getLocation(), dummyJobData.location)
        user.type(getSalary(), dummyJobData.salary)
        user.type(getContactInfo(), dummyJobData.contact)
        user.type(getDescription(), dummyJobData.description)

        user.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() => expect(navigate).toHaveBeenCalledWith('/CompanyDashboard', {
            state: {
                jobPosted: true,
                jobData: JSON.stringify(dummyJobData),
            }
        }));
    });
});
