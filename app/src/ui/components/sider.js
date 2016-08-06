/**
 * Created by vito on 16/7/30.
 */
import React from 'react';
import {Menu, Icon} from 'antd';
import SearchInput from './search';
var ipcRenderer = require('electron').ipcRenderer;

const Sider = React.createClass({
    getInitialState() {
        return {
            current: '-1',
            buckets: [],
            bucketsOnShow: []
        };
    },

    handleClick(e) {
        this.setState({
            current: e.key
        });
        const {bucketsOnShow} = this.state;
        const {cbItems} = this.props;
        ipcRenderer.send('list_file', bucketsOnShow[e.key]);
        ipcRenderer.on('list_file-reply', (err, ret)=> {
            cbItems(ret.items);
        })
    },

    handleFilter(keyword){
        const {buckets} = this.state;
        this.setState({
            bucketsOnShow: buckets.filter(item=>
                item.indexOf(keyword) !== -1
            )
        });
    },

    componentDidMount(){
        ipcRenderer.send('buckets');
        ipcRenderer.on('buckets-reply', (err, ret)=> {
            this.setState({
                buckets: ret,
                bucketsOnShow: ret
            });
        })
    },

    render() {
        const {bucketsOnShow} = this.state;
        const {collapse, onCollapseChange} = this.props;
        let subMenus = [];
        if (bucketsOnShow) {
            subMenus = bucketsOnShow.map((item, index)=>
                <Menu.Item key={index}>
                    {<span><Icon type="folder" className="menu-item-icon"/><span
                        className="menu-item-text">{item}</span></span>}
                </Menu.Item>
            );
        }
        return (
            <div className={collapse ? "sider-collapse" : "sider-fixed"}>
                <Menu onClick={this.handleClick}
                      defaultOpenKeys={['sub1']}
                      selectedKeys={[this.state.current]}
                      mode="inline"
                      theme="dark"
                >
                    <div className="menu-log"><img src="dist/image/qiniu.png" className="logo-img"/>
                        <div className="logo-text">空间</div>
                    </div>
                    <SearchInput placeholder="输入关键词"
                                 onSearch={this.handleFilter} style={collapse ? {width: 32} : {width: 200}}
                    />
                    {subMenus}
                </Menu>
                <div className="sider-action" onClick={onCollapseChange}>
                    {collapse ? <Icon type="right"/> : <Icon type="left"/>}
                </div>
            </div>
        );
    },
});

export default Sider;