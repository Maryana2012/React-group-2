import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    valueInput: '',
    page: 1,
    images: [],
    totalImages: 0,
    err: null,
  };

  createInput = e => {
    this.setState({
      valueInput: e,
      page: 1,
      images: [],
      totalImages: 0,
      err: null,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const { valueInput, page } = this.state;
    if (prevState.valueInput !== valueInput || prevState.page !== page) {
      this.handleResponse(valueInput, page);
    }
  }

  handleResponse = async (query, page) => {
    try {
      const response = await ImageService.getImages(query, page);
      // console.log(response.photos);
      this.setState(prevState => ({
        images: [...prevState.images, ...response.photos], 
        totalImages: response.total_results
      }));
    } catch (err) {
      console.log(err);
      this.setState({ err });
    }
  };
  handelLoadMore = () => {
    this.setState(pref=>({page: pref.page + 1}))
  }
  render() {
    // console.log(this.state.images[0]);

    return (
      <>
        <SearchForm onSubmit={this.createInput} />
        <Grid>
          {this.state.images.map(({ id, avg_color, alt, src }) => (
            <GridItem key={id}>
              <CardItem color={avg_color}>
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {this.state.images.length < this.state.totalImages && (
          <Button onClick={this.handelLoadMore}>Load more</Button>
        )}
        {this.state.err && <Text textAlign="center">Біда 😭</Text>}
        {this.state.valueInput !== "" && this.state.images.length === 0 &&  <Text textAlign="center">Немає зображень 😭</Text>}
      </>
    );
  }
}
