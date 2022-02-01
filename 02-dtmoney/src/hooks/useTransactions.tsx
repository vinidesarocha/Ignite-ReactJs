import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import { api } from '../services/api';

interface TransactionProps {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createAt: string;
}

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: TransactionProps[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<TransactionProps, 'id' | 'createAt'>;

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransaction] = useState<TransactionProps[]>([]);

  useEffect(() => {
    api
      .get('transactions')
      .then((response) => setTransaction(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createAt: new Date(),
    });
    const { transaction } = response.data;

    setTransaction([...transactions, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
