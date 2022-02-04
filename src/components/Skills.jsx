import { useEffect, useState } from "react";
import axios from 'axios';

export const Skills = () => {
  const [data, setData] = useState(null);
  console.log(data);
  // useEffect(() => { axios.get('https://api.github.com/users/USER_NAME/repos').then((response) => console.log(response)) }, []);
  useEffect(() => {axios.get('https://api.github.com/users/USER_NAME/repos').then((response) => setData(response)) }, []);
  return (
    <div id="skills">
      <div className="container">
        <div className="heading">
          <h2>Skills</h2>
        </div>
        <div className="skills-container">
        </div>
      </div>
    </div>
  );
};