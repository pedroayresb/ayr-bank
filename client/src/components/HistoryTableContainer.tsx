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
          <th className='p-7 text-dark-purple'>{ historyTranslation[language].Value }</th>
          <th className='p-7 text-dark-purple'>{ historyTranslation[language].Send }</th>
          <th className='p-7 text-dark-purple'>{ historyTranslation[language].Receive }</th>
          <th className='p-7 text-dark-purple'>{ historyTranslation[language].Date }</th>
        </tr>
      </thead>
      <tbody>
        {history!.length > 0 ? (
          history?.map((transaction) => (
            <tr key={transaction.id}>
              <td className='text-center p-5'>${transaction.value.toFixed(2)}</td>
              <td className='text-center p-5'>{transaction.sender}</td>
              <td className='text-center p-5'>{transaction.receiver}</td>
              <td className='text-center p-5'>{toDate(transaction.createdAt)}</td>
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