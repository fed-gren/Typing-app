import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Typing.css';

export default class componentName extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  state = {
    currentIndex: 0,
    currentInputText: '',
    inputText: []
  }

  textConvertArray() {
    const textLen = this.props.text.length;
    console.log(textLen);
    for(var i = 0; i < textLen; i+=1) {
      this.state.inputText.push(this.props.text[i]);
    }
    console.log(this.state.inputText);
  }

  checkInputTextMatching() {
    if(this.state.inputText.length <= this.state.currentIndex) return;
    console.log(`입력해야 할 텍스트 : ${this.state.inputText[this.state.currentIndex]}  입력한 텍스트 : ${this.state.currentInputText}`);
    if(this.state.inputText[this.state.currentIndex] === this.state.currentInputText) {
      console.log('일치합니다.');
      this.setState({
        currentIndex: this.state.currentIndex + 1
      });
    } else {
      console.log('불일치 합니다.');
    }
  }

  componentWillMount() {
    this.textConvertArray();
    window.addEventListener('keydown', (e) => {
      if('Shift' === e.key) return;
      this.state.currentInputText = e.key;
      this.checkInputTextMatching();
    });
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <section className="typing">
        <pre className="text">
          {this.state.inputText.map((ch, idx) => {
            return <span className="ch" key={idx}>{ch}</span>
          })}
        </pre>
      </section>
    )
  }
}
