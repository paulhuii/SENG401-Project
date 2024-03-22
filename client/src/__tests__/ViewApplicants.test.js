import { render, screen } from "@testing-library/react";

import ViewApplicants from "../components/ViewApplicants/ViewApplicants";

describe("ViewApplicants", () => {
  /* Test block component: */
  it("should have gender text", () => {
    /* Render what we want to test */
    render(<ViewApplicants />);

    const gender = screen.getByText("Gender: Female");
    expect(gender).toBeInTheDocument();

  });
});