import PropTypes from 'prop-types';
import { ImageGalleryItemStyled, ImageGalleryImgStyled } from './ImageGalleryItem.styled';


export const ImageGalleryItem = ({ webImg, largeImg, toggleModal }) => {
  return (
    <>
      <ImageGalleryItemStyled onClick={() => toggleModal(largeImg)}>
        <ImageGalleryImgStyled src={webImg} alt="image" />
      </ImageGalleryItemStyled>
    </>
  );
};

ImageGalleryItem.propTypes = {
  webImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  toggleModal: PropTypes.func.isRequired,
};