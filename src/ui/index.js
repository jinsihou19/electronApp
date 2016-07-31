/**
 * Created by vito on 16/7/27.
 */
'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
import {Form, Input, Button, Checkbox} from 'antd';
import {Row, Col} from 'antd';
var ipcRenderer = require('electron').ipcRenderer;
import Sider from './components/sider';
import Main from './components/main';

let Demo = React.createClass({
    getInitialState() {
        return {
            tableItems: [],
            collapse: true,
        };
    },
    handleSubmit(e) {
        e.preventDefault();
        let {Access_Key, Secret_Key} = this.props.form.getFieldsValue();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        ipcRenderer.send('login', Access_Key, Secret_Key);
    },

    onCollapseChange() {
        this.setState({
            collapse: !this.state.collapse,
        })
    },

    //e :{ eventKey, domEvent }
    handleGetItems(items){
        console.log(items);
        this.setState({
            tableItems: items,
        });
    },

    render() {
        let {tableItems, collapse} = this.state;
        return (
            <div className="gutter-example">
                <Row gutter={16}>
                    <Col className="gutter-row" sm={6} md={4}>
                        <Sider cbItems={this.handleGetItems} collapse={collapse} onCollapseChange={this.onCollapseChange}/>
                    </Col>
                    <Col className="gutter-row" sm={18} md={20}>
                        <Main data={tableItems} collapse={collapse}/>
                    </Col>
                </Row>
            </div>
        );
    },
});

Demo = Form.create()(Demo);
let mountNode = document.getElementById('main');
ReactDOM.render(<Demo />, mountNode);