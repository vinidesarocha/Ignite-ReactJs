import React from 'react';
import { Summary } from '../Summary';
import { TransactionTable } from '../TransactioTable';
import { Container } from './styles';

export const Dashboard: React.FC = () => {
  return (
    <Container>
      <Summary />
      <TransactionTable />
    </Container>
  );
};
