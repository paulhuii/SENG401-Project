import { render, screen } from "@testing-library/react";

import JobListing from "../components/jobPosting/JobListing"

describe("JobListing Component", () => {
  /* Test block component: */
  it("should say that no title was given", () => {
    /* Render what we want to test */
    render(<JobListing />);

    const title = screen.getByText("No position given");
    expect(title).toBeInTheDocument();

  });
});