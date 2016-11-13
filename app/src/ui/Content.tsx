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

class Content extends Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            tableItems: [],
            collapse: true,
        };
        this.onCollapseChange = this.onCollapseChange.bind(this);
        this.handleGetItems = this.handleGetItems.bind(this);
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

    //e :{ eventKey, domEvent }
    handleGetItems(items): void {
        console.log(items);
        this.setState({
            tableItems: items,
        });
    }

    render(): JSX.Element {
        let {tableItems, collapse} = this.state;
        return (
            <div className="gutter-example">
                <Row gutter={16}>
                    <Col className="gutter-row" sm={6} md={4}>
                        <Sider
                            cbItems={this.handleGetItems}
                            collapse={collapse}
                            onCollapseChange={this.onCollapseChange}
                        />
                    </Col>
                    <Col className="gutter-row" sm={18} md={20}>
                        <Main
                            data={tableItems}
                            collapse={collapse}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Content;