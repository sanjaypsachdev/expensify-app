import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {
  startEditExpense,
  setRemoveExpense } from '../actions/expenses';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export class EditExpensePage extends React.Component {
  onSubmit = (expense) => {
    this.props.startEditExpense(this.props.expense.id, expense);
    this.props.history.push('/');
  }

  onSetRemoveExpense = () => {
    this.props.setRemoveExpense({ id: this.props.expense.id })
  }

  afterRemoveExpense = () => {
    this.props.history.push('/');
  }  

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Edit Expense</h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.onSubmit}
          />
          <button className="button button--secondary" onClick={this.onSetRemoveExpense}>Remove Expense</button>
        </div>
        <DeleteConfirmationModal
          expenseToDelete={this.props.expense}
          afterRemoveExpense={this.afterRemoveExpense}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
  startEditExpense: (expenseId, expense) => dispatch(startEditExpense(expenseId, expense)),
  setRemoveExpense: (id) => dispatch(setRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);
