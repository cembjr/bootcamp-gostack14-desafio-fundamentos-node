import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = this.transactions.reduce(
      (accumulator: Balance, transaction: Transaction) => {
        accumulator.income +=
          transaction.type === 'income' ? transaction.value : 0;
        accumulator.outcome +=
          transaction.type === 'outcome' ? transaction.value : 0;
        accumulator.total +=
          transaction.value * (transaction.type === 'income' ? 1 : -1);

        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create(transaction: Transaction): Transaction {
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
