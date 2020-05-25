import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
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
