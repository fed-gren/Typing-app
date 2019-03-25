import React, { Component } from "react";
import "./App.css";
import Title from "./StartComponents/Title";
import TextInput from "./StartComponents/TextInput";
import StartBtn from "./StartComponents/StartButton";
import Typing from "./PracticeComponents/Typing";
import Keyboard from "./PracticeComponents/Keyboard";
import BackBtn from "./PracticeComponents/BackButton";
import Message from "./Message";

class App extends Component {
  state = {
    text: '',
    isStart: true,
  };

  checkKorean() {
    const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const result = regex.test(this.state.text);
    // if(result) console.log('한글있..음..');
    return result;
  }

  handleChangeTextarea(input) {
    // let inputText = this.textInput.state.text;
    this.setState({
      text: input,
      isStart: true
    });
  };

  handleStartClick = () => {
    if (this.state.text) {
      // console.log('App start!');
      // console.log(this.state.text);

      //입력 문자 중 영문, 특수문자, 숫자 외 다른 문자가 있으면 종료
      if(this.checkKorean()) {
        this.message.showMessage('아직은 한글 지원을 안해요우 ㅠ');
        return;
      }

    } else {
      // console.log("There is any text.");
      // alert('연습할 텍스트를 입력해주세요!');
      this.message.showMessage('연습할 텍스트를 입력해주세요.');  //ref를 잘못 사용한 예시..?
      return;
    }

    this.setState({
      isStart: false
    })
  };

  handleBackClick = () => {
    this.setState({
      isStart: true,
      text: ''
    });
  }

  render() {
    return (
      <div
        className="App"
      >
        <Title />
        {this.state.isStart &&
          <TextInput
            handleChangeTextarea={this.handleChangeTextarea.bind(this)}
          />
        }
        {this.state.isStart &&
          <StartBtn handleStartClick={this.handleStartClick.bind(this)} />
        }
        {!this.state.isStart &&
          <Typing
            text={this.state.text}
          />
        }
        {!this.state.isStart &&
          <Keyboard ref={ref => (this.keyboard = ref)}/>
        }

        {!this.state.isStart &&
          <BackBtn handleBackClick={this.handleBackClick.bind(this)}/>
        }

        <Message 
        message={this.state.message}
        ref={ref => (this.message = ref)}
        />
      </div>
    );
  }
}

export default App;
