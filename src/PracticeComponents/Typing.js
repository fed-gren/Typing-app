import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Typing.css';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  state = {
    currentIndex: 0,
    currentInputText: '',
    inputText: [],
    currrentScrollHeight: 0
  }

  textConvertArray() {
    const textLen = this.props.text.length;
    // console.log(textLen);
    for(var i = 0; i < textLen; i+=1) {
      if(this.props.text[i] === '\n') {
        this.state.inputText.push('↵');
        this.state.inputText.push('\n');
      } 
      else this.state.inputText.push(this.props.text[i]);
    }
    // console.log(this.state.inputText);
  }

  moveScroll() {
    if(this.state.inputText[this.state.currentIndex] === '\n') {
      const typing_section = document.querySelector('.typing');
      if(this.state.currrentScrollHeight === 0) {
          typing_section.scrollTop = 30;
      }
      else {
        typing_section.scrollTop = this.state.currrentScrollHeight + 24;
        
      }
      this.setState({
        currrentScrollHeight: typing_section.scrollTop
      })
    }
  }

  checkInputTextMatching() {
    if(this.state.inputText.length <= this.state.currentIndex) {

      return;
    } 
    if(this._isMounted === false) return;

    if(this.state.currentInputText === 'Enter') {
      if(this._isMounted) {
        this.setState({
          currentInputText: '↵'
        })
      }
    } 
    // console.log(`입력해야 할 텍스트 : ${this.state.inputText[this.state.currentIndex]}  입력한 텍스트 : ${this.state.currentInputText}`);
    if(this.state.inputText[this.state.currentIndex] === this.state.currentInputText) {
      // console.log('일치합니다.');
      let currentCh_span = document.getElementById(`${this.state.currentIndex}`);
      currentCh_span.classList.remove('current');
      currentCh_span.classList.add('correct');

      if(currentCh_span.classList.contains('incorrect')) currentCh_span.classList.remove('incorrect');
      if(this._isMounted) {
        this.setState({
          currentIndex: this.state.currentIndex + 1
        });
      }
      if(this.state.inputText.length <= this.state.currentIndex) return;
      currentCh_span = document.getElementById(`${this.state.currentIndex}`);
      currentCh_span.classList.add('current');
      this.moveScroll();
    } else {
      // console.log('불일치 합니다.');
      let currentCh_span = document.getElementById(`${this.state.currentIndex}`);
      currentCh_span.classList.add('incorrect');
    }
    //엔터 처리
    if(this.state.currentInputText === '↵') {
      // this.state.currentInputText = '\n';
      if(this._isMounted) {
        this.setState({
          currentInputText: '\n'
        })
      }
      this.checkInputTextMatching();
    }
  }

  componentWillMount() {
    this.textConvertArray();
    // console.log(`current index : ${this.state.currentIndex}`);
  }

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener('keydown', (e) => {
      if('Shift' === e.key) return;
      if((e.keyCode || e.which) === 32) e.preventDefault();  //prevent spacebar scroll
      if(this._isMounted) {
        this.setState({
          currentInputText: e.key
        })
        this.checkInputTextMatching();
      }
    });
    const currentCh_span = document.getElementById(`${this.state.currentIndex}`);
    currentCh_span.classList.add('current');
  }

  componentWillUnmount() {
    this._isMounted = false; //수정해야함.
  }

  render() {
    return (
      <section className="typing">
        <pre className="text">
          {this.state.inputText.map((ch, idx) => {
            return <span className='ch' id={idx} key={idx}>{ch}</span>
          })}
        </pre>
      </section>
    )
  }
}
