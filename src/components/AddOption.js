/* eslint-disable react/prop-types */
import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';

const ADD_TODO = gql`
  mutation createTodo($text: String!) {
    createTodo(input: { name: "todo2", description: $text }) {
      name
      description
    }
  }
`
const ALL_TODOS = gql`
  query findTodos {
    todos {
      id
      name
      description
    }
  }
`

export default class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: undefined
    };
  }
  handleAddOption(addTodo, e) {
    e.preventDefault();

    const option = e.target.elements.option.value.trim();
    addTodo({ variables: { text: option }, refetchQueries: [{ query: ALL_TODOS }] });
    console.log('add')
    const error = this.props.handleAddOption(option)

    this.setState(() => ({ error }));

    if (!error) {
      e.target.elements.option.value = '';
    }
  }
  render() {
    return (
      <Mutation mutation={ADD_TODO}>
        {(addTodo, { data }) => (
          <div>
            {this.state.error && <p className="add-option-error">{this.state.error}</p>}
            <form className="add-option" onSubmit={this.handleAddOption.bind(this, addTodo)}>
              <input className="add-option__input" type="text" name="option" />
              <button className="button">Add Option</button>
            </form>
          </div>
        )}
      </Mutation>
    )
  }
}