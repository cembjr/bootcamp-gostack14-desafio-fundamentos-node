import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { response } from 'express';

interface Request {
  title: string;

  value: number;

  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title, value, type}: Request): Transaction {

    if(type === 'outcome' && this.transactionsRepository.getBalance().total < value)
      throw new Error('you have no balance for this operation');

    return this.transactionsRepository.create(new Transaction({title, value, type}));
  }
}

export default CreateTransactionService;
