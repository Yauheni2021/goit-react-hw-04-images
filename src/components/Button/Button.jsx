import PropTypes from 'prop-types';
import { ButtonStyle } from './Button.styled';

export const Button = ({ onClick }) => {
    return (
        <ButtonStyle type="button" onClick={onClick}>Load more</ButtonStyle>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};