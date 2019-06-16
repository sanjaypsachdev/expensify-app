// Expenses Reducer

const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense
      ];
    case 'SET_REMOVE_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            isDeleting: true
          };
        } else {
          return expense;
        };
      });
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id);
    case 'CANCEL_REMOVE_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            isDeleting: undefined
          };
        } else {
          return expense;
        };
      });
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        };
      });
    case 'SET_EXPENSES':
      return action.expenses;
    case 'CLEAR_ALL_EXPENSES':
      return [];
    default:
      return state;
  }
};
