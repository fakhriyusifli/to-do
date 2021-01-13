import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  //state of the tasks
  const [itemsState, setItems] = useState({
    items: [],
  });

  //sorting items array with useEffect hook
  useEffect(() => {
    itemsState.items.sort(function (a, b) {
      return new Date(b.enddate) - new Date(a.enddate);
    });
  });

  //react hook form
  const { register, handleSubmit, errors, reset } = useForm();

  //for handling submit and add new task object to the items array
  const onSubmit = (data) => {
    setItems({ items: [...itemsState.items, data] });
    reset();
  };

  //for deleting tasks
  const handleDelete = (index) => {
    const items = [...itemsState.items];

    items.splice(index, 1);
    setItems({ items: items });
  };

  //for handling status change in the tasks
  const changedHandler = (e, index) => {
    const item = { ...itemsState.items[index] };
    item.status = e.target.value;

    const items = [...itemsState.items];
    items[index] = item;

    setItems({ items: items });
  };

  const tasks = itemsState.items.map((item, index) => {
    return (
      <li className="list" key={index}>
        <h2>Task: {item.title}</h2>
        <p>Description: {item.description}</p>
        <p>Start Date: {item.startdate}</p>
        <p>End Date: {item.enddate}</p>
        <p>
          Status:
          <select
            className="done-task-input"
            name="status"
            value={item.status}
            onChange={(e) => changedHandler(e, index)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </p>
        <p>Priority: {item.priority}</p>
        <p>Responsible Person: {item.responsibleperson}</p>
        <button onClick={() => handleDelete(index)}>Delete Task</button>
      </li>
    );
  });

  return (
    <div className="App">
      <Header />
      <div className="Container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="title"
            type="text"
            placeholder="Title"
            ref={register({ required: true })}
          />
          {errors.title && errors.title.type === "required" && (
            <span>This field is required</span>
          )}
          <textarea
            name="description"
            rows="5"
            placeholder="Description"
            ref={register({ required: true, minLength: 10 })}
          />
          {errors.description && errors.description.type === "required" && (
            <span>This field is required</span>
          )}
          {errors.description && errors.description.type === "minLength" && (
            <span>This field is required min length of 10</span>
          )}
          <label htmlFor="startDate">
            Start Date:
            <input
              name="startdate"
              className="tiny"
              id="startDate"
              type="date"
              ref={register({ required: true })}
            />
          </label>
          <label htmlFor="endtDate">
            End Date:
            <input
              name="enddate"
              className="tiny"
              id="endDate"
              type="date"
              ref={register({ required: true })}
            />
          </label>
          <label htmlFor="status">
            Status:
            <select
              className="tiny"
              name="status"
              id="status"
              ref={register({ required: true })}
            >
              <option value="">Select...</option>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {errors.status && errors.status.type === "required" && (
              <span>This field is required</span>
            )}
          </label>
          <label htmlFor="priority">
            Priority:
            <select
              className="tiny"
              name="priority"
              id="priority"
              ref={register({ required: true })}
            >
              <option value="">Select...</option>
              <option value="High">Hight</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            {errors.priority && errors.priority.type === "required" && (
              <span>This field is required</span>
            )}
          </label>
          <label htmlFor="responsibleperson">
            Responsible Person:
            <select
              className="tiny"
              name="responsibleperson"
              id="responsibleperson"
              ref={register({ required: true })}
            >
              <option value="">Select...</option>
              <option value="Jessy">Jessy</option>
              <option value="Heisenberg">Heisenberg</option>
              <option value="Saul">Saul</option>
              <option value="Todd">Todd</option>
            </select>
            {errors.responsibleperson &&
              errors.responsibleperson.type === "required" && (
                <span>This field is required</span>
              )}
          </label>

          <button type="submit">Add Task</button>
        </form>
        <ul>{tasks}</ul>
      </div>
    </div>
  );
}

export default App;
