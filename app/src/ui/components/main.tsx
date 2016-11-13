/**
 * Created by vito on 16/7/31.
 */
import React from 'react';
import {Table, Button} from 'antd';
import moment from 'moment';
import assign from 'object-assign';
import Component = React.Component;
import {TableColumnConfig, TableRowSelection} from "antd/lib/table/Table";

export interface MainProps {
    data: any,
    collapse: boolean
}

class Main extends Component<MainProps, any> {
    private columns: Array<TableColumnConfig<any>> = [{
        key: 'key',
        title: '文件名',
        dataIndex: 'key',
    }, {
        key: 'mimeType',
        title: '类型',
        dataIndex: 'mimeType',
    }, {
        key: 'hash',
        title: 'hash值',
        dataIndex: 'hash',
    }, {
        key: 'fsize',
        title: '大小',
        dataIndex: 'fsize',
    }, {
        key: 'putTime',
        title: '上传时间',
        dataIndex: 'putTime',
    }];
    private STORE_UNIT: Array<string> = ['B', 'K', 'M', 'G', 'T'];

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],  // 这里配置默认勾选列
            loading: false
        };
        this.onSelectChange = this.onSelectChange.bind(this);
        this.solveSize = this.solveSize.bind(this);
    }

    componentWillReceiveProps(nextProps: MainProps): void {
        this.setState({
            selectedRowKeys: [],  // 这里配置默认勾选列
            loading: false
        });
    }

    onSelectChange(selectedRowKeys: string[]): void {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys});
    }

    solveSize(size: number): string {
        for (let i = 1; size > 1024; i++) {
            size = size / 1024;
            if (size < 1024) {
                return size.toFixed(2) + this.STORE_UNIT[i];
            }
        }
        return size + this.STORE_UNIT[0];
    }

    render(): JSX.Element {
        let {data, collapse} = this.props;
        const {loading, selectedRowKeys} = this.state;
        let that = this;
        const rowSelection: TableRowSelection<any> = {
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
                    <Button
                        type="primary"
                        disabled={!hasSelected}
                        loading={loading}
                    >操作</Button>
                    <span style={{marginLeft: 8}}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
                </div>
                <Table
                    rowSelection={rowSelection}
                    columns={this.columns}
                    pagination={pagination}
                    dataSource={data.map(item=> assign({}, item, {
                               fsize: that.solveSize(item.fsize),
                               putTime: moment(new Date(item.putTime / 10000)).format('YYYY-MM-DD hh:mm:ss')
                           })
                       )}
                />
            </div>
        );
    }
}

export default Main;