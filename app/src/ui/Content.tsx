/**
 * Created by vito on 16/7/27.
 */
'use strict';
import React from 'react';
import {Row, Col} from 'antd';
import Electron from 'electron';
import Sider from './components/sider';
import Main from './components/main';
import Component = React.Component;

const ipcRenderer = Electron.ipcRenderer;

// export interface FileData {
//     fsize?: number,
//     hash?: string,
//     key?: string,
//     miniType?: string,
//     putTime: number
// }

class Content extends Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: '',
            collapse: true,
            buckets: [],
            fileData: [],
            loading: false
        };
        this.onCollapseChange = this.onCollapseChange.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
    }

    handleSubmit(e): void {
        e.preventDefault();
        let {Access_Key, Secret_Key} = this.props.form.getFieldsValue();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        ipcRenderer.send('login', Access_Key, Secret_Key);
    }

    onCollapseChange(): void {
        this.setState({
            collapse: !this.state.collapse,
        })
    }

    handleSelected(item: string): void {
        ipcRenderer.send('list_file', item);
        this.setState({
            loading: true,
            selectedItem: item
        });
        ipcRenderer.once('list_file-res', (err, ret) => {
            this.setState({
                loading: false,
                fileData: ret.items
            });
        })
    }

    componentDidMount(): void {
        ipcRenderer.send('buckets');
        ipcRenderer.once('buckets-res', (err, ret) => {
            this.setState({buckets: ret});
        })
    }

    render() {
        let {fileData, collapse, buckets, loading} = this.state;
        return (
            <div className="gutter-example">
                <Row gutter={16}>
                    <Col className="gutter-row" sm={6} md={4}>
                        <Sider
                            buckets={buckets}
                            handleSelected={this.handleSelected}
                            collapse={collapse}
                            onCollapseChange={this.onCollapseChange}
                        />
                    </Col>
                    <Col className="gutter-row" sm={18} md={20}>
                        <Main
                            loading={loading}
                            data={fileData}
                            collapse={collapse}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Content;