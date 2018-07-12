import React, { Component } from 'react';
import {connect} from 'react-redux';

import {notes, auth} from "../actions";

class Note extends Component {
    state = {
        Title: '',
        Content: '',
        Category: '',
        updatedNoteId: null,
    }

    resetForm = () => {
        this.setState({Title: '', Content: '', Category: '', updatedNoteId: null});
    }

    editNote = (id) => {
        let note = this.props.notes[id];
        this.setState({Title: note.Title, Content: note.Content, Category: note.Category, updatedNoteId: null});
    }

    submitNote = (event) => {
        event.preventDefault();
        if (this.state.updatedNoteId === null) {
            this.props.addNote(this.state.Title).then(this.resetForm)
        }else {
            this.props.updatedNoteId(this.state.updatedNoteId, this.state.text).then(this.resetForm);
        }
        }

    componentDidMount() {
        this.props.fetchNotes();
    }

    render() {
        return (
            <div>
                <h2>Welcome To Crispad's Note App!</h2>
                <hr />
                <div style={{textAlign:"right"}}>
                    {this.props.user.username} (<a onClick={this.props.logout}>logout</a>)
            </div>
                <h3>Add new note</h3>
                <form onSubmit={this.submitNote}>
                <input
                    value={this.state.text}
                    placeholder="Enter note here"
                    onChange={(event) => this.setState({Title: event.target.value})}
                    required />
                <button onClick={this.resetForm}>Reset</button>
                <input type="submit" value="Save Note" />
                </form>

                <h3>Notes</h3>
                <table>
                    <tbody>
                        {this.props.notes.map((note, id) => (
                            <tr key={`note_${note.id}`}>
                                <td>{note.text}</td>
                                <td><button onClick={() => this.editNote(id)}>edit</button></td>
                                <td><button onClick={() => this.props.deleteNote(id)}>delete</button></td>
                            </tr>
                        ))}
                        </tbody>
                        </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotes: () => {
            dispatch(notes.fetchNotes());
        }, 
        addNote: (text) => {
            return dispatch(notes.addNote(text));
        },
        updatedNote: (id, text) => {
            return dispatch(notes.updatedNote(id, text));
        },
        deleteNote: (id) => {
            dispatch(notes.deleteNote(id));
        }, 
        logout: () => dispatch(auth.logout()), 
    }
}