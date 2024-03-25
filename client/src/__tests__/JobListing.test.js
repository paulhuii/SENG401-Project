import { render, screen } from "@testing-library/react";

import JobListing from "../components/jobPosting/JobListing"

describe("JobListing Component", () => {

  console.log("TestID: 5.1")

  // Check if JobListing shows the appropriate text for a JobListing given no information
  it("no info given check", () => {
    render(<JobListing />);

    const title = screen.getByText("No position given");
    expect(title).toBeInTheDocument();

    const type = screen.getByText("No job-type given |");
    expect(type).toBeInTheDocument();

    const salary = screen.getByText("No salary information provided");
    expect(salary).toBeInTheDocument();

    const position = screen.getAllByText("No description available");
    expect(position[0]).toBeInTheDocument();
    expect(position[1]).toBeInTheDocument();

    const contact = screen.getByText("Recruiter Contact Info: No contact information provided");
    expect(contact).toBeInTheDocument();

    const button =screen.getByTestId('ApplyPopup')
    expect(button).toBeInTheDocument();

  });

  // Check if JobListing shows appropriate  text when information is given
  it("job detail given check", () => {
    render(<JobListing position="Software Engineer" jobType="Full-time" salary="$120,000" location="Calgary, AB" 
    description="Expert in JS frameworks and Python" email="403-555-5555"/>);

    // Check if JobListing shows the appropriate text for a JobListing given no information
    const title = screen.getByText("Software Engineer");
    expect(title).toBeInTheDocument();

    const type = screen.getByText("Full-time |");
    expect(type).toBeInTheDocument();

    const salary = screen.getByText("$120,000");
    expect(salary).toBeInTheDocument();

    const descriptionCut = screen.getByText("Expert in JS frameworks and Python...");
    expect(descriptionCut).toBeInTheDocument();

    const description = screen.getByText("Expert in JS frameworks and Python");
    expect(description).toBeInTheDocument();

    const contact = screen.getByText("Recruiter Contact Info: 403-555-5555");
    expect(contact).toBeInTheDocument();

    const button =screen.getByTestId('ApplyPopup')
    expect(button).toBeInTheDocument();

  });
});