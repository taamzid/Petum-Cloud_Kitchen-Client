import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
} from "mdb-react-ui-kit";
import { FaTrash } from "react-icons/fa";
import { Button } from "react-bootstrap";

const MyReviews = () => {
  const [revw, setRevw] = useState([]);
  const { user } = useContext(AuthContext);

  //   const handleDelete = (id) => {
  //     const proceed = window.confirm("Are you sure to delete?");
  //     if (proceed) {
  //       fetch(`http://localhost:5000/reviews/${id}`, {
  //         method: "DELETE",
  //       })
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //         });
  //     }
  //   };

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        setRevw(data);
        console.log(data);
      });
  }, []);

  return (
    <div>
      <h3 className="text-center">My Reviews</h3>
      {user?.uid ? (
        <MDBContainer className="py-5 mr-4">
          <MDBRow className="text-center">
            <MDBCol md="4" className="mb-5 mr-4 mb-md-0">
              {revw.map((r) =>
                user?.uid === r.uid ? (
                  <div>
                    <MDBCard className="testimonial-card">
                      <div
                        className="card-up"
                        style={{ backgroundColor: "#7a81a8" }}
                      ></div>
                      <div className="avatar mx-auto bg-white">
                        <img
                          src={r.image}
                          className="rounded-circle img-fluid"
                          alt="p"
                        />
                      </div>
                      <MDBCardBody>
                        <h4 className="mb-4">{r.name}</h4>
                        <hr />
                        <p>{r.serviceName}</p>
                        <p className="dark-grey-text mt-4">
                          <MDBIcon fas icon="quote-left" className="pe-2" />
                          {r.description}
                        </p>
                        <Button>X</Button>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                ) : (
                  <div></div>
                )
              )}
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default MyReviews;
