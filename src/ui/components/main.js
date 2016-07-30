/**
 * Created by vito on 16/7/31.
 */
/**
 * Created by vito on 16/7/30.
 */
import React from 'react';
import {Menu, Icon, Table, Button} from 'antd';
import moment from 'moment';

const columns = [{
    title: '文件名',
    dataIndex: 'key',
}, {
    title: '类型',
    dataIndex: 'mimeType',
}, {
    title: 'hash值',
    dataIndex: 'hash',
}, {
    title: '大小',
    dataIndex: 'fsize',
}, {
    title: '上传时间',
    dataIndex: 'putTime',
}];

const Main = React.createClass({
    getInitialState() {
        return {
            selectedRowKeys: [],  // 这里配置默认勾选列
            loading: false
        };
    },
    onSelectChange(selectedRowKeys) {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    },
    render() {
        let {data} = this.props;
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <div className="sider">
                <div style={{marginBottom: 16}}>
                    <Button type="primary" onClick={this.start}
                            disabled={!hasSelected} loading={loading}
                    >操作</Button>
                    <span style={{marginLeft: 8}}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
                </div>
                <Table rowSelection={rowSelection} columns={columns}
                       dataSource={data.map(item=> Object.assign({}, item, {
                               fsize: item.fsize / 1000 + 'k',
                               putTime: moment(new Date(item.putTime / 10000)).format('YYYY-MM-DD hh:mm:ss')
                           })
                       )}/>
            </div>
        );
    },
});

export default Main;