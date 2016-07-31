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
const SRORE_UNIT = [
    'B', 'K', 'M', 'G', 'T'
];

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
    componentWillReceiveProps: function (nextProps) {
        this.setState({
            selectedRowKeys: [],  // 这里配置默认勾选列
            loading: false
        });
    },

    solveSize(size){
        for (let i = 1; size > 1024; i++) {
            size = size / 1024;
            if (size < 1024) {
                return size.toFixed(2) + SRORE_UNIT[i];
            }
        }
        return size + SRORE_UNIT[0];
    },

    render() {
        let {data, collapse} = this.props;
        const {loading, selectedRowKeys} = this.state;
        let that = this;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        const pagination = {
            total: data.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                console.log('Current: ', current);
            },
        };
        return (
            <div className={collapse ? "main-collapse" : "main"}>
                <div style={{marginBottom: 16}}>
                    <Button type="primary" onClick={this.start}
                            disabled={!hasSelected} loading={loading}
                    >操作</Button>
                    <span style={{marginLeft: 8}}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
                </div>
                <Table rowSelection={rowSelection} columns={columns}
                       pagination={pagination}
                       dataSource={data.map(item=> Object.assign({}, item, {
                               fsize: that.solveSize(item.fsize),
                               putTime: moment(new Date(item.putTime / 10000)).format('YYYY-MM-DD hh:mm:ss')
                           })
                       )}
                />
            </div>
        );
    },
});

export default Main;