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
  const [state, setState] = useState(false)
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
                  <i onClick={() => {
                    setTodoValues(toDos.filter(dataServer => {
                      if (dataServer.id === data.id) {
                        dataServer = null
                      }
                      return dataServer;
                    }))
                  }} className="fas fa-times"></i>
                </div>
              </div>
            )
          })
        }
        <p onClick={() => { setState(!state) }} className='bg text-dark times m-custom'>Completed Tasks</p>
        {toDos.map((data2) => {
          if (state) {
            if (data2.status) {
            return (
              <div className='todo success'>
                <p className='m-custom times'>{data2.text}</p>
                <div className="right">
                  <i className="fa">🎉</i>
                </div>
              </div>
            )
            }else {
              return null
            }
          } else {
            return null
          }

        })}

      </div>
    </div>
  );
}

export default App;
