/**
 * Created by vito on 16/7/30.
 */
import React from 'react';
import {Menu, Icon} from 'antd';
var ipcRenderer = require('electron').ipcRenderer;

const Sider = React.createClass({
    getInitialState() {
        return {
            current: '-1',
            buckets: []
        };
    },

    handleClick(e) {
        this.setState({
            current: e.key
        });
        const {buckets} = this.state;
        const {cbItems} = this.props;
        ipcRenderer.send('list_file', buckets[e.key]);
        ipcRenderer.on('list_file-reply', (err, ret)=> {
            cbItems(ret.items);
        })
    },

    componentDidMount(){
        ipcRenderer.send('buckets');
        ipcRenderer.on('buckets-reply', (err, ret)=> {
            this.setState({
                buckets: ret,
            });
        })
    },

    render() {
        const {buckets} = this.state;
        let subMenus = [];
        if (buckets) {
            subMenus = buckets.map((item, index)=>
                <Menu.Item key={index}>
                    {<span><Icon type="appstore"/><span>{item}</span></span>}
                </Menu.Item>
            );
        }
        return (
            <div className="sider">
                <div className="sider-fixed">
                    <Menu onClick={this.handleClick}
                          defaultOpenKeys={['sub1']}
                          selectedKeys={[this.state.current]}
                          mode="inline"
                          theme="dark"
                    >
                        {subMenus}
                    </Menu>
                </div>
            </div>
        );
    },
});

export default Sider;