import React, { Component } from 'react';
import Progress from './Components/Progress';
import Code from './Components/Code';
import './App.css';

export default class App extends Component {
    render() {
        return ( 
            <div className="page">
                <header>
                    <div className="header">
                        <nav><div className="nav"><a>Demo</a></div></nav>
                        <span>
                            <li>Home</li>
                            <li>Progress</li>
                        </span>
                        <h1>Progress Example</h1>
                        <small>这是一个进度条的样例页面.</small>
                    </div>
                </header>

                <div className="content">
                    <h2>展示</h2>
                    <p>下面将展示一些简单的使用方法:</p>
                    <br />

                    <h4>a. 默认设置</h4>
                    <Progress value={50}/>
                    <Code>{`<Progress value={50}/>`}</Code>
                    <br />

                    <h4>b. 自定义颜色, 允许点击主动改变进度</h4>
                    <Progress value={50} color="#91ff91" moveable/>
                    <Code>{`<Progress value={50} color="#91ff91" moveable/>`}</Code>
                    <br />

                    <h4>c. 自定义颜色, 允许点击主动改变进度, 允许拖动</h4>
                    <Progress value={50} color="pink" moveable={(v,b)=>console.log(v,b)} controller/>
                    <Code>{`<Progress value={50} color="pink" moveable={(v,b)=>console.log(v,b)} controller/>`}</Code>
                    <br />

                    <h4>d. 自定义颜色, 允许点击主动改变进度, 允许拖动, 那么大进度条</h4>
                    <Progress value={50} color="#ffdbac" size={3} moveable controller/>
                    <Code>{`<Progress value={50} color="#ffdbac" size={3} moveable controller/>`}</Code>
                </div>

                <footer>
                    ❤️<br /><br />
                    Build with React, Made By <a href="https://github.com/NHibiki">NHibiki</a>.
                </footer>
            </div>
        );
    }
}