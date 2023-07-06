// Write your code here
import {Component} from 'react'

import './index.css'

class MoneyDetails extends Component {
  render() {
    const {yourBalance, yourIncome, yourExpenses} = this.props
    return (
      <div className="money-containers">
        <div className="your-balance-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            alt="balance"
            className="icon-image"
          />
          <div className="amount-container">
            <p className="description"> Your Balance </p>
            <p className="amount" data-testid="balanceAmount">
              Rs {yourBalance}
            </p>
          </div>
        </div>
        <div className="your-income-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            alt="income"
            className="icon-image"
          />
          <div className="amount-container">
            <p className="description"> Your Income </p>
            <p className="amount" data-testid="incomeAmount">
              Rs {yourIncome}
            </p>
          </div>
        </div>
        <div className="your-expenses-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            alt="expenses"
            className="icon-image"
          />
          <div className="amount-container">
            <p className="description"> Your Expenses </p>
            <p className="amount" data-testid="expensesAmount">
              Rs {yourExpenses}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyDetails
