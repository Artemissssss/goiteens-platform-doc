import React from 'react';
import { useData } from "../../../theme/Root";

function Task() {
    const { data, setData } = useData();
    const submitTask = (e) =>{
        e.preventDefault();
        if(data.status === 3){
            fetch(`https://goiteens-platform.vercel.app/api/readytask`, {
                method: 'POST',
                body: JSON.stringify({"idRoom":data.idRoom,"task":{"text":e.target[0].value,"answer":e.target[1].value,"login":data.login}}),
                headers: {
                  'Content-Type': 'application/json'
                }})
        }
            e.target.reset()
    }

  return (
    <form onSubmit={submitTask}>
        <input type="text" defaultValue={"Перепиши слово 'так'"} readOnly/>
        <input type="text" placeholder="Місце для написання" required/>
        <button>Submit</button>
    </form>
  )
}
export default Task