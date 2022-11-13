import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryStyle } from './ImageGallery.styled';

export const ImageGallery = ({ images, onImageClick }) => {
    return (
      <ImageGalleryStyle>
        {images.map(({ id, tags, webformatURL }) => {
          return <ImageGalleryItem
            key={id}
            idImage={id}
            smallImage={webformatURL}
            tags={tags}
            onImageClick={onImageClick} />;
        })}
      </ImageGalleryStyle>
    );
  };

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            tags: PropTypes.string.isRequired,
            webformatURL: PropTypes.string.isRequired,
        }),
    ),
    onImageClick: PropTypes.func.isRequired,
}