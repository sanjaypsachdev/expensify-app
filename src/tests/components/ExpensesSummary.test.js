import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';

test('should return correct summary for a single expense', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expenseTotal={235} />);
  expect(wrapper).toMatchSnapshot();
});

test('should return correct summary for a multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={23} expenseTotal={12001245566} />);
  expect(wrapper).toMatchSnapshot();
});