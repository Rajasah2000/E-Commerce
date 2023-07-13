import React, { useState } from "react";

const practice = () => {
  const [inputs, setInputs] = useState([
    {
      name: "",
      age: "",
    },
  ]);

  const changeHandler = (e, i) => {
    setInputs((prev) => {
      let update = JSON.parse(JSON.stringify(prev));
      update[i][e.target.name] = e.target.value;
      return [...update];
    });
  };

  return (
    <div>
      {inputs.map((item, i) => {
        return (
          <>
            <input
              type="text"
              value={item.name}
              onChange={(e) => changeHandler(e, i)}
            />
            <input
              type="number"
              value={item.age}
              onChange={(e) => changeHandler(e, i)}
            />
          </>
        );
      })}
      <button
        onClick={() => {
          setInputs((prev) => {
            let update = JSON.parse(JSON.stringify(prev));
            update.push({
              name: "",
              age: "",
            });
            return [...update];
          });
        }}
      >
        Add
      </button>
    </div>
  );
};

export default practice;
