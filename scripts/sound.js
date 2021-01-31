
class Sound {

  constructor(audio, src) {
    audio.src = src;
    this.play = audio.play.bind(audio);
    this.pause = audio.pause.bind(audio);
  }
}

export { Sound }