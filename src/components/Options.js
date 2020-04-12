/* eslint-disable react/prop-types */
import React from 'react';
import Option from './Option';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';

export const ALL_TODOS = gql`
  query findTodos {
    todos {
      id
      name
      description
    }
  }
`

const Options = (props) => {
  const { loading, error, data } = useQuery(ALL_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div className="widget-header">
        <h3 className="widget-header__title">Your Options</h3>
        <button
          className="button button--link"
          onClick={props.handleDeleteOptions}>
          Remove All
      </button>
      </div>
      {props.options.length === 0 && <p className="widget-message">Please add an option to get started!</p>}
      {
        data.todos.map((todo, index) => (
          <Option
            key={index}
            id={todo.id}
            optionText={todo.description}
            count={index + 1}
            handleDeleteOption={props.handleDeleteOption}
          />
        ))
      }
    </div>
  );
}

export default Options