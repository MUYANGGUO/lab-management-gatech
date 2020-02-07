import React, { Component } from 'react';
import Modal from '../components/Modal/Modal';
import Backdrop from '../components/Backdrop/Backdrop';
import AuthContext from '../context/auth-context';
import EventList from '../components/Notes/NotesList/NoteList';
import './Notes.css'

class EventsPage extends Component {
    state = {
        creating: false,
        events: []
    };
    static contextType = AuthContext;

    constructor(props){
        super(props);
        this.titleElRef= React.createRef();
        this.dateElRef= React.createRef();
        this.descriptionElRef= React.createRef();
    };
    
    componentDidMount() {
        this.fetchEvents();
    };

    startCreateEventHandler = () => {
        this.setState({creating: true});
    };

    modalConfirmHandler = () => {
        this.setState({creating: false});
        const title = this.titleElRef.current.value;
        
        const date = this.dateElRef.current.value;
        const description = this.descriptionElRef.current.value;
        if (
            title.trim().length ===0 ||
            date.trim().length === 0 ||
            description.trim().length === 0){
            return;
        }
        const event = {title,date,description};
        console.log(event);

        const requestBody = {
              query: `
                mutation {
                  createEvent(eventInput: {title: "${title}", description: "${description}", date:"${date}"}) {
                    _id
                    title
                    description
                    date
                  }
                }
              `
            };
          const token = this.context.token;
      
          fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+token

            }
          })
            .then(res => {
              if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
              }
              return res.json();
            })
            .then(resData => {
              this.setState(prevState =>{
                const updatedEvents = [...prevState.events];
                updatedEvents.push({
                  _id: resData.data.createEvent._id,
                  title:resData.data.createEvent.title,
                  description:resData.data.createEvent.description,
                  date:resData.data.createEvent.date,
                  creator :{
                      _id: this.context.userId,
                  }
                });
                return {events:updatedEvents}
              })

            })
            .catch(err => {
              console.log(err);
            });

    };
    
    modalCancelHandler = ()=> {
        this.setState({creating: false});
    };



    fetchEvents(){
        const requestBody = {
            query: `
              query {
               events {
                  _id
                  title
                  description
                  date
                  creator {
                      _id
                      email
                  }
                }
              }
            `
          };

    
        fetch('http://localhost:8000/graphql', {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
 

          }
        })
          .then(res => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error('Failed!');
            }
            return res.json();
          })
          .then(resData => {
            const events = resData.data.events;
            this.setState({events: events});
          })
          .catch(err => {
            console.log(err);
          });

    };

    render() {

        return (
        <React.Fragment>
            {this.state.creating && <Backdrop></Backdrop>}
            {this.state.creating && <Modal title = "Add New Note" canCancel canConfirm onConfirm={this.modalConfirmHandler} onCancel={this.modalCancelHandler}>
                <form>
                    <div className="form-control">
                        <label htmlFor="title">Title</label>
                        <input type = "text" id="title" ref={this.titleElRef}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="date">Date</label>
                        <input type = "datetime-local" id="date" ref={this.dateElRef}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="description">Description</label>
                        <textarea id = "discription" rows="10" ref={this.descriptionElRef}></textarea>
                    </div>
                </form>
            </Modal>}
        {this.context.token && <div className="notes-control">
            <p>Create New Notes</p>
            <button className="btn" onClick = {this.startCreateEventHandler}>Create !</button>
        </div>}
        <EventList 
        events = {this.state.events}
        authUserId = {this.context.userId} 
        />
        </React.Fragment>
        );

    }
}

export default EventsPage;