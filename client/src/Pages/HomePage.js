import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Model from "../components/shared/Model/Model";
import API from "../services/api";

const HomePage = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [data, setData] = useState();

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
        // console.log("data", data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);
  return (
    <>
      <Layout>
        {error && <span>{alert(error)}</span>}

        {loading ? (
          <Spinner />
        ) : (
          <>
            <h4
              className="ms-4"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-plus text-success py-4"></i> Add
              Inventorye
            </h4>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Blood Group</th>
                  <th scope="col">Inventory Type</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Donar Email</th>
                  <th scope="col">Time & Date</th>
                </tr>
              </thead>
              <tbody>
              {
                data?.map((item) => {
                  return (
                    <tr>
                      <td>{item.bloodGroup}</td>
                      <td>{item.inventoryType}</td>
                      <td>{item.quantity} ML</td> 
                      <td>{item.donarEmail}</td>
                      <td>{item.createdAt}</td>
                    </tr>
                  )
               } )
              }
              </tbody>
            </table>

            <Model />
          </>
        )}
      </Layout>
    </>
  );
};

export default HomePage;
