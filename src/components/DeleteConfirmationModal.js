import React from 'react';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import {
  startRemoveExpense,
  cancelRemoveExpense } from '../actions/expenses';

export class DeleteConfirmationModal extends React.Component {

  onRemoveExpense = () => {
    this.props.startRemoveExpense({ id: this.props.expenseToDelete.id });
    this.props.afterRemoveExpense();
  }
  
  handleCancelRemoveExpense = () => {
    this.props.cancelRemoveExpense({ id: this.props.expenseToDelete.id })
  }
  
  render() {
    return(
      <ReactModal
        ariaHideApp={false}
        isOpen={this.props.expenseToDelete.isDeleting}
        onRequestClose={this.handleCancelRemoveExpense}
        contentLabel="Confirm Deletion"
        className="modal"
      >
        <h3 className="modal__title">Are you sure you want to delete this expense ?</h3>
        <div className="modal_buttons">
          <button className="button yes" onClick={this.onRemoveExpense}>Yes</button>
          <button className="button no" onClick={this.handleCancelRemoveExpense}>No</button>
        </div>
      </ReactModal>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startRemoveExpense: (data) => dispatch(startRemoveExpense(data)),
  cancelRemoveExpense: (id) => dispatch(cancelRemoveExpense(id))
});

export default connect(null, mapDispatchToProps)(DeleteConfirmationModal);