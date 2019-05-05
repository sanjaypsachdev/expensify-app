import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { 
  addExpense,
  editExpense,
  removeExpense,
  startAddExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database, { expensesFs, db } from '../../firebase/firebase';

const createMockStore = configureStore([thunk]);

beforeEach((done) => {
  //const expenseData = {};
  let batch = db.batch();
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    let docRef = expensesFs.doc(id);
    batch.set(docRef, { description, note, amount, createdAt });
    //expenseData[id] = { description, note, amount, createdAt };
  });
  batch.commit()
       .then(() => done());
  //database.ref('expenses').set(expenseData).then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: 'New note value' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'New note value'
    }
  });
});

test('should setup add expense action object with provided values', () => {
  const expenseData = expenses[2];
  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return expensesFs.doc(actions[0].expense.id).get()
  })
  .then((doc) => {
    expect(doc.data()).toEqual(expenseData);
    expensesFs.doc(doc.id).delete().then(() => done());
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return expensesFs.doc(actions[0].expense.id).get()
  })
  .then((doc) => {
    expect(doc.data()).toEqual(expenseData);
    expensesFs.doc(doc.id).delete().then(() => done());
  });
});

test('should setup setExpenses object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore({});
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  });
});

test('should delete expense from database and store', (done) => {
  const store = createMockStore({});
  const id = expenses[2].id;
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id,
      });

      return expensesFs.doc(id).get()
  })
  .then((doc) => {
    expect(doc.data()).toEqual(undefined);
    done();
  });
});