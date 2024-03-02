import React from 'react';
import { BsTrash3Fill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

const JobListingCard = () => {
    return (
        <div className="container-fluid shadow rounded p-3 mb-3">
            <div className="row">
                <div className="col d-flex justify-content-between">
                    <h4>Job Title: Full Stack Developer</h4>

                    <div className="row">
                        <div className="col">
                            <button type="button" className="btn btn-warning text-white me-2" >
                                <FaEdit />
                            </button>
                            <button type="button" className="btn btn-danger">
                                <BsTrash3Fill/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <h5>Location: Calgary Alberta Canada</h5>

            <div className="row">
                <div className="col d-flex">
                    <h6 className="shadow-sm p-2 rounded bg-primary me-2 text-white">Full Time</h6>
                    <h6 className="shadow-sm p-2 rounded bg-primary text-white">Commission</h6>
                </div>
            </div>

            <h5>Contact Information: this_company@gmail.com</h5>

            <h5>Description</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, adipisci aliquid
                aperiam consectetur, exercitationem fuga, fugit illum maxime quaerat qui
                quisquam saepe ut. Ipsa itaque nisi placeat possimus quam tempore!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, aut beatae
                deleniti dolorum ea, facilis fugiat illum iure magni numquam praesentium
                quaerat, quas quidem quos ratione repellat sapiente sint? Excepturi.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, fugiat,
                reiciendis. Accusantium autem deserunt doloribus enim eveniet exercitationem in
                ipsum labore nobis officia provident quas quis, suscipit vel veritatis, vitae.
            </p>
        </div>
    )
}

export default JobListingCard