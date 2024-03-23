import { render, screen } from "@testing-library/react";
import ApplyPopup from "../components/jobPosting/ApplyPopup";

describe("JobListing Component", () => {
    // Check if the button is appropriately formatted and disabled for non-job seekers
  it("not a job seeker check", () => {
    render(<ApplyPopup/>)

    const seeker = screen.getByTestId("ApplyPopup");
    expect(seeker.innerHTML).toBe("Log in as a Job Seeker to apply!");
    expect(seeker).toHaveAttribute('disabled');
  });

});