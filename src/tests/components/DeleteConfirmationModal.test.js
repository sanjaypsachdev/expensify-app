import React from 'react';
import ReactModal from 'react-modal';
import { shallow } from 'enzyme';
import { DeleteConfirmationModal } from '../../components/DeleteConfirmationModal';
import expenses from '../fixtures/expenses';

let startRemoveExpense, cancelRemoveExpense, afterRemoveExpense, wrapper;

beforeEach(() => {
  startRemoveExpense = jest.fn();
  cancelRemoveExpense = jest.fn();
  afterRemoveExpense = jest.fn();

  const expenseToDelete = { ...expenses[0], isDeleting: true }
  wrapper = shallow(<DeleteConfirmationModal
    startRemoveExpense={startRemoveExpense}
    cancelRemoveExpense={cancelRemoveExpense}
    afterRemoveExpense={afterRemoveExpense}
    expenseToDelete={expenseToDelete}
  />);
});

test('should render DeleteConfirmationModal correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should be open', () => {
  expect(wrapper.find(ReactModal).prop('isOpen')).toEqual(true);
})

test('should handle start remove expense', () => {
  wrapper.find('.yes').prop('onClick')();
  expect(afterRemoveExpense).toHaveBeenCalled();
  const id = expenses[0].id;
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id });
});

test('should handle cancel remove expense', () => {
  wrapper.find('.no').prop('onClick')();
  const id = expenses[0].id;
  expect(cancelRemoveExpense).toHaveBeenLastCalledWith({ id });
});