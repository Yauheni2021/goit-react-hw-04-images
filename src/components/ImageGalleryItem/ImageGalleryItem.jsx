import PropTypes from 'prop-types';
import { ItemStyle, ItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({idImage, smallImage, tags, onImageClick}) => {
  
        return (
            <>
                <ItemStyle onClick={() => onImageClick(idImage)} >
                    <ItemImage src={smallImage} alt={tags} />
                </ItemStyle>
            </>
        );
};

ImageGalleryItem.propType = {
    idImage: PropTypes.number.isRequired,
    smallImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onImageClick: PropTypes.func.isRequired,
};