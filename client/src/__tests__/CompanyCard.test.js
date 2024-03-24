import { render, fireEvent } from '@testing-library/react';
import CompanyCard from '../components/Cards/CompanyCard.js';

describe('CompanyCard', () => {
  const company = {
    name: 'Tech Company',
    location: 'Remote',
    email: 'info@techcompany.com',
  };

  it('renders without crashing', () => {
    render(<CompanyCard company={company} />);
  });

  it('renders company details correctly', () => {
    const { getByText } = render(<CompanyCard company={company} />);
    expect(getByText('Tech Company')).toBeInTheDocument();
    expect(getByText('Remote')).toBeInTheDocument();
    expect(getByText('Email: info@techcompany.com')).toBeInTheDocument();
  });

  it('toggles follow button text upon clicking', () => {
    const { getByText } = render(<CompanyCard company={company} />);
    const button = getByText('Followed'); 
    fireEvent.click(button);
    expect(getByText('Follow')).toBeInTheDocument();
    fireEvent.click(button);
    expect(getByText('Followed')).toBeInTheDocument();
  });

  it('renders the View Profile button', () => {
    const { getByText } = render(<CompanyCard company={company} />);
    const button = getByText('View Profile');
    expect(button).toBeInTheDocument();
  });

  it('renders the correct class names', () => {
    const { container } = render(<CompanyCard company={company} />);
    expect(container.firstChild).toHaveClass('card-db');
    expect(container.querySelector('.card-body')).toHaveClass('recruiter');
  });

  it('renders the View Profile button with the correct class name', () => {
    const { getByText } = render(<CompanyCard company={company} />);
    const button = getByText('View Profile');
    expect(button).toHaveClass('btn', 'btn-primary');
  });

  it('renders the Follow button with the correct class name', () => {
    const { getByText } = render(<CompanyCard company={company} />);
    const button = getByText('Followed');
    expect(button).toHaveClass('btn', 'btn-primary');
  });

  it('renders default company details correctly', () => {
    const { getByText } = render(<CompanyCard />);
    expect(getByText('Company Name')).toBeInTheDocument();
    expect(getByText('Location')).toBeInTheDocument();
    expect(getByText('Email: Email')).toBeInTheDocument();
  });
  
  
});