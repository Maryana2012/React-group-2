import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    valueInput: '',
    page: 1,
    images: [],
    totalImages: 0,
    err: null
  }

  createInput=(e)=> {
    this.setState({valueInput: e});
 }

  componentDidUpdate(prevProps, prevState) {
    const { valueInput, page } = this.state;
    if (prevState.valueInput !== valueInput) {
      this.handleResponse(valueInput, page);
    }
  }
  
  handleResponse= async(query, page)=> {
    try {
      const response = await ImageService.getImages(query, page);
      this.setState(prevState => ({ images: [...prevState.images, response.photos ] }))

    }
    catch (err){
      console.log(err)
      this.setState({ err });
    }   
  }

  render() {
    console.log(this.state.images)
    return (
      <>
        <SearchForm onSubmit={this.createInput } />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
