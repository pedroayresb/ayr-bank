import React, { useContext, useState } from "react";
import AyrContext from "../context/AyrContext";
import { AyrContextInterface } from "../interfaces/UserInterface";
import HistoryInterface from "../interfaces/HistoryInterface";
import { historyTranslation } from "../utils/historyTranslation";

function FilterByDate() {
  const { history, language, setHistory } = useContext(AyrContext) as AyrContextInterface;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDate = (e: any) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e: any) => {
    setEndDate(e.target.value);
  };

  const handleFilterByDate = () => {
    const filteredHistory = history?.filter((transaction) => {
      const transactionDate = new Date(transaction.createdAt);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return transactionDate >= start && transactionDate <= end;
    }) as HistoryInterface[];
    setHistory(filteredHistory);
  };

  return (
    <div>
      <label htmlFor="date">{ historyTranslation[language].startDate }</label>
      <input type="date" id="date" onChange={ handleStartDate } />
      <label htmlFor="date">{ historyTranslation[language].endDate }</label>
      <input type="date" id="date" onChange={ handleEndDate } />
      <button type="button" onClick={ handleFilterByDate }>{ historyTranslation[language].filter }</button>
    </div>
  );
}

export default FilterByDate;