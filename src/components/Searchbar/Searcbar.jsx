import { Component } from "react";
import PropTypes from 'prop-types';
import { SearchbarStyle, SearchForm, Button, ButtonLabel, Input } from "./Searchbar.styled";

export class Searchbar extends Component {

    static PropType = {
        onSubmit: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    state = {
        inputText: '',
    }

    handleInputText = event => {
        this.setState({
            inputText: event.target.value.trim(),
        });
      };
    
    handleSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.inputText);
      };
    
    render() {
        return (
            <SearchbarStyle>
                <SearchForm onSubmit={this.handleSubmit}>
                    <Button type="submit">
                    <ButtonLabel>Search</ButtonLabel>
                    </Button>
    
                    <Input
                    type="text"
                    // autocomplete="off"
                    // autofocus
                    placeholder="Search images and photos"
                    onChange={this.handleInputText}
                    />
                </SearchForm>
            </SearchbarStyle>
        )
    }
}