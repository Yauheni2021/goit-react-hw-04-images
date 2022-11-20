import { useState } from 'react';
import PropTypes from 'prop-types';
import {
    SearchbarStyle,
    SearchForm,
    Button,
    Input
} from "./Searchbar.styled";

import { BsSearch } from 'react-icons/bs';

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
          <BsSearch />
        </Button>
        <Input
          type="text"
          name="SearchBar"
          autoComplete="off"
          autoFocus
          value={queue}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarStyle>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};