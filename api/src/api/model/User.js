class User {
  constructor(userName, email, empNumber, role) {
    this._userName = userName;
    this._email = email;
    this._empNumber = empNumber;
    this._role = role;
  }

  get UserName() {
    return this._userName;
  }

  get Email() {
    return this._email;
  }

  get EmpNumber() {
    return this._empNumber;
  }

  get Role() {
    return this._role;
  }
  set Role(value) {
    this._role = value;
  }
}

module.exports = User;
