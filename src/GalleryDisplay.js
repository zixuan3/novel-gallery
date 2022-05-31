import React from 'react';
import './styles/GalleryDisplay.css';

import { Scrollbars } from 'react-custom-scrollbars';

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

export default class GalleryDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            on_hover: -1,
            row_length: 6
        }
    }

    render() {
        let index = -1;
        return (
            <CustomScrollbars>
                <div id="GalleryDisplayWrapper">
                {(this.props.novels) ? 
                    (this.props.novels.map((novel, key) => {
                        index += 1;
                        const number = index;
                        let content_labels = '';
                        for (let i = 0; i < novel['content_labels'].length; i++) {
                            content_labels += novel['content_labels'][i];
                            if (i !== novel['content_labels'].length - 1) {
                                content_labels += '\xa0\xa0\xa0';
                            }
                        }
                        return (
                            <div className="novelCoverWrapper" key={number}>
                                <div    onMouseEnter={(e)=>{
                                            this.setState({on_hover: number});
                                        }}
                                        onMouseLeave={(e)=>{
                                            this.setState({on_hover: -1});
                                        }}>
                                        <div className="coverBorder">
                                            <img    className='novelCover'
                                                    key={novel['title']}
                                                    src={'/images/'+novel['title']+'.png'} 
                                                    alt={novel['title']}/>
                                        </div>
                                </div>
                                {   (this.state.on_hover===number)&&
                                    <div className={(number % this.state.row_length < 3)
                                                        ?"rightInfoBox"
                                                        :"leftInfoBox"}>
                                        <div className='novelTitle'>{novel['title']}</div>
                                        <div className='novelAuthor'>作者：{novel['author_name']}</div>
                                        <div className='novelDescription'>一句话简介：{novel['one_sentence_description']}</div>
                                        <div className='novelOverlordTicket'>当前全站霸王票排行：
                                            <div className='novelRanking'>
                                                {novel['overlord_ticket_ranking']}
                                            </div>
                                        </div>
                                        <div className='novelLabels'>内容标签：{content_labels}</div>
                                    </div>
                                }
                            </div>
                        );}))
                :
                <div className='fetchingInfo'>
                    Fetching novel information...
                </div>
                }
                </div>
            </CustomScrollbars>
        );
    }   
}
