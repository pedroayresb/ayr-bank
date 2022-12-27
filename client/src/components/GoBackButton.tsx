import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconLookup,
  IconDefinition,
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core'

const coffeeLookup: IconLookup = { prefix: 'fas', iconName: 'arrow-left' }
const coffeeIconDefinition: IconDefinition = findIconDefinition(coffeeLookup);



function GoBackButton() {
  return (
    <div className="flex-line justify-self-end mr-3">
      <FontAwesomeIcon icon={ coffeeIconDefinition }/>
      <Link to="/">  Go Back</Link>
    </div>
  );
}

export default GoBackButton;