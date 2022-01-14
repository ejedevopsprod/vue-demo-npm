export default class TreeNode {
  constructor(type, direction, x, y, message, time) {
    this.type = type;
    this.direction = direction;
    this.anchor = { x, y };
    this.message = message;
    this.time = time;
    this.descendants = [];
    this.game = null;
    this.isLast = false;
    this.quotes = [];
    this.audio = null;
  }
}
