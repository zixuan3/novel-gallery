import React from 'react';
import './styles/ControlBar.css';


export default class ControlBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div id="ControlBarWrapper">
                <div className="controlBarWrapper">
                    <div className='resetFilters' onClick={this.props.onResetFilters}>
                        重置筛选条件
                    </div>
                </div>
            </div>
        )
    }   
}