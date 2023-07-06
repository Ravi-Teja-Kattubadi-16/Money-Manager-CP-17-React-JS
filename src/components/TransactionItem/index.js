// Write your code here
import './index.css'

const TransactionItem = props => {
  const {eachHistoryDetails, deleteTransaction} = props
  const {transactionId, title, amount, type} = eachHistoryDetails

  const onClickDeleteButton = () => {
    deleteTransaction(transactionId)
  }
  return (
    <li className="list-item-container">
      <p className="history-description">{title}</p>
      <p className="history-description"> Rs {amount} </p>
      <p className="history-description"> {type} </p>
      <button
        type="button"
        className="delete-button"
        onClick={onClickDeleteButton}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-image"
        />
      </button>
    </li>
  )
}

export default TransactionItem
