import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Transactioncomponent = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []); // Fetch transactions on component mount

  const fetchTransactions = () => {
    axios.get('http://localhost:8080/Finkraft/')
      .then(response => {
        setTransactions(response.data);
      })
      .catch(error => {
        console.error('Failed to fetch transactions: ' + error.message);
      });
  };

  const handleEdit = (transactionId) => {
    // Implement edit functionality
    alert('Edit transaction with ID ' + transactionId);
  };

  const handleDelete = (transactionId) => {
    // Implement delete functionality
    alert('Delete transaction with ID ' + transactionId);
  };

  return (
    <div>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.name}</td>
              <td>{transaction.amount}</td>
              <td>
                <button onClick={() => handleEdit(transaction.id)}>Edit</button>
                <button onClick={() => handleDelete(transaction.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactioncomponent;
