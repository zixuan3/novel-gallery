import React from 'react';
import axios from 'axios';
import Filters from './Filters.js';
import Gallery from './Gallery.js';
import SearchBar from './SearchBar.js';
import ControlBar from './ControlBar.js';
import './styles/MainLayout.css';

function one_true_x_false(x) {
    let ret = [true];
    for (let i = 0; i < x; i++) {
        ret.push(false);
    }
    return ret;
}

export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originality: one_true_x_false(2),
            originality_names: ['全部', '原创', '衍生'],
            completion_status: one_true_x_false(2),
            completion_status_names: ['全部', '完结', '连载'],
            publication_status: one_true_x_false(3),
            publication_status_names: ['全部','简体出版','繁体海外出版','尚未出版'],
            era: one_true_x_false(4),
            era_names: ['全部','近代现代','古色古香','架空历史','幻想未来'],
            type: one_true_x_false(15),
            type_names: ['全部','爱情','武侠','奇幻','仙侠','游戏','传奇','科幻','惊悚','悬疑','剧情','轻小说','古典衍生','东方衍生','西方衍生','其他衍生'],
            // currently nonexistent types: 童话 儿歌 散文 寓言 童谣 历史故事
            style: one_true_x_false(5),
            style_names: ['全部','悲剧','正剧','轻松','搞笑','暗黑'],
            content_labels: one_true_x_false(114),
            content_labels_names: ['全部','甜文','爽文','情有独钟','穿书','穿越时空','强强','娱乐圈','重生','豪门世家','快穿','系统','天之骄子','天作之合','种田文','都市情缘','仙侠修真','灵异神怪','无限流','宫廷侯爵','幻想空间','打脸','业界精英','励志人生','综漫','校园','年代文','女配','星际','女强','破镜重圆','欢喜冤家','文野','年下','竞技','悬疑推理','少年漫','直播','美食','异能','升级流','现代架空','未来架空','游戏网游','生子','三教九流','江湖恩怨','清穿','基建','恐怖','复仇虐渣','成长','时代奇缘','婚恋','逆袭','青梅竹马','相爱相杀','奇幻魔幻','西幻','都市异闻','花季雨季','机甲','前世今生','末世','科幻','东方玄幻','异想天开','古穿今','历史衍生','异世大陆','玄学','英美衍生','宫斗','时代新风','近水楼台','随身空间','灵魂转换','制服情缘','虐恋情深','传奇','布衣生活','超级英雄','家教','西方罗曼','女扮男装','爱情战争','宅斗','民国旧影','古典名著','武侠','红楼梦','乔装改扮','火影','异闻传说','科举','姐弟恋','阴差阳错','网王','猎人','七五','西方名著','职场','洪荒','齐神','性别转换','边缘恋歌','血族','异国奇缘','骑士与剑','封神','美娱','海贼王','死神','乡村爱情','圣斗士'],
            // 甜文/爽文/情有独钟/穿书/穿越时空/强强/娱乐圈/重生/豪门世家/快穿/系统/天之骄子/天作之合/种田文/都市情缘/仙侠修真/灵异神怪/无限流/宫廷侯爵/
            // 幻想空间/打脸/业界精英/励志人生/综漫/校园/年代文/女配/星际/女强/破镜重圆/欢喜冤家/文野/年下/竞技/悬疑推理/少年漫/直播/美食/异能/萌宠/咒回/
            // 升级流/现代架空/未来架空/游戏网游/生子/三教九流/江湖恩怨/清穿/基建/恐怖/复仇虐渣/成长/时代奇缘/婚恋/逆袭/青梅竹马/姻缘邂逅/相爱相杀/奇幻魔幻/
            // 西幻/恋爱合约/都市异闻/花季雨季/朝堂之上/机甲/前世今生/末世/科幻/东方玄幻/异想天开/古穿今/历史衍生/异世大陆/玄学/英美衍生/宫斗/时代新风/
            // 近水楼台/随身空间/灵魂转换/制服情缘/虐恋情深/传奇/布衣生活/超级英雄/大冒险/家教/西方罗曼/女扮男装/爱情战争/宅斗/民国旧影/古典名著/武侠/红楼梦/
            // 古代幻想/乔装改扮/火影/异闻传说/市井生活/科举/姐弟恋/平局青云/阴差阳错/少女漫/小门小户/网王/日韩/猎人/七五/史诗奇幻/魔法幻情/西方名著/职场/
            // 洪荒/经商/商战/黑篮/齐神/时尚流行/性别转换/边缘恋歌/血族/网红/奇谭/异国奇缘/港台/亡灵异族/七年之痒/聊斋/骑士与剑/封神/美娱/海贼王/死神/乡村爱情/
            // 银魂/网配/圣斗士/婆媳/SD/授权衍生
            
            // currently nonexistent labels: 萌宠 咒回 姻缘邂逅 恋爱合约 朝堂之上  大冒险  古代幻想  市井生活 平步青云
            // 少女漫 小门小户  日韩 史诗奇幻 魔法幻情 经商 商战 黑篮 时尚流行  网红 奇谭  港台 亡灵异族 七年之痒 聊斋  
            //   银魂 网配  婆媳 SD 授权衍生
            word_count: 0,
            rating: 0,
            rating_count: 0,
            filters_have_reset: true,
            search_string_array: []
        };
        this.handleOriginalityChange = this.handleOriginalityChange.bind(this);
        this.handleCompletionStatusChange = this.handleCompletionStatusChange.bind(this);
        this.handlePublicationStatusChange = this.handlePublicationStatusChange.bind(this);
        this.handleEraChange = this.handleEraChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleStyleChange = this.handleStyleChange.bind(this);
        this.handleContentLabelsChange = this.handleContentLabelsChange.bind(this);
        this.onResetFilters = this.onResetFilters.bind(this);
        this.filtersHaveReset = this.filtersHaveReset.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }
    
    handleOriginalityChange(new_originality) {
        this.setState({
            originality: new_originality
        });
    }
    
    handleCompletionStatusChange(new_completion_status) {
        this.setState({
            completion_status: new_completion_status
        });
    }
    
    handlePublicationStatusChange(new_publication_status) {
        this.setState({
            publication_status: new_publication_status
        });
    }
    
    handleEraChange(new_era) {
        this.setState({
            era: new_era
        })
    }
    
    handleTypeChange(new_type) {
        this.setState({
            type: new_type
        })
    }
    
    handleStyleChange(new_style) {
        this.setState({
            style: new_style
        })
    }
    
    handleContentLabelsChange(new_content_labels) {
        this.setState({
            content_labels: new_content_labels
        })
    }
    
    onResetFilters() {
        this.setState({
            filters_have_reset: false,
            originality: one_true_x_false(2),
            completion_status: one_true_x_false(2),
            publication_status: one_true_x_false(3),
            era: one_true_x_false(4),
            type: one_true_x_false(15),
            style: one_true_x_false(5),
            content_labels: one_true_x_false(114)
        });
    }
    
    filtersHaveReset() {
        this.setState({
            filters_have_reset: true
        })
    }
    
    handleSearchChange(value) {
        this.setState({
            search_string_array: value
        })
    }
    
    componentDidMount() {
		axios.get(`http://127.0.0.1:5000/api/all-novels`)
		  .then(res => {
            console.log('res.data["Novels"]:');
            console.log(res.data['Novels']);
            /*
            // find nonexistent content labels among novels in our database, so do not show them in content_labels filter.
            const names = ['甜文','爽文','情有独钟','穿书','穿越时空','强强','娱乐圈','重生','豪门世家','快穿','系统','天之骄子','天作之合','种田文','都市情缘','仙侠修真','灵异神怪','无限流','宫廷侯爵','幻想空间','打脸','业界精英','励志人生','综漫','校园','年代文','女配','星际','女强','破镜重圆','欢喜冤家','文野','年下','竞技','悬疑推理','少年漫','直播','美食','异能','萌宠','咒回','升级流','现代架空','未来架空','游戏网游','生子','三教九流','江湖恩怨','清穿','基建','恐怖','复仇虐渣','成长','时代奇缘','婚恋','逆袭','青梅竹马','姻缘邂逅','相爱相杀','奇幻魔幻','西幻','恋爱合约','都市异闻','花季雨季','朝堂之上','机甲','前世今生','末世','科幻','东方玄幻','异想天开','古穿今','历史衍生','异世大陆','玄学','英美衍生','宫斗','时代新风','近水楼台','随身空间','灵魂转换','制服情缘','虐恋情深','传奇','布衣生活','超级英雄','大冒险','家教','西方罗曼','女扮男装','爱情战争','宅斗','民国旧影','古典名著','武侠','红楼梦','古代幻想','乔装改扮','火影','异闻传说','市井生活','科举','姐弟恋','平局青云','阴差阳错','少女漫','小门小户','网王','日韩','猎人','七五','史诗奇幻','魔法幻情','西方名著','职场','洪荒','经商','商战','黑篮','齐神','时尚流行','性别转换','边缘恋歌','血族','网红','奇谭','异国奇缘','港台','亡灵异族','七年之痒','聊斋','骑士与剑','封神','美娱','海贼王','死神','乡村爱情','银魂','网配','圣斗士','婆媳','SD','授权衍生'];
            let counts = [];
            for (let i = 0; i < names.length; i++) {
                counts.push(0);
            }
            for (let i = 0; i < res.data['Novels'].length; i++) {
                console.log(res.data['Novels'][i]['content_labels']);
                for (let j = 0; j < res.data['Novels'][i]['content_labels'].length; j++) {
                    counts[names.indexOf(res.data['Novels'][i]['content_labels'][j])] += 1;
                }
            }
            for (let i = 0; i < names.length; i++) {
                if (counts[i] === 0) {
                    console.log(names[i], ': ', counts[i]);
                }
            }
            */
			this.setState({ data: res.data });
		  })
          .catch(function (error) {
            // handle error
            console.log("Failed to get novels from local api");
            console.log(error);
          })
	}
    
    render() {
        return (
            <div id="MainScreen">
                <Filters
                    onOriginalityChange={this.handleOriginalityChange}
                    onCompletionStatusChange={this.handleCompletionStatusChange}
                    onPublicationStatusChange={this.handlePublicationStatusChange}
                    onEraChange={this.handleEraChange}
                    onTypeChange={this.handleTypeChange}
                    onStyleChange={this.handleStyleChange}
                    onContentLabelsChange={this.handleContentLabelsChange}
                    originality_names={this.state.originality_names}
                    completion_status_names={this.state.completion_status_names}
                    publication_status_names={this.state.publication_status_names}
                    era_names={this.state.era_names}
                    style_names={this.state.style_names}
                    type_names={this.state.type_names}
                    content_labels_names={this.state.content_labels_names}
                    filtersHaveReset={this.filtersHaveReset}
                    filters_have_reset={this.state.filters_have_reset}
                />
                <ControlBar
                    onResetFilters={this.onResetFilters}
                />
                <SearchBar
                    onSearchChange={this.handleSearchChange}
                />
                <Gallery
                    data={this.state.data}
                    originality={this.state.originality}
                    originality_names={this.state.originality_names}
                    completion_status={this.state.completion_status}
                    completion_status_names={this.state.completion_status_names}
                    publication_status={this.state.publication_status}
                    publication_status_names={this.state.publication_status_names}
                    content_labels={this.state.content_labels}
                    content_labels_names={this.state.content_labels_names}
                    era={this.state.era}
                    era_names={this.state.era_names}
                    type={this.state.type}
                    type_names={this.state.type_names}
                    style={this.state.style}
                    style_names={this.state.style_names}
                    word_count={this.state.word_count}
                    rating={this.state.rating}
                    rating_count={this.state.rating_count}
                    search_string_array={this.state.search_string_array}
                />
            </div>
        )
    }   
}