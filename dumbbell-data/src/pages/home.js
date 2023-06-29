import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Exercise from '../models/exercise.model';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    
    this.deleteExercise = this.deleteExercise.bind(this)
    
    this.state = {exercises: []};
  } 
  
  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(res => console.log(res.data));
    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id} />;
    })
  }

  render() {
      return (
        <div>
          <h3>Logged Exercsises</h3>
          <table className='table'>
            <thread className='thread-light'>

            </thread>
          </table>
        </div>
      )
    }
  }