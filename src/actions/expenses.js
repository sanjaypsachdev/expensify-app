import realtimeDb, { expensesFs } from '../firebase/firebase';

// ADD_EXPENSE
export const addExpense = (expense) => {
  return ({
  type: 'ADD_EXPENSE',
  expense
})};

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;

    const expense = { description, note, amount, createdAt };

    return expensesFs(uid)
      .add(expense)
      .then((docRef) => {
        dispatch(addExpense({
          id: docRef.id,
          ...expense
        }));
      });

    // return realtimeDb.ref(`users/${uid}/expenses`)
    //   .push(expense)
    //   .then((ref) => {
    //     dispatch(addExpense({
    //       id: ref.id,
    //       ...expense
    //     }));
    //   });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //return realtimeDb.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
    return expensesFs(uid).doc(id).delete().then(() => {
      dispatch(removeExpense({ id }));
    });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //return realtimeDb.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
    return expensesFs(uid).doc(id).update(updates).then(() => {
      dispatch(editExpense(id, updates));
    });
  };
};

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    //return realtimeDb.ref(`users/${uid}/expenses).once('value').then((snapshot) => {
    return expensesFs(uid).get().then((snapshot) => {
      const expenses = [];

      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.id,
          ...childSnapshot.data()
        });
      });

      dispatch(setExpenses(expenses));
    });
  };
};
