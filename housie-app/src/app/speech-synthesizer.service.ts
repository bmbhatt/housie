import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpeechSynthesizerService {

  message: SpeechSynthesisUtterance;

  constructor() {
    this.initSynthesis();
  }

  initSynthesis(): void {
    this.message = new SpeechSynthesisUtterance();
    this.message.volume = 2;
    this.message.rate = 1;
    this.message.pitch = 0.2;
    let s = this.setSpeech();
    s.then((voices) => {
      this.message.voice = voices[1];
    });
  }

  speak(message: string, language: string): void {
    this.message.lang = language;
    this.message.text = message;
    speechSynthesis.speak(this.message);
  }

  parap(num) {
    var msg;
    var one = Math.floor(num / 10);
    var two = num % 10;
    if (one === 0) {
      msg = 'only number ' + this.now(two);
    } else {
      msg = this.now(one) + ' ' + this.now(two) + ' ' + num;
    }
    return msg;
  }

  now(no) {
    switch (no) {
      case 1: return "one";
      case 2: return "two";
      case 3: return "three";
      case 4: return "four";
      case 5: return "five";
      case 6: return "six";
      case 7: return "seven";
      case 8: return "eight";
      case 9: return "nine";
      case 0: return "zero";
    }
  }

  setSpeech() {
    return new Promise(
        function (resolve, reject) {
            let synth = window.speechSynthesis;
            let id;

            id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                }
            }, 10);
        }
    )
  }
}
