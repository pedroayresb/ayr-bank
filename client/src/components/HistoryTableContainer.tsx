import React, { useContext } from 'react';
import AyrContext from '../context/AyrContext';
import { AyrContextInterface } from '../interfaces/UserInterface';
import { historyTranslation } from '../utils/historyTranslation';
import toDate from '../utils/dateManipulation';

function HistoryTable() {
  const { history, language } = useContext(AyrContext) as AyrContextInterface;

  return (
    <table>
      <thead>
        <tr>
          <th>{ historyTranslation[language].Value }</th>
          <th>{ historyTranslation[language].Send }</th>
          <th>{ historyTranslation[language].Receive }</th>
          <th>{ historyTranslation[language].Date }</th>
        </tr>
      </thead>
      <tbody>
        {history!.length > 0 ? (
          history?.map((transaction) => (
            <tr key={transaction.id}>
              <td>${transaction.value.toFixed(2)}</td>
              <td>{transaction.sender}</td>
              <td>{transaction.receiver}</td>
              <td>{toDate(transaction.createdAt)}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>{ historyTranslation[language].NoHistory }</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default HistoryTable;