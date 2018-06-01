import React, { Component } from 'react';
import Highlight from 'react-highlight';

export default class Code extends Component {

    render() {
        return <Highlight className={[this.props.code || "javascript", "hlinject"].join(" ")}>{this.props.children}</Highlight>
    }

}