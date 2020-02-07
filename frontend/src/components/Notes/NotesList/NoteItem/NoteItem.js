import React from 'react';
import './NoteItem.css';
const eventItem = props => (
    <li key= {props.eventId} className="notes-list-item">
       <div> 
           <h1>{props.title}</h1>
<h2>{props.description}</h2>
       </div>
        <div>
            <button className ="btn">
                Delete the Note
            </button>
{props.userId === props.creatorId? <div><p>You created this note</p> <p>at {props.date}</p> </div>: <div><p>{props.creatorEmail} created this note </p> <p>at {props.date}</p></div>}
        </div>
    </li>
);

export default eventItem;