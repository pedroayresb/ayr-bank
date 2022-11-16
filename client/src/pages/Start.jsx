import React, { useCallback, useState, useEffect } from "react";
import Axios from 'axios';

function Start() {
  const [user, setUser] = useState({});
  const [isLogged, setIsLogged] = useState(false);

  return ( 
    <div>
      <h1>Start</h1>
      {isLogged ? <h2>Logged in</h2> : <h2>Not logged in</h2>}
    </div>
   );
}

export default Start;