import React from "react";
import { AyrContextInterface } from "../interfaces/UserInterface";

const AyrContext = React.createContext<AyrContextInterface | null>(null);

export default AyrContext;