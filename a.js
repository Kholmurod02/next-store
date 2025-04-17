class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;
    this._balance = balance; // "_" означает, что это "внутреннее" свойство
  }

  // Метод для получения баланса
  getBalance() {
    return this._balance;
  }

  // Метод для пополнения
  deposit(amount) {
    if (amount > 0) {
      this._balance += amount;
    }
  }
}

const account = new BankAccount('Аня', 1000);
console.log(account.getBalance()); // 1000

account.deposit(500);
console.log(account.getBalance()); // 1500
