/**
 * Created by vito on 16/7/30.
 */
import React from 'react';
import {Menu, Icon} from 'antd';
import Electron from 'electron';
import Component = React.Component;
import SearchInput from "./search";

const ipcRenderer = Electron.ipcRenderer;

interface SiderProps {
    cbItems(items: any): void,
    collapse: boolean,
    onCollapseChange(e: any): void
}

class Sider extends Component<SiderProps,any> {
    constructor(props) {
        super(props);
        this.state = {
            current: '-1',
            buckets: [],
            bucketsOnShow: []
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e): void {
        this.setState({
            current: e.key
        });
        const {bucketsOnShow} = this.state;
        const {cbItems} = this.props;
        ipcRenderer.send('list_file', bucketsOnShow[e.key]);
        ipcRenderer.on('list_file-reply', (err, ret) => {
            cbItems(ret.items);
        })
    }

    handleFilter(keyword): void {
        const {buckets} = this.state;
        this.setState({
            bucketsOnShow: buckets.filter(item=>
                item.indexOf(keyword) !== -1
            )
        });
    }

    componentDidMount(): void {
        ipcRenderer.send('buckets');
        ipcRenderer.on('buckets-reply', (err, ret)=> {
            this.setState({
                buckets: ret,
                bucketsOnShow: ret
            });
        })
    }

    render(): JSX.Element {
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
                <Menu
                    onClick={this.handleClick}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[this.state.current]}
                    mode="inline"
                    theme="dark"
                >
                    <div className="menu-log">
                        <img src="res/image/qiniu.png" className="logo-img"/>
                        <div className="logo-text">空间</div>
                    </div>
                    <SearchInput
                        placeholder="输入关键词"
                        onSearch={this.handleFilter}
                        style={collapse ? {width: 32} : {width: 200}}
                    />
                    {subMenus}
                </Menu>
                <div className="sider-action" onClick={onCollapseChange}>
                    {collapse ? <Icon type="right"/> : <Icon type="left"/>}
                </div>
            </div>
        );
    }
}

export default Sider;