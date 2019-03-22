import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './Typing.css';

export default class componentName extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired
  }

  state = {
    index: 0,
    currentInputText: '',
    inputText: []
  }

  inputTextConvertArray() {
    const textLen = this.props.text.length;
    console.log(textLen);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <section className="typing" onClick={() => this.inputTextConvertArray()}>
        <pre
          className="text"
          // onKeyPress={this.handleKeydown}
        >
          {this.props.text}
        </pre>
      </section>
    )
  }
}
