/**
 * Created by vito on 16/7/31.
 */
import React from 'react';
import {Input, Button} from 'antd';
import classNames from 'classnames';
import Component = React.Component;
const InputGroup = Input.Group;

interface SearchInputProps {
    placeholder: string,
    onSearch(value: string): void,
    style?: React.CSSProperties;
}
class SearchInput extends Component<SearchInputProps,any> {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            focus: false,
        };
    }

    handleInputChange(e): void {
        this.setState({
            value: e.target.value,
        });
        if (this.props.onSearch) {
            this.props.onSearch(e.target.value);
        }
    }

    handleFocusBlur(e): void {
        this.setState({
            focus: e.target === document.activeElement,
        });
    }

    handleSearch(): void {
        if (this.props.onSearch) {
            this.props.onSearch(this.state.value);
        }
    }

    render(): JSX.Element {
        const {style, placeholder} = this.props;
        const btnCls = classNames({
            'ant-search-btn': true,
            'ant-search-btn-noempty': !!this.state.value.trim(),
        });
        const searchCls = classNames({
            'ant-search-input': true,
            'ant-search-input-focus': this.state.focus,
        });
        return (
            <div className="ant-search-input-wrapper" style={style}>
                <InputGroup className={searchCls}>
                    <Input
                        className="menu-search-input"
                        placeholder={placeholder} value={this.state.value}
                        onChange={this.handleInputChange}
                        onFocus={this.handleFocusBlur}
                        onBlur={this.handleFocusBlur}
                        onPressEnter={this.handleSearch}
                    />
                    <div className="ant-input-group-wrap">
                        <Button icon="search" className={btnCls} onClick={this.handleSearch}/>
                    </div>
                </InputGroup>
            </div>
        );
    }
}

export default SearchInput;