import * as React from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import '../styles/HistoryCard.css';

type accountName = string;

interface TransactionModel {
  value: number;
  creditedAccount: number;
  debitedAccount: number;
  createdAt: any;
}


function HistoryCard(props: TransactionModel) {
  const [creditedAccountName, setCreditedAccountName] = React.useState<accountName>('');
  const [debitedAccountName, setDebitedAccountName] = React.useState<accountName>('');

  const { creditedAccount,
    debitedAccount,
    value,
    createdAt }: TransactionModel = props;

  React.useEffect(() => {
    const getCreditedAccountName = async () => {
      const { data }: any = await Axios.get(`/api/user/${creditedAccount}`)
        .catch((err: Error) => console.log(err)); 
      setCreditedAccountName(data.user.user_name);
    };
    const getDebitedAccountName = async () => {
      const { data }: any = await Axios.get(`/api/user/${debitedAccount}`)
        .catch((err: Error) => console.log(err)); 
        setDebitedAccountName(data.user.user_name);
    };
    getCreditedAccountName();
    getDebitedAccountName();
  }, [creditedAccount, debitedAccount]);

  return ( 
    <tbody className="history-table-line">
      <tr className="history-table-body">
        <td>{creditedAccountName}</td>
        <td>{debitedAccountName}</td>
        <td>{value}</td>
        <td>{createdAt}</td>
      </tr>
  </tbody>
   );
}

HistoryCard.propTypes = {
  creditedAccount: PropTypes.number.isRequired,
  debitedAccount: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default HistoryCard;