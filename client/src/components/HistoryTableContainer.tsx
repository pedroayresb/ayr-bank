import React, { useContext } from 'react';
import AyrContext from '../context/AyrContext';
import { AyrContextInterface } from '../interfaces/UserInterface';

function HistoryTable() {
  const { history } = useContext(AyrContext) as AyrContextInterface;

  return (
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>From</th>
          <th>To</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {history?.map((transaction) => (
          <tr key={transaction.id}>
            <td>${transaction!.value.toFixed(2)}</td>
            <td>{transaction!.debitedAccount}</td>
            <td>{transaction!.creditedAccount}</td>
            <td>{transaction!.createdAt.toString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default HistoryTable;