import React from 'react';
import './styles/Gallery.css';
import GalleryDisplay from './GalleryDisplay.js';



export default class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            /*
            data: this.props.data,
            word_count: this.props.word_count,
            rating: this.props.rating,
            rating_count: this.props.rating_count,
            completion_status: this.props.completion_status,
            publication_status: this.props.publication_status,
            originality: this.props.originality,
            originality_names: this.props.originality_names,
            era: this.props.era,
            type: this.props.type,
            style: this.props.style,
            content_labels: this.props.content_labels
            */
        }
    }

    render() {
        //console.log('this.props.data');
        //console.log(this.props.data);
        if ((!this.props.data)||(!this.props.data['Novels'])) {
            return (
                <div id="GalleryWrapper">
                    <GalleryDisplay novels={[]}/>
                </div>
            );
        }
        let novels = this.props.data['Novels'];
        // filter by search string
        const SEARCH_ARRAY = this.props.search_string_array;
        novels = novels.filter(novel => {
            if(SEARCH_ARRAY.length === 0) {
                return true;
            }
            for (let i = 0; i < SEARCH_ARRAY.length; i++) {
                if (!((novel['title'].includes(SEARCH_ARRAY[i]))
                      ||(novel['author_name'].includes(SEARCH_ARRAY[i])))) {
                    return false;
                }
            }
            return true;
        });
        // filter by originality
        novels = novels.filter(novel => {
            if (this.props.originality[0] === true) {
                return true;
            }
            const novel_originality = novel['genre'].split('-')[0];
            const originality_index = this.props.originality_names.indexOf(novel_originality);
            if (this.props.originality[originality_index] === true) {
                return true;
            } else {
                return false;
            }
        });
        // filter by completion status
        novels = novels.filter(novel => {
            if (this.props.completion_status[0] === true) {
                return true;
            }
            if (novel['completion_status'] === true) {
                if (this.props.completion_status[1] === true) {
                    return true;
                }
                return false;
            }
            if (this.props.completion_status[2] === true) {
                return true;
            }
            return false;
        });      
        // filter by publication status
        novels = novels.filter(novel => {
            if (this.props.publication_status[0] === true) {
                return true;
            }
            if (novel['publication_status'] === false) {
                if (this.props.publication_status[3] === true) {
                    return true;
                }
                return false;
            }
            for (let i = 1; i < this.props.publication_status.length; i++) {
                if (this.props.publication_status[i] === true) {
                    if (!novel['publication_status'].includes(this.props.publication_status_names[i])) {
                        return false;
                    }
                }
            }
            return true;
        });
        // filter by era
        novels = novels.filter(novel => {
            if (this.props.era[0] === true) {
                return true;
            }
            const novel_era = novel['genre'].split('-')[2];
            const era_index = this.props.era_names.indexOf(novel_era);
            if (this.props.era[era_index] === true) {
                return true;
            } else {
                return false;
            }
        });
        // filter by style
        novels = novels.filter(novel => {
            if (this.props.style[0] === true) {
                return true;
            }
            const style_index = this.props.style_names.indexOf(novel['style']);
            if (this.props.style[style_index] === true) {
                return true;
            } else {
                return false;
            }
        })
        // filter by type
        novels = novels.filter(novel => {
            if (this.props.type[0] === true) {
                return true;
            }
            const novel_type = novel['genre'].split('-')[3];
            const type_index = this.props.type_names.indexOf(novel_type);
            if (this.props.type[type_index] === true) {
                return true;
            } else {
                return false;
            }
        })
        // filter by content labels
        console.log('before', novels.length);
        novels = novels.filter(novel => {
            if (this.props.content_labels[0] === true) {
                return true;
            }
            const content_labels = novel['content_labels'];
            for (let i = 1; i < this.props.content_labels.length; i++) {
                if (this.props.content_labels[i] === true) {
                    if (!content_labels.includes(this.props.content_labels_names[i])) {
                        return false;
                    }
                }
            }
            return true;
        });
        console.log('after', novels.length);
        novels = novels.filter(novel => novel['word_count'] >= this.props.word_count);
        novels = novels.filter(novel => {
            //console.log(novel.genre);
            if ('rating' in novel) {
                return (novel['rating'] >= this.props.rating);
            }
            else {
                return true;
            }
        });
        novels = novels.filter(novel => {
            if ('rating_count' in novel) {
                return (novel['rating_count'] >= this.props.rating_count);
            }
            else {
                return true;
            }
        });
        return (
            <div id="GalleryWrapper">
                <GalleryDisplay novels={novels}/>
            </div>
        )
    }   
}

/*

//https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

*/