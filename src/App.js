import React, { useState } from 'react';
import './App.css';

function App() {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeClass = ["Midnight", "Midnight", "Midnight", "Midnight", "Early Morning", "Early Morning", "Early Morning", "Morning",
    "Morning", "Morning", "Late Morning", "Late Morning", "Noon", "Noon", "Noon", "Evening", "Evening", "Evening", "Evening",
    "Night", "Night", "Night", "Late Night", "Late Night"];
  let d = new Date();
  let day = weekday[d.getDay()];
  let time = timeClass[d.getHours()];

  const [toDo, setTodo] = useState('')
  const [toDos, setTodoValues] = useState([])

  return (
    <div className="app">
      <div className='title'>
        <h1 className='times' >Welcome Back, <br /> It's {day} {time}<br /> And you're here ? <br /> What's Up? </h1>
      </div>
      <div className="input">
        <input type="text" value={toDo} onChange={((e) => setTodo(e.target.value))} placeholder="🖊️ Add Something Here..." />
        <i onClick={() => setTodoValues([...toDos, { id: Date.now(), text: toDo, status: false }])} className="fas fa-plus"></i>
      </div>
      <div className="todos">
        <h3 className="bg times">Your To Do List</h3>
        {
          toDos.map((data) => {
            return (
              <div className="todo">
                <div className="left">
                  <input onChange={(e) => {
                    console.log('value if checked', e.target.checked)
                    console.log('value from server/old/before update', data)
                    setTodoValues(toDos.filter(dataServer => {
                      if (dataServer.id === data.id) {
                        dataServer.status = e.target.checked
                      }
                      console.log('Value after Check', dataServer)
                      return dataServer;
                    }))
                  }} value={data.status} type="checkbox" />
                  <p key={data.id}>{data.text}</p>
                </div>
                <div className="right">
                  <i className="fas fa-times"></i>
                </div>

              </div>
            )
          })
        }
        {toDos.map((data2) => {
          if (data2.status) {
            return (
              <h1>{data2.text}</h1>
            )
          }else{
            return null
          }

        })}
      </div>
    </div>
  );
}

export default App;
