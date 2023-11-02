import React, { useState, useEffect } from "react";
import "./App.css";
import { DataModel, futureCars } from "./data";

function App() {
  
  const initialState = futureCars.map((model) => ({
    ...model,
    isChecked: model.id === 3 || model.id === 5 ? true : false,
  }));

  const [data, setData] = useState<DataModel[]>(initialState);

  const sortData = (arr: DataModel[]) => {
    const checked = arr
      .filter((model) => model.isChecked === true)
      .sort((p1, p2) => (p1.id < p2.id ? -1 : p1.id > p2.id ? 1 : 0));
    const notChecked = arr
      .filter((model) => model.isChecked === false)
      .sort((p1, p2) => (p1.id < p2.id ? -1 : p1.id > p2.id ? 1 : 0));
    arr = [...checked, ...notChecked];
    setData(arr);
    localStorage.setItem("items", JSON.stringify(arr));
  };

  const applyChanges = () => {
    let arr = data;
    sortData(arr);
  };

  const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const currentModelIndex = data.findIndex((model) => model.id === id);

    const updatedModel = {
      ...data[currentModelIndex],
      isChecked: !data[currentModelIndex].isChecked,
    };

    const newData = [...data];
    newData[currentModelIndex] = updatedModel;
    setData(newData);
  };

  useEffect(() => {
    const items = localStorage.getItem("items");
    if (items) {
      setData(JSON.parse(items));
    } else {
      sortData(initialState);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button
          type="button"
          onClick={() => {
            sortData(initialState);
          }}
        >
          Reset
        </button>
        <h2>Future Cars</h2>
        <button type="button" onClick={applyChanges}>
          Apply Changes
        </button>
      </header>
      <div className="list">
        {data.map((model) => (
          <div className="model" key={model.name}>
            <div className="left-part">
              <input
                type="checkbox"
                id={model.name}
                name={model.name}
                value={model.name}
                checked={model.isChecked}
                onChange={(e) => {
                  handleCheckbox(e, model.id);
                }}
              /> 
              <label htmlFor={model.name}> {model.name}</label>
            </div>
            <p> {model.id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
