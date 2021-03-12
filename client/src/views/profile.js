import React from "react";

import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();
  const { nickname, name, picture, email } = user;

  return (
    <div className="card">
      <div className="row align-items-center profile-header">
        <div className="col-md-2 mb-3">
          <img
            src={picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </div>
        <div className="col-md text-center text-md-left text-primary">
          <h2>{nickname}</h2>
          <div className="row">
          <p className="lead text-dark">{email}</p>
          </div>
          <div className="row">
          <p className="lead text-dark col-3">Street Address</p>
          <input className="form-control col-3" placeholder="Enter Street Address"></input>
          </div>
          <div className="row">
          <p className="lead text-dark col-3">City</p>
          <input className="form-control col-3" placeholder="Enter City"></input>
          </div>
          <div className="row">
          <p className="lead text-dark col-3">State</p>
          <input className="form-control col-3" placeholder="Enter State"></input>
          </div>
          <div className="row">
          <p className="lead text-dark col-3">Zip Code</p>
          <input className="form-control col-3" placeholder="Enter Zip Code"></input>
          <div className="col-1"></div>
          <button className="form-control btn btn-success col-1">Submit</button>
        </div>
       
          <div className="col-md text-center text-md-left text-primary">
          <h2>Tickets Owned</h2>
          <p className="lead text-success"></p>
        </div>
        </div>
        <br></br>
      </div>
      
        {/* <pre className="col-12 text-light bg-dark p-4">
          {JSON.stringify(user, null, 2)}
        </pre> */}
      
    </div>
  );
};

export default Profile;