import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    SearchbarStyle,
    SearchForm,
    Button,
    ButtonLabel,
    Input
} from "./Searchbar.styled";


export const Searchbar = ({ onSubmit }) => {
  const [queue, setQueue] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setQueue(value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(queue);
  };
    
    return (
        <SearchbarStyle>
            <SearchForm onSubmit={handleSubmit}>
                <Button type="submit">
                    <ButtonLabel>Search</ButtonLabel>
                </Button>
    
                <Input
                    type="text"
                    autocomplete="off"
                    autoFocus
                    value={queue}
                    placeholder="Search images and photos"
                    onChange={handleChange}
                />
            </SearchForm>
        </SearchbarStyle>
    )
};
    
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
