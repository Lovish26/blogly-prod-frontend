import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const override = {
  display: "block",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translateX(-50%)",
  borderColor: "red",
  textAlign: "center",
};

const Spinner = () => {
  return (
    <ScaleLoader
      // loading={loading}
      size={150}
      cssOverride={override}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default Spinner;
