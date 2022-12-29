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
    <div className="flex flex-row justify-between items-center p-5">
      <div className="mt-4 grid place-items-center content-center">
        <label htmlFor="date">{ historyTranslation[language].startDate }: </label>
        <input className="border rounded-xl h-12 py-5 px-4 caret-dark-purple" type="date" id="date" onChange={ handleStartDate } />
      </div>
      <div className="mt-4 grid place-items-center content-center">
        <label htmlFor="date">{ historyTranslation[language].endDate }: </label>
        <input className="border rounded-xl h-12 py-5 px-4 caret-dark-purple" type="date" id="date" onChange={ handleEndDate } />
      </div>
      <button 
        type="button" 
        onClick={ handleFilterByDate }
        className="border rounded-full p-3 bg-dark-purple border-light-purple text-white font-medium text-center hover:bg-white hover:text-dark-purple self-end">{ historyTranslation[language].filter }</button>
    </div>
  );
}

export default FilterByDate;