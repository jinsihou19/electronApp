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
            tableItems: []
        };
    },
    handleSubmit(e) {
        e.preventDefault();
        let {Access_Key, Secret_Key} = this.props.form.getFieldsValue();
        console.log('收到表单值：', this.props.form.getFieldsValue());
        ipcRenderer.send('login', Access_Key, Secret_Key);
    },

    //e :{ eventKey, domEvent }
    handleGetItems(items){
        console.log(items);
        this.setState({
            tableItems: items,
        });
    },

    render() {
        let {tableItems} = this.state;
        return (
            <div className="gutter-example">
                <Row gutter={16}>
                    <Col className="gutter-row" span={6}>
                        <Sider cbItems={this.handleGetItems}/>
                    </Col>
                    <Col className="gutter-row" span={18}>
                        <Main data={tableItems}/>
                    </Col>
                </Row>
            </div>
        );
    },
});

Demo = Form.create()(Demo);
let mountNode = document.getElementById('main');
ReactDOM.render(<Demo />, mountNode);