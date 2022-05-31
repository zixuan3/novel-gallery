import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import './styles/Filters.css';

function one_true_x_false(x) {
    let ret = [true];
    for (let i = 0; i < x; i++) {
        ret.push(false);
    }
    return ret;
}

const renderThumb = ({ style, ...props }) => {
  const thumbStyle = {
    borderRadius: 6,
    backgroundColor: '#715947'
  };
  return <div style={{ ...style, ...thumbStyle }} {...props} />;
};

const CustomScrollbars = props => (
  <Scrollbars
    renderThumbHorizontal={renderThumb}
    renderThumbVertical={renderThumb}
    {...props}
  />
);

function generate_bar_text(names, bools) {
    let ret = '';
    for (let i = 0; i < bools.length; i++) {
        if (bools[i] === true) {
            if (ret !== '') {
                return '多选';
            } else {
                ret = names[i];
            }
        }
    }
    return ret;
}

export default class Filters extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            originality: one_true_x_false(2),
            originality_filters: false,
            completion_status: one_true_x_false(2),
            completion_status_filters: false,
            publication_status: one_true_x_false(3),
            publication_status_filters: false,
            era: one_true_x_false(4),
            era_filters: false,
            type: one_true_x_false(15),
            type_filters: false,
            style: one_true_x_false(5),
            style_filters: false,
            content_labels: one_true_x_false(114),
            content_labels_filters: false,
            publication_status_names: ['全部','简体出版','繁体海外','尚未出版'],
        }
        this.handleOriginalityChange = this.handleOriginalityChange.bind(this);
        this.handleOriginalityToggle = this.handleOriginalityToggle.bind(this);
        this.handleCompletionStatusChange = this.handleCompletionStatusChange.bind(this);
        this.handleCompletionStatusToggle = this.handleCompletionStatusToggle.bind(this);
        this.handlePublicationStatusChange = this.handlePublicationStatusChange.bind(this);
        this.handlePublicationStatusToggle = this.handlePublicationStatusToggle.bind(this);
        this.handleEraChange = this.handleEraChange.bind(this);
        this.handleEraToggle = this.handleEraToggle.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleTypeToggle = this.handleTypeToggle.bind(this);
        this.handleStyleChange = this.handleStyleChange.bind(this);
        this.handleStyleToggle = this.handleStyleToggle.bind(this);
        this.handleContentLabelsChange = this.handleContentLabelsChange.bind(this);
        this.handleContentLabelsToggle = this.handleContentLabelsToggle.bind(this);
    }

    handleOriginalityChange(event) {
        // element 0 represent '全选', true means filter on, false means filter off
        let filter_id = parseInt(event.target.id);
        let new_value = !this.state.originality[filter_id];
        let new_state = this.state.originality;
        if (filter_id === 0) {
            if (new_value === true) {
                for (let i = 1; i < new_state.length; i++) {
                    new_state[i] = false;
                }
                new_state[0] = true;
            } else {
                new_state[0] = false;
            }
        } else {
            for (let i = 0; i < new_state.length; i++) {
                new_state[i] = false;
            }
            new_state[filter_id] = new_value;
            if (new_value === true) {
                new_state[0] = false;
            }
        }
        // when all filters off, set '全选' to on.
        const check_false = arr => arr.every(v => v === false);
        if (check_false(new_state)) {
            new_state[0] = true;
        }
        this.setState({originality: new_state});
        // finally, send info to parent that passes filter info to gallery
        if (new_state === true) {
            this.props.onOriginalityChange(new_state);
        } else {
            this.props.onOriginalityChange(new_state);
        }
    }
    
    handleCompletionStatusChange(event) {
        // element 0 represent '全选', true means filter on, false means filter off
        let filter_id = parseInt(event.target.id);
        let new_value = !this.state.completion_status[filter_id];
        let new_state = this.state.completion_status;
        if (filter_id === 0) {
            if (new_value === true) {
                for (let i = 1; i < new_state.length; i++) {
                    new_state[i] = false;
                }
                new_state[0] = true;
            } else {
                new_state[0] = false;
            }
        } else {
            for (let i = 0; i < new_state.length; i++) {
                new_state[i] = false;
            }
            new_state[filter_id] = new_value;
            if (new_value === true) {
                new_state[0] = false;
            }
        }
        // when all filters off, set '全选' to on.
        const check_false = arr => arr.every(v => v === false);
        if (check_false(new_state)) {
            new_state[0] = true;
        }
        this.setState({completion_status: new_state});
        // finally, send info to parent that passes filter info to gallery
        if (new_state === true) {
            this.props.onCompletionStatusChange(new_state);
        } else {
            this.props.onCompletionStatusChange(new_state);
        }
    }
    
    handlePublicationStatusChange(event) {
        // element 0 represent '全选', true means filter on, false means filter off
        let filter_id = parseInt(event.target.id);
        let new_value = !this.state.publication_status[filter_id];
        let new_state = this.state.publication_status;
        if ((filter_id === 0) || (filter_id === 3)) {
            if (new_value === true) {
                for (let i = 0; i < new_state.length; i++) {
                    new_state[i] = false;
                }
                new_state[filter_id] = true;
            } else {
                new_state[filter_id] = false;
            }
        } else {
            new_state[filter_id] = new_value;
            if (new_value === true) {
                new_state[0] = false;
                new_state[3] = false;
            }
        }
        // when all filters off, set '全选' to on.
        const check_false = arr => arr.every(v => v === false);
        if (check_false(new_state)) {
            new_state[0] = true;
        }
        this.setState({publication_status: new_state});
        // finally, send info to parent that passes filter info to gallery
        if (new_state === true) {
            this.props.onPublicationStatusChange(new_state);
        } else {
            this.props.onPublicationStatusChange(new_state);
        }
    }
    
    handleEraChange(event) {
        // element 0 represent '全选', true means filter on, false means filter off
        let filter_id = parseInt(event.target.id);
        let new_value = !this.state.era[filter_id];
        let new_state = this.state.era;
        if (filter_id === 0) {
            if (new_value === true) {
                for (let i = 1; i < new_state.length; i++) {
                    new_state[i] = false;
                }
                new_state[0] = true;
            } else {
                new_state[0] = false;
            }
        } else {
            new_state[filter_id] = new_value;
            if (new_value === true) {
                new_state[0] = false;
            }
        }
        // when all filters off, set '全选' to on.
        const check_false = arr => arr.every(v => v === false);
        if (check_false(new_state)) {
            new_state[0] = true;
        }
        this.setState({era: new_state});
        // finally, send info to parent that passes filter info to gallery
        if (new_state === true) {
            this.props.onEraChange(new_state);
        } else {
            this.props.onEraChange(new_state);
        }
    }
    
    handleTypeChange(event) {
        // element 0 represent '全选', true means filter on, false means filter off
        let filter_id = parseInt(event.target.id);
        let new_value = !this.state.type[filter_id];
        let new_state = this.state.type;
        if (filter_id === 0) {
            if (new_value === true) {
                for (let i = 1; i < new_state.length; i++) {
                    new_state[i] = false;
                }
                new_state[0] = true;
            } else {
                new_state[0] = false;
            }
        } else {
            new_state[filter_id] = new_value;
            if (new_value === true) {
                new_state[0] = false;
            }
        }
        // when all filters off, set '全选' to on.
        const check_false = arr => arr.every(v => v === false);
        if (check_false(new_state)) {
            new_state[0] = true;
        }
        this.setState({type: new_state});
        // finally, send info to parent that passes filter info to gallery
        if (new_state === true) {
            this.props.onTypeChange(new_state);
        } else {
            this.props.onTypeChange(new_state);
        }
    }
    
    handleStyleChange(event) {
        // element 0 represent '全选', true means filter on, false means filter off
        let filter_id = parseInt(event.target.id);
        let new_value = !this.state.style[filter_id];
        let new_state = this.state.style;
        if (filter_id === 0) {
            if (new_value === true) {
                for (let i = 1; i < new_state.length; i++) {
                    new_state[i] = false;
                }
                new_state[0] = true;
            } else {
                new_state[0] = false;
            }
        } else {
            new_state[filter_id] = new_value;
            if (new_value === true) {
                new_state[0] = false;
            }
        }
        // when all filters off, set '全选' to on.
        const check_false = arr => arr.every(v => v === false);
        if (check_false(new_state)) {
            new_state[0] = true;
        }
        this.setState({style: new_state});
        // finally, send info to parent that passes filter info to gallery
        if (new_state === true) {
            this.props.onStyleChange(new_state);
        } else {
            this.props.onStyleChange(new_state);
        }
    }
    
    handleContentLabelsChange(event) {
        // element 0 represent '全选', true means filter on, false means filter off
        let filter_id = parseInt(event.target.id);
        let new_value = !this.state.content_labels[filter_id];
        let new_state = this.state.content_labels;
        if (filter_id === 0) {
            if (new_value === true) {
                for (let i = 1; i < new_state.length; i++) {
                    new_state[i] = false;
                }
                new_state[0] = true;
            } else {
                new_state[0] = false;
            }
        } else {
            new_state[filter_id] = new_value;
            if (new_value === true) {
                new_state[0] = false;
            }
        }
        // when all filters off, set '全选' to on.
        const check_false = arr => arr.every(v => v === false);
        if (check_false(new_state)) {
            new_state[0] = true;
        }
        this.setState({content_labels: new_state});
        // finally, send info to parent that passes filter info to gallery
        if (new_state === true) {
            this.props.onContentLabelsChange(new_state);
        } else {
            this.props.onContentLabelsChange(new_state);
        }
    }
    
    handleOriginalityToggle(event) {
        this.setState({originality_filters: !this.state.originality_filters});  
    }
    
    handleCompletionStatusToggle(event) {
        this.setState({completion_status_filters: !this.state.completion_status_filters});  
    }
    
    handlePublicationStatusToggle(event) {
        this.setState({publication_status_filters: !this.state.publication_status_filters});
    }
    
    handleEraToggle(event) {
        this.setState({era_filters: !this.state.era_filters});
    }
    
    handleTypeToggle(event) {
        this.setState({type_filters: !this.state.type_filters});
    }
    
    handleStyleToggle(event) {
        this.setState({style_filters: !this.state.style_filters});
    }
    
    handleContentLabelsToggle(event) {
        this.setState({content_labels_filters: !this.state.content_labels_filters});
    }
    
    render() {
        if (this.props.filters_have_reset === false) {
            this.setState({
                originality: one_true_x_false(2),
                completion_status: one_true_x_false(2),
                publication_status: one_true_x_false(3),
                era: one_true_x_false(4),
                type: one_true_x_false(15),
                style: one_true_x_false(5),
                content_labels: one_true_x_false(114)
            });
            this.props.filtersHaveReset();
        }
        return (
            <div className='filtersWrapper'>
                <CustomScrollbars>
                <div id='originality' className="filterWrapper">
                    <div className='barWrapper' onClick={this.handleOriginalityToggle}>
                        <div className='filterBar'>
                            <div className='filterName'>
                                原创性
                            </div>
                            <div className='filterStatus'>
                                {generate_bar_text(this.props.originality_names, this.state.originality)}
                            </div>
                        </div>
                    </div>
                    <div className={this.state.originality_filters ? 'buttonsWrapper show' : 'buttonsWrapper hide'}>
                        {this.state.originality.map((novel, index) => {
                            return (
                                <div className='buttonWrapper'>
                                    <div id={index.toString()} className={this.state.originality[index] ? 'clicked button' : 'unclicked button'} onClick={this.handleOriginalityChange} key={index}>
                                        {this.props.originality_names[index]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div id='completion_status' className="filterWrapper">
                    <div className='barWrapper' onClick={this.handleCompletionStatusToggle}>
                        <div className='filterBar'>
                            <div className='filterName'>
                                文章进度
                            </div>
                            <div className='filterStatus'>
                                {generate_bar_text(this.props.completion_status_names, this.state.completion_status)}
                            </div>
                        </div>
                    </div>
                    <div className={this.state.completion_status_filters ? 'buttonsWrapper show' : 'buttonsWrapper hide'}>
                        {this.state.completion_status.map((novel, index) => {
                            return (
                                <div className='buttonWrapper'>
                                    <div id={index.toString()} className={this.state.completion_status[index] ? 'clicked button' : 'unclicked button'} onClick={this.handleCompletionStatusChange} key={index}>
                                        {this.props.completion_status_names[index]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div id='publication_status' className="filterWrapper">
                    <div className='barWrapper' onClick={this.handlePublicationStatusToggle}>
                        <div className='filterBar'>
                            <div className='filterName'>
                                是否出版
                            </div>
                            <div className='filterStatus'>
                                {generate_bar_text(this.state.publication_status_names, this.state.publication_status)}
                            </div>
                        </div>
                    </div>
                    <div className={this.state.publication_status_filters ? 'buttonsWrapper show' : 'buttonsWrapper hide'}>
                        {this.state.publication_status.map((novel, index) => {
                            return (
                                <div className='buttonWrapper'>
                                    <div id={index.toString()} className={this.state.publication_status[index] ? 'clicked button' : 'unclicked button'} onClick={this.handlePublicationStatusChange} key={index}>
                                        {this.state.publication_status_names[index]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div id='era' className="filterWrapper">
                    <div className='barWrapper' onClick={this.handleEraToggle}>
                        <div className='filterBar'>
                            <div className='filterName'>
                                时代
                            </div>
                            <div className='filterStatus'>
                                {generate_bar_text(this.props.era_names, this.state.era)}
                            </div>
                        </div>
                    </div>
                    <div className={this.state.era_filters ? 'buttonsWrapper show' : 'buttonsWrapper hide'}>
                        {this.state.era.map((novel, index) => {
                            return (
                                <div className='buttonWrapper'>
                                    <div id={index.toString()} className={this.state.era[index] ? 'clicked button' : 'unclicked button'} onClick={this.handleEraChange} key={index}>
                                        {this.props.era_names[index]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div id='style' className="filterWrapper">
                    <div className='barWrapper' onClick={this.handleStyleToggle}>
                        <div className='filterBar'>
                            <div className='filterName'>
                                风格
                            </div>
                            <div className='filterStatus'>
                                {generate_bar_text(this.props.style_names, this.state.style)}
                            </div>
                        </div>
                    </div>
                    <div className={this.state.style_filters ? 'buttonsWrapper show' : 'buttonsWrapper hide'}>
                        {this.state.style.map((novel, index) => {
                            return (
                                <div className='buttonWrapper'>
                                    <div id={index.toString()} className={this.state.style[index] ? 'clicked button' : 'unclicked button'} onClick={this.handleStyleChange} key={index}>
                                        {this.props.style_names[index]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div id='type' className="filterWrapper">
                    <div className='barWrapper' onClick={this.handleTypeToggle}>
                        <div className='filterBar'>
                            <div className='filterName'>
                                类型
                            </div>
                            <div className='filterStatus'>
                                {generate_bar_text(this.props.type_names, this.state.type)}
                            </div>
                        </div>
                    </div>
                    <div className={this.state.type_filters ? 'buttonsWrapper show' : 'buttonsWrapper hide'}>
                        {this.state.type.map((novel, index) => {
                            return (
                                <div className='buttonWrapper'>
                                    <div id={index.toString()} className={this.state.type[index] ? 'clicked button' : 'unclicked button'} onClick={this.handleTypeChange} key={index}>
                                        {this.props.type_names[index]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div id='content_labels' className="filterWrapper">
                    <div className='barWrapper' onClick={this.handleContentLabelsToggle}>
                        <div className='filterBar'>
                            <div className='filterName'>
                                内容标签
                            </div>
                            <div className='filterStatus'>
                                {generate_bar_text(this.props.content_labels_names, this.state.content_labels)}
                            </div>
                        </div>
                    </div>
                    <div className={this.state.content_labels_filters ? 'buttonsWrapper show' : 'buttonsWrapper hide'}>
                        {this.state.content_labels.map((content_label, index) => {
                            return (
                                <div className='buttonWrapper'>
                                    <div id={index.toString()} className={this.state.content_labels[index] ? 'clicked button' : 'unclicked button'} onClick={this.handleContentLabelsChange} key={index}>
                                        {this.props.content_labels_names[index]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                </CustomScrollbars>
            </div>
        )
    }   
}