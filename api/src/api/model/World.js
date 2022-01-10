class World {
  constructor(index) {
    this._index = index;
    this._score = 0;
    this._time = 0;
    this._status = !index;
  }

  get Score() {
    return this._score;
  }
  set Score(value) {
    this._score = value;
  }

  get Time() {
    return this._score;
  }
  set Time(value) {
    this._time = value;
  }

  get Status() {
    return this._score;
  }
  set Status(value) {
    this._score = value;
  }
}

module.exports = World;
