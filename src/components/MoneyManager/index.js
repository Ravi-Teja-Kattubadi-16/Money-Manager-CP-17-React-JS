import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import './index.css'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    transactionHistoryList: [],
    title: '',
    amount: '',
    type: 'INCOME',
    yourBalance: 0,
    yourIncome: 0,
    yourExpenses: 0,
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    this.setState({type: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state

    const newTransaction = {
      transactionId: uuidv4(),
      title,
      amount,
      type,
    }
    this.setState(prevState => ({
      transactionHistoryList: [
        ...prevState.transactionHistoryList,
        newTransaction,
      ],
    }))

    if (type === 'INCOME') {
      this.setState(prevState => ({
        yourBalance: parseInt(prevState.yourBalance) + parseInt(amount),
        yourIncome: parseInt(prevState.yourIncome) + parseInt(amount),
        title: '',
        amount: '',
      }))
    } else {
      this.setState(prevState => ({
        yourBalance: parseInt(prevState.yourBalance) - parseInt(amount),
        yourExpenses: parseInt(prevState.yourExpenses) + parseInt(amount),
        title: '',
        amount: '',
      }))
    }
  }

  deleteTransaction = transactionId => {
    const {transactionHistoryList} = this.state

    const transaction = transactionHistoryList.filter(
      each => each.transactionId === transactionId,
    )
    // console.log(transaction)
    if (transaction[0].type === 'INCOME') {
      this.setState(prevState => ({
        yourBalance:
          parseInt(prevState.yourBalance) - parseInt(transaction[0].amount),
        yourIncome:
          parseInt(prevState.yourIncome) - parseInt(transaction[0].amount),
      }))
    } else if (transaction[0].type === 'EXPENSES') {
      this.setState(prevState => ({
        yourBalance:
          parseInt(prevState.yourBalance) + parseInt(transaction[0].amount),
        yourExpenses:
          parseInt(prevState.yourExpenses) - parseInt(transaction[0].amount),
      }))
    }

    this.setState(prevState => ({
      transactionHistoryList: prevState.transactionHistoryList.filter(
        eachTransaction => eachTransaction.transactionId !== transactionId,
      ),
    }))
  }

  render() {
    const {
      transactionHistoryList,
      yourBalance,
      yourIncome,
      yourExpenses,
      title,
      amount,
    } = this.state
    return (
      <div className="app-container">
        <div className="header-container">
          <h1 className="name-heading"> Hi, Richard </h1>
          <p className="title-description">
            {' '}
            Welcome back to your{' '}
            <span className="span-style">Money Manager</span>
          </p>
        </div>

        <MoneyDetails
          yourBalance={yourBalance}
          yourIncome={yourIncome}
          yourExpenses={yourExpenses}
        />

        <div className="footer-containers">
          <div className="add-transaction-container">
            <h1 className="add-transaction-heading"> Add Transaction </h1>
            <form className="form-container">
              <label htmlFor="title" className="title">
                {' '}
                TITLE{' '}
              </label>
              <input
                type="text"
                id="title"
                className="input-title"
                placeholder="TITLE"
                onChange={this.onChangeTitle}
                value={title}
              />
              <label htmlFor="amount" className="title">
                {' '}
                AMOUNT{' '}
              </label>
              <input
                type="text"
                id="amount"
                className="input-title"
                placeholder="AMOUNT"
                onChange={this.onChangeAmount}
                value={amount}
              />
              <label htmlFor="select" className="title">
                TYPE
              </label>
              <select
                id="select"
                className="select-class"
                onChange={this.onChangeType}
              >
                <option value={transactionTypeOptions[0].optionId}>
                  {transactionTypeOptions[0].displayText}
                </option>
                <option value={transactionTypeOptions[1].optionId}>
                  {transactionTypeOptions[1].displayText}
                </option>
              </select>
              <button
                type="button"
                className="add-button"
                onClick={this.onAddTransaction}
              >
                Add
              </button>
            </form>
          </div>
          <div className="history-container">
            <h1 className="history-heading"> History </h1>
            <ul className="unordered-list-container">
              <li className="history-table-headings">
                <p className="table-heading"> Title </p>
                <p className="table-heading"> Amount </p>
                <p className="table-heading"> Type </p>
              </li>
              {transactionHistoryList.map(eachHistoryDetails => (
                <TransactionItem
                  key={eachHistoryDetails.transactionId}
                  eachHistoryDetails={eachHistoryDetails}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
