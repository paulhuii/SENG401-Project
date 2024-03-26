import { render, screen } from "@testing-library/react";

import JobListingCard from "../components/JobListings/JobListingCard";

const dummyJob = {
    _id: '123456789',
}

const dummyJobListing = {
    position: 'Software Engineer',
    company: 'Microsoft',
    location: 'Seattle',
    description: 'Software Engineer at Microsoft',
    email: 'info@microsoft.com',
    jobType: 'Full-time',
    salary: '$100,000 - $120,000',
    job: dummyJob,
};


describe("JobListingCard", () => {
    console.log("TestID: 18.1")

    it("should render same text passed into position prop", () => {
        render(<JobListingCard {...dummyJobListing} />);

        const positionElement =
            screen.getByRole('heading', { name: dummyJobListing.position });

        expect(positionElement).toBeInTheDocument();
    });

    it("should render same text passed into location prop", () => {
        render(<JobListingCard {...dummyJobListing} />);

        const headingElement =
            screen.getByRole('heading', { name: dummyJobListing.location });

        expect(headingElement).toBeInTheDocument();
    });

    it("should render same text passed into description prop", () => {
        render(<JobListingCard {...dummyJobListing} />);

        const paragraphElement = screen.getByText(dummyJobListing.description);

        expect(paragraphElement).toBeInTheDocument();
    });


    it("should render same text passed into email prop", () => {
        render(<JobListingCard {...dummyJobListing} />);

        const headingElement =
            screen.getByRole('heading', { name: "Contact Information: " + dummyJobListing.email });

        expect(headingElement).toBeInTheDocument();
    });

    it("should render same text passed into salary prop", () => {
        render(<JobListingCard {...dummyJobListing} />);

        const headingElement =
            screen.getByRole('heading', { name: "Salary: " + dummyJobListing.salary });

        expect(headingElement).toBeInTheDocument();
    });

    it("should render same text passed into jobType prop", () => {
        render(<JobListingCard {...dummyJobListing} />);

        const headingElement =
            screen.getByRole('heading', { name: dummyJobListing.jobType });

        expect(headingElement).toBeInTheDocument();
    });
})

