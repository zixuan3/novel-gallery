import React from 'react';
import './styles/SearchBar.css';

import { BiSearchAlt } from 'react-icons/bi';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentSearch: ''
        }
        this.setSearch = this.setSearch.bind(this);
    }

    setSearch(event) {
        // console.log('event.target');
        // console.log(event.target);
        // console.log('event.target.value');
        // console.log(event.target.value);
        const SEARCH_STRING_ARRAY = event.target.value.split(' ');
        this.props.onSearchChange(SEARCH_STRING_ARRAY);
        this.setState({
            currentSearch: event.target.value
        })
    }
    
    render() {
        return (
            <div id="SearchBarWrapper">
                <i id='searchIcon'><BiSearchAlt /></i>
                <div id='searchBar'>
                    <input 
                        className='searchInput'
                        type="text" 
                        onChange={this.setSearch} 
                        value={this.state.currentSearch}
                        placeholder='搜索'
                    />
                </div>
            </div>
        )
    }   
}