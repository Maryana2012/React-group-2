import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    valueInput: '',

  }
  handleInput=(e)=> {
  this.setState({valueInput: e.target.value});
  }
  handleSubmit=(e)=> {
    e.preventDefault();
    this.props.onSubmit(this.state.valueInput);
    this.setState({valueInput:''})
  }

  
  
  render() {
    return ( <SearchFormStyled onSubmit={this.handleSubmit}>
  <FormBtn type="submit" >
    <FiSearch size="16px" />
  </FormBtn>
  <InputSearch
    placeholder="What do you want to write?"
    name="search"
    required
      autoFocus
        onChange={this.handleInput}
        value= {this.state.valueInput}
       
  />
</SearchFormStyled>)
  }
}
