import "./ViewApplicants.css"
import { IoMdDownload } from "react-icons/io";
import {Button} from "react-bootstrap";

const ViewApplicants = () => {
    return (
        <div className="container-fluid shadow p-3 mb-3">
            <div className="row">
                <div className="col">
                    <div className="d-flex align-items-center justify-content-between">
                        <h6>Applicant Name: Jane Doe</h6>
                        <Button className="d-flex align-items-center" variant="outline-success" href="/underdevelopment">
                            <div className="me-2">
                                Resume
                            </div>
                            <IoMdDownload />
                        </Button>
                    </div>

                    <h6>Email: janedoe@gmail.com</h6>
                    <h6>Gender: Female</h6>
                    <h6>Description:</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        A adipisci at cumque dolore eaque, enim incidunt iure magnam
                        modi molestias numquam provident rerum saepe sapiente similique tempore vel.
                        Iusto, nemo.
                    </p>
                </div>
            </div>
        </div>
    )
};

export default ViewApplicants