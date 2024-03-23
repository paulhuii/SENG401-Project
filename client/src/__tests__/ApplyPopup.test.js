import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ApplyPopup from "../components/jobPosting/ApplyPopup";

describe("ApplyPopup Component", () => {

    console.log("TestID: 6.1")

    // Suppress error logs when calling backend functions with no server running
    let errorSpy;
    beforeAll(() => {
        // Mock console.error to suppress error messages
        errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterAll(() => {
        // Restore console.error
        errorSpy.mockRestore();
    });

  // Check if the button is appropriately formatted and disabled for non-job seekers
  it("not a job seeker check", () => {
    render(<ApplyPopup/>)

    const applyButton = screen.getByTestId("ApplyPopup");
    expect(applyButton.innerHTML).toBe("Log in as a Job Seeker to apply!");
    expect(applyButton).toHaveAttribute('disabled');
  });


  // Check if it renders modal content when button is clicked as a Job Seeker that has yet to apply
  it('Job Seeker can apply check', () => {
    // user data stub, we only use their role here
    const user = {'role':"Job Seeker"};
    const position = "Engineer at Aperture Science Enrichment Center";
    render(<ApplyPopup jobID="" position={position} applied={false} user={user}/>);

    // Find the button
    const applyButton = screen.getByTestId('ApplyPopup');
    expect(applyButton.innerHTML).toBe("Apply");

    // Click the button to open the modal
    fireEvent.click(applyButton);

    // // Assert that all modal content is rendered
    expect(screen.getByText("Apply for Engineer at Aperture Science Enrichment Center")).toBeInTheDocument();
    
    const modalText = screen.getByTestId('ApplyPopupBody');
    expect(modalText.innerHTML).toBe("<p>Are you sure you want to apply for the position of <strong>Engineer at Aperture Science Enrichment Center</strong>?</p>");
    
    const sendButton = screen.getByTestId("ApplyPopupSendButton");
    expect(sendButton).toBeInTheDocument();
    expect(sendButton.innerHTML).toBe("Confirm Application");
    
    const cancelButton = screen.getByTestId("ApplyPopupCancelButton");
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton.innerHTML).toBe("Cancel");
  });

    // Check if it renders modal content when button is clicked as a Job Seeker that has already applied
    it('Job Seeker has applied check', () => {
        // user data stub, we only use their role here
        const user = {'role':"Job Seeker"};
        const position = "Engineer at Aperture Science Enrichment Center";
        render(<ApplyPopup jobID="" position={position} applied={true} user={user}/>);
    
        // Find the button
        const applyButton = screen.getByTestId('ApplyPopup');
        expect(applyButton.innerHTML).toBe("Applied");
    
        // Click the button to open the modal
        fireEvent.click(applyButton);
    
        // Assert that all modal content is rendered
        expect(screen.getByText("Apply for Engineer at Aperture Science Enrichment Center")).toBeInTheDocument();
        
        const modalText = screen.getByTestId('ApplyPopupBody');
        expect(modalText.innerHTML).toBe("<p>Are you sure you want to apply for the position of <strong>Engineer at Aperture Science Enrichment Center</strong>?</p>");
        
        const sendButton = screen.getByTestId("ApplyPopupSendButton");
        expect(sendButton).toBeInTheDocument();
        expect(sendButton.innerHTML).toBe("Application Sent!");
        
        const cancelButton = screen.getByTestId("ApplyPopupCancelButton");
        expect(cancelButton).toBeInTheDocument();
        expect(cancelButton.innerHTML).toBe("Cancel");
      });

  // Test if the sendApply occurs when button pressed
  it('tests sendApply', async () => {

    // Mock localStorage
    const mockLocalStorage = {
      getItem: jest.fn().mockReturnValue('mockToken')
    };
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

    // Mock the fetch function
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });

    // Render the component with necessary props
    const user = { role: "Job Seeker" };
    const position = "Engineer at Aperture Science Enrichment Center";
    render(<ApplyPopup jobID="mockJobID" position={position} applied={false} user={user} />);

    // Find the apply button and click it
    const applyButton = screen.getByTestId('ApplyPopup');
    fireEvent.click(applyButton);

    // Find the send application button and click it
    const sendButton = screen.getByText('Confirm Application');
    fireEvent.click(sendButton);

    // Wait for fetch to be called
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(`/api/jobs/apply/mockJobID`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mockToken'
        }
      });
    });
  });

});