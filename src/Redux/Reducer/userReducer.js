import {dummy_data} from '../../Screens/DummyData/dummy';

const initialstate = {
  id: 1,
  data: {
    currentPage: 1,
    itemsPerPage: 5,
    items: dummy_data,
  },
};

const userReducer = (state = initialstate, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {...state, data: {...state.data, items: action.payload}};
    case 'EDIT_DATA':
      return {
        ...state,
        // data: state.data.map(item =>
        //   item.id === action.payload.id
        //     ? {...item, title: action.payload.title}
        //     : item,
        // ),
        data: {
          ...state?.data,
          items: state.data.items?.map(item =>
            item.id === action.payload.id
              ? {...item, title: action.payload.title}
              : item,
          ),
        },
      };
    case 'DELETE_DATA':
      const updatedData = state.data.items.filter(
        item => item.id !== action.payload,
      );
      return {
        ...state,
        data: {...state?.data, items: updatedData},
      };
    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        // currentPage: action.payload,
        data: {
          ...state?.data,
          currentPage: action?.payload,
        },
      };
    default:
      return initialstate;
  }
};

export default userReducer;
