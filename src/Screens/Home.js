import React, {useCallback} from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const abc = useSelector(state => state);
  const data = useSelector(state => state?.data?.data);
  const currentPage = useSelector(state => state?.data?.currentPage);
  const itemsPerPage = useSelector(state => state?.data?.itemsPerPage);

  console.log('abc', abc);

  const handleEditPress = item => {
    navigation.navigate('edit', {item});
  };

  const handleNextPage = () => {
    const totalItems = data?.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (currentPage < totalPages) {
      dispatch({type: 'SET_CURRENT_PAGE', payload: currentPage + 1});
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch({type: 'SET_CURRENT_PAGE', payload: currentPage - 1});
    }
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  console.log('paginatedData', paginatedData);

  const handleDeletePress = useCallback(
    itemId => {
      Alert.alert(
        'Delete Item',
        'Are you sure you want to delete this item?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => {
              dispatch({
                type: 'DELETE_DATA',
                payload: itemId,
              });
            },
            style: 'destructive',
          },
        ],
        {cancelable: true},
      );
    },
    [dispatch],
  );

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.dataViewStyle}
        onPress={() => handleEditPress(item)}>
        <Text style={styles.titleText}>{`${item.id} - ${item.title}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeletePress(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Items</Text>
      <FlatList
        data={paginatedData}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
      />
      <View style={styles.paginationContainer}>
        <TouchableOpacity onPress={handlePrevPage}>
          <Text style={styles.paginationText}>Previous Page</Text>
        </TouchableOpacity>
        <Text style={styles.currentPageText}>Page {currentPage}</Text>
        <TouchableOpacity onPress={handleNextPage}>
          <Text style={styles.paginationText}>Next Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: 24,
    color: '#3498db',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  itemContainer: {
    padding: 16,
    elevation: 2,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
  },
  dataViewStyle: {
    flex: 1,
  },
  titleText: {
    fontSize: 16,
    color: '#343a40',
  },
  deleteButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e74c3c',
  },
  deleteButtonText: {
    color: '#fff',
  },
  paginationContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paginationText: {
    color: '#3498db',
  },
  currentPageText: {
    fontSize: 18,
    color: '#3498db',
    fontWeight: 'bold',
  },
});

export default Home;
