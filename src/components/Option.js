import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from "apollo-boost";

const DELETE_TODO = gql`
  mutation deleteTodo($id: Int!) {
    deleteTodo(input: $id) {
      id
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

const Option = (props) => (
  <Mutation mutation={DELETE_TODO}>
    {(deleteTodo, { data }) => (
      <div className="option">
        <p className="option__text">{props.count}.{props.optionText}</p>
        <button
          className="button button--link"
          onClick={(e) => {
            deleteTodo({ variables: { id: props.id }, refetchQueries: [{ query: ALL_TODOS }] });
            props.handleDeleteOption(props.optionText);
          }}
        >
          remove
        </button>
      </div>
    )}
  </Mutation>
)

export default Option