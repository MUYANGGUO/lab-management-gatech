import React from 'react';
import NoteItem from './NoteItem/NoteItem';
import './NoteList.css';
const eventList = props => {
    const events = props.events.map(event=>{
        return <NoteItem key={event._id} 
        eventId = {event._id} 
        title = {event.title}
        date = {event.date}
        description = {event.description}
        userId={props.authUserId}
        creatorId = {event.creator._id}
        creatorEmail = {event.creator.email}/>
        });
    return (<ul className="note_list">{events}</ul>)
};

export default eventList;