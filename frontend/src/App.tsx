import React from "react";
import { useState } from "react";

import "./App.css";
import ErrorModal from "./components/ErrorModal";
import BootstrapModal from "./components/BootstrapModal";

type FormData = {
  name: string;
  cnumber: number;
  exp: Date;
  cvv: number;
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  const checkForm = async () => {
    setIsLoading(true);

    try {
      const name = (document.getElementById("name") as HTMLInputElement).value;

      const cnumber = +(
        document.getElementById("card-number") as HTMLInputElement
      ).value;

      const date = (document.getElementById("exp-date") as HTMLInputElement)
        .value;
      const [year, month] = date.split("-");
      const exp = new Date(+year, +month - 1, 1);

      const cvv = +(document.getElementById("cvv") as HTMLInputElement).value;

      const formData: FormData = {
        name,
        cnumber,
        exp,
        cvv,
      };

      if (import.meta.env.VITE_API_URL !== undefined) {
        const response = await fetch(import.meta.env.VITE_API_URL, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseData = await response.json();

        if (!response.ok) {
          setIsLoading(false);
          return setErrorMessage(responseData.message);
        }

        setIsLoading(false);
        setIsApproved(true);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage((error as Error).message);
      throw new Error((error as Error).message);
    }
  };

  return (
    <React.Fragment>
      <div className="card-div">
        {isLoading && (
          <div className="loading-div">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        )}
        {errorMessage && (
          <ErrorModal
            message={errorMessage}
            onClose={() => setErrorMessage("")}
          />
        )}
        {isApproved && (
          <BootstrapModal
            header="Congratulations"
            message={"Card succesfully approved!"}
            onClose={() => setIsApproved(false)}
          />
        )}
        <h2>Pay with credit card</h2>
        <hr />
        <label htmlFor="name">Name</label>
        <br />
        <input type="text" id="name" />
        <br />
        <br />
        <label htmlFor="card-number">Card number</label>
        <br />
        <input type="number" id="card-number" />
        <br />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-6">
              <label htmlFor="exp-date">Expiration date</label>
              <input type="month" name="" id="exp-date" />
            </div>
            <div className="col-6">
              <label htmlFor="cvv">CVV</label>
              <input type="number" id="cvv" />
            </div>
          </div>
        </div>
        <br />
        <button onClick={checkForm} className="submit-button">
          Submit credit card
        </button>
      </div>
    </React.Fragment>
  );
}

export default App;
