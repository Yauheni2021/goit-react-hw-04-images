import { Box } from './Box';
import { Component } from 'react';
import { fetchApi } from '../services/getApi';
import { Searchbar } from './Searchbar/Searcbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

import { Modal } from './Modal/Modal';
import { Notify } from "notiflix";


export class App extends Component {

  state = {
        searchQuery: '',
        page: 1,
        images: '',
        loading: false,
        totalPages: '',
        showModal: false,
        modalImage: null,
        modalImageTags: '',
  }

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    
    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      this.fetchImages();
    };
  };

  handleSearchQuery = value => {

    const { searchQuery } = this.state;

    if (value === '') {
      this.setState({ 
        searchQuery: '', 
        page: 1, 
        images: [],
      });
      Notify.warning("You didn't enter anything!");
      return;
    }

    if (value === searchQuery) {
      return;
    }

    this.setState({
      loading: true,
      searchQuery: value,
      page: 1,
      images: [],
    });
  };

  fetchImages = async () => {
    const { searchQuery, page } = this.state;
    try {

      this.setState({
        loading: true,
      });

      if (searchQuery === '') {
        return;
      };

      const data = await fetchApi(searchQuery, page);
      // console.log(data.hits);

      if (data.hits.length === 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      const imageData = data.hits.map(
        ({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        })
      );
      
      this.setState(prevState => ({
        images: [...prevState.images, ...imageData],
        totalPages: Math.ceil(data.total / 12),
      }));
      // console.log(this.state.totalPages, this.state.page);
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  loadMore = () => {
    this.setState((prevState) => ({
    page: prevState.page + 1
  }));    
  };

  toggle = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  openModal = (id) => {
    const imageModalData = this.state.images.find(image => image.id === id);
    const largeImage = imageModalData.largeImageURL;
    const imageTags = imageModalData.tags;
  
    this.setState({
      modalImage: largeImage,
      modalImageTags: imageTags,
    });
    this.toggle();
  }

  render() {

    const { images, loading, totalPages, page, showModal, modalImage, modalImageTags } = this.state;
    const imagesExist = images.length !== 0;
    const isNotLastPage = page < totalPages;

    return (
      <Box display="grid" gridTemplateColumns="1fr" gridGap="16px" pb="24px">
          <Searchbar onSubmit={this.handleSearchQuery} />
          {imagesExist && <ImageGallery images={images} loadMore={this.loadMore} onImageClick={this.openModal} />}
          {loading ? (<Loader />) : (imagesExist && isNotLastPage && <Button onClick={this.loadMore} />)}
          {showModal && (
              <Modal onMClose={this.toggle} largeImage={modalImage} tags={modalImageTags} />
          )}
           
      </Box>
    );
  }

  
};