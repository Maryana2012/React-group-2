import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
  };

  handleSubmit = data => {
    const todo = { text: data, id: nanoid() };
    this.setState(prevState => ({ todos: [...prevState.todos, todo] }));
    console.log(data);
  };

  handleRemoveTodo = id => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  render() {
    const { todos } = this.state;
    console.log(this.state.todos);
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {todos.map((todo, i) => (
            <GridItem key={todo.id}>
              <Todo todo={todo} index={i + 1} handleRemoveTodo ={this.handleRemoveTodo}/>
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
