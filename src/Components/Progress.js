import React, { Component } from 'react';

export default class Progress extends Component {

    constructor(props) {
        super(props);
        this.body = null;
        this.ready = false;
        this.state = {
            value: props.value || 0,
            color: props.color || "#666",
            size: props.size || 2,
            animation: props.animation || false,
            moveable:  props.moveable ? true : false,
            controller: props.controller || false,
            focused: false,
        }
    }

    handleStartMove(event) {
        if (!this.state.moveable || !this.body || !this.ready || this.state.focused) return;
        this.setState({focused: true}); 
        if (event.type !== "touchstart") event.preventDefault(); 
    }
    handleEndMove(event) {
        if (!this.state.moveable || !this.body || !this.ready || !this.state.focused) return;
        this.setState({focused: false}); 
        if (event.type !== "touchend") event.preventDefault(); 
        this.props.moveable && this.props.moveable.call && this.props.moveable.call(this, this.state.value, false);
    }

    handleMove(event) {
        if (!this.state.moveable || !this.body || !this.ready) return;
        if (event.type === "mousemove" && !this.state.focused) return;
        if (event.type === "click") this.setState({focused: false});
        if (event.type !== "touchmove") event.preventDefault();
        
        let offsetLeft = 0;
        let parent = this.body;
        while(parent) {
            offsetLeft += parent.offsetLeft;
            parent = parent.offsetParent;
        }
        
        let pageX = event.pageX;
        if (event.type === "touchmove") pageX = event.touches[0].pageX;
        let value = 100 * (pageX - offsetLeft) / this.body.offsetWidth;
        value = value > 100 ? 100 : value < 0 ? 0 : value;
        this.setState({value});
        
        this.props.moveable && this.props.moveable.call && this.props.moveable.call(this, value, this.state.focused);
    }

    componentDidMount() {this.ready=true;}

    render() {
        let unitSize   = Math.floor(this.state.size);
        let borderSize = unitSize * 2;
        let coinSize   = unitSize * 5;
        let innerSize  = unitSize * 3;
        let totalHeight = this.state.size * 2 + innerSize + borderSize * 2;
        let {focused} = this.state;
        if (focused) {borderSize -= 1; innerSize += 2;}
        return (<div style={{
            // overflow: "hidden", 
            position: "relative", 
            height: this.state.size * 2 + innerSize + borderSize * 2, 
            background: "white",
            cursor: this.state.moveable ? "pointer" : "default",
            margin: `${coinSize/2+innerSize/2}px 0`,
            transition: ".3s ease"
            }} 
            onClick={this.handleMove.bind(this)}
            onTouchMove={this.handleMove.bind(this)}
            onMouseMove={this.handleMove.bind(this)}
            onTouchCancel={this.handleEndMove.bind(this)}
            onMouseLeave={this.handleEndMove.bind(this)}
            ref={r=>this.body=r}>
            <div style={{
                position: "absolute",
                width: "100%", height: this.state.size * 2,
                borderRadius: this.state.size * 2,
                backgroundColor: this.state.color,
                top: totalHeight/2 - this.state.size,
                opacity: .4,
            }}></div>
            <span style={{
                position: "absolute", display: "block",
                width: `${this.state.value}%`, height: this.state.size * 2,
                top: totalHeight/2 - this.state.size, left: 0,
                borderRadius: this.state.size * 2,
                backgroundColor: this.state.color,
                opacity: 1,
                transition: ".1s linear"
            }}></span>
            {this.state.controller ? 
                <li style={{
                    position: "absolute", display: "block",
                    top: -coinSize/2 -borderSize/2 + totalHeight/2 - this.state.size, left: `calc(${this.state.value}% - ${this.state.size + coinSize/2}px)`, 
                    width: this.state.size * 2 + innerSize, height: this.state.size * 2 + innerSize,
                    borderRadius: this.state.size * 2 + coinSize,
                    backgroundColor: this.state.color,
                    border: `white ${borderSize}px solid`,
                    opacity: focused ? .8 : 1,
                    boxShadow: `0 0 ${focused ? 5 : 20}px ${this.state.color}`,
                    transition: ".1s linear"
                }} onTouchStart={this.handleStartMove.bind(this)}
                   onMouseDown={this.handleStartMove.bind(this)}
                   onTouchEnd={this.handleEndMove.bind(this)}
                   onMouseUp={this.handleEndMove.bind(this)}></li>
            : null}
        </div>)
    }

}