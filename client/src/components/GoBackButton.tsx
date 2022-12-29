import React from "react";
import { Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowLeft);


function GoBackButton() {
  return (
    <div className="flex-line justify-self-end mr-3">
      <FontAwesomeIcon icon="arrow-left" />
      <Link to="/">Go Back</Link>
    </div>
  );
}

export default GoBackButton;