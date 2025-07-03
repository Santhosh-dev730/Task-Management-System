import { useState } from "react";
import "bulma/css/bulma.min.css";
import "./App.css";
import { v4 as uuid } from 'uuid';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash,faCalendarDays} from '@fortawesome/free-solid-svg-icons'
import Datepicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function App() {
  const [task, setTask] = useState({
    id: uuid(),
    task_date: "",
    task_title: "",
    task_deadline: "",
    task_assign: "",
    task_acknowledge: "",
  });

  const [tasks, setTasks] = useState([]);

  const [buttonState,setButtonState] = useState("Submit")

  const handleChange = (event) => {
    const { name, value } = event.target;
   
    setTask((currInfo) => ({
      ...currInfo,
      [name]: value,
    }));
  };

  const addData = (event) => {
    event.preventDefault(); 
    setTasks((currTasks) => [...currTasks, task]); 
    toast.success("Task added successfully!", { position: "top-center",autoClose: 3000,});
    setTask({
      id: uuid(),
      task_date: "",
      task_title: "",
      task_deadline: "",
      task_assign: "",
      task_acknowledge: "",
    });
  };

  const editData = (task) => {
    setTask(task);
    setButtonState("Update Changes")
  };

  const updateData = (event) => {
    event.preventDefault();
    setTasks((changes) => {
      return changes.map((user) => {
        if(user.id == task.id)
          return task;
        else
          return user;
      });
    });
    toast.success("Task Updated successfully!", { position: "top-center",autoClose: 3000,});
    cancelData();
  }

  const cancelData = () => {
    setTask({
      id: uuid(),
      task_date: "",
      task_title: "",
      task_deadline: "",
      task_assign: "",
      task_acknowledge: "",
    });
    setButtonState("Submit")
  }

  const deleteData = (id) => {
    console.log(setTasks)
    toast.success("Task Deleted successfully!", { position: "top-center",autoClose: 3000,});
    setTasks((currTasks) => {
      return currTasks.filter((user) => {
        return user.id !== id
      })
    })
  }


  return (
    <div className="container is-fluid mt-4">
      <ToastContainer />
      <div className="box">
      <h1 className="has-text-centered is-size-3 has-text-weight-bold mb-4">Task Management System</h1>
          <form>
            <div className="field">
              <label className="label">Date</label>
              <p className="control has-icons-left date-field">
                  <span className="icon is-small is-left">
                    {/* <FontAwesomeIcon icon={faCalendarDays} /> */}
                  </span>
                  {/* <Datepicker className="input" style="date-field" value={task.task_date} onChange={handleChange}/> */}
                </p>
                <input
                  className="input"
                  type="date"
                  name="task_date"
                  value={task.task_date}
                  onChange={handleChange}
                />
            </div>

            <div className="field">
              <label className="label">Task Title</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="task_title"
                  value={task.task_title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Deadline</label>
              <div className="control">
                <input
                  className="input"
                  type="date"
                  name="task_deadline"
                  value={task.task_deadline}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Assigned By</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="task_assign"
                  value={task.task_assign}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Acknowledgement</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="task_acknowledge"
                  value={task.task_acknowledge}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="control">
              {
              buttonState==="Submit" ? 
                (
                <button className="button is-primary" onClick={addData}>Submit</button>
                ) :
                (
                  <div className="buttons">
                    <button className="button is-primary" onClick={updateData}>Save Changes</button> 
                    <button className="button" onClick={cancelData}>Cancel</button>
                  </div>
                )
              }
            </div>
          </form>
          </div>

          {tasks.length > 0 && (
            <table className="table is-striped is-bordered is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th>Date</th>
                <th>Task Title</th>
                <th>Deadline</th>
                <th>Assigned By</th>
                <th>Acknowledgement</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{task.task_date}</td>
                  <td>{task.task_title}</td>
                  <td>{task.task_deadline}</td>
                  <td>{task.task_assign}</td>
                  <td>{task.task_acknowledge}</td>
                  <td>
                    <div className="buttons">
                        <button
                        className="button is-link"
                        onClick={() => editData(task)}>
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                        <button className="button is-danger" onClick={() =>deleteData(task.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
          
        </div>
  );
}

export default App;
