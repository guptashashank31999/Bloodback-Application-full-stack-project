import React, { useState } from "react";
import API from "../../../services/api";
import { useSelector } from "react-redux";

const Model = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState();
  const [donarEmail, setDonarEmail] = useState("");

  const { user } = useSelector((state) => state.auth);


  const handleModelSubmit = async () => {
    try {
      if (!bloodGroup || !quantity) {
        return alert("Please provide all fileds");
      } else {
        const { data } = await API.post("/inventory/create-inventory", {
          donarEmail,
          email: user?.email,
          orginisation: user?._id,
          inventoryType,
          bloodGroup,
          quantity,
        });

        if(data?.success){
            alert("New Record Created");
            window.location.reload();
        }
      }
    } catch (error) {
        console.log('Error');
        alert("Error occure",error);
        // window.location.reload();
    }
  };

  return (
    <>
      {/* <!-- Modal --> */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>

            <div className="modal-body">
              <div className="d-flex">
                Blood Type : &nbsp;
                <div className="form-check ms-2">
                  <input
                    type="radio"
                    name="inRadio"
                    defaultChecked
                    className="form-check-input"
                    value={"in"}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label htmlFor="in" className="form-form-check-label">
                    IN
                  </label>
                </div>
                <div className="form-check ms-2">
                  <input
                    type="radio"
                    name="inRadio"
                    defaultChecked
                    className="form-check-input"
                    value={"out"}
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label htmlFor="in" className="form-form-check-label">
                    OUT
                  </label>
                </div>
              </div>
              <div className="input-group mb-3 mt-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
                  {/* "O", "AB+", "AB-", "A+", "A-", "B+", "B- */}
                  <option defaultValue={'Select Blood Group'}>Select Blood Group</option>
                  <option value={"O"}>O</option>
                  <option value={"AB+"}>AB+</option>
                  <option value={"AB-"}>AB-</option>
                  <option value={"A+"}>A+</option>
                  <option value={"A-"}>A-</option>
                  <option value={"B+"}>B+</option>
                  <option value={"B-"}>B-</option>
                </select>
              </div>

              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  value={donarEmail}
                  onChange={(e) => setDonarEmail(e.target.value)}
                  placeholder="Donar Email"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
              </div>

              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Enter Quantity"
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModelSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
