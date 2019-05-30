import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let startEditExpense, setRemoveExpense, history, wrapper;

beforeEach(() => {
  startEditExpense = jest.fn();
  setRemoveExpense = jest.fn();

  history = { push: jest.fn() };
  wrapper = shallow(<EditExpensePage
    startEditExpense={startEditExpense}
    setRemoveExpense={setRemoveExpense}
    history={history}
    expense={expenses[0]}
  />);
});

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle startEditExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
});

test('should handle setRemoveExpense', () => {
  wrapper.find('button').prop('onClick')();
  expect(setRemoveExpense).toHaveBeenLastCalledWith({
    id: expenses[0].id
  });
});