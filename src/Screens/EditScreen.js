// EditScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';

const EditScreen = ({route}) => {
  const {item} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);

  const handleSave = () => {
    if (editedTitle.trim() === '') {
      setError('Please enter a title.');
      return;
    }

    if (editedTitle.length < 3) {
      setError('Title must be at least 3 characters long.');
      return;
    }

    setIsLoading(true);

    // Simulating an asynchronous operation (API call, etc.)
    setTimeout(() => {
      dispatch({
        type: 'EDIT_DATA',
        payload: {id: item.id, title: editedTitle},
      });

      setIsLoading(false);
      navigation.navigate('Home');
    }, 1000); // Adjust the timeout as needed
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{'< Back'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Screen</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.heading}>Edit Screen</Text>
        <TextInput
          style={styles.input}
          value={editedTitle}
          onChangeText={text => {
            setEditedTitle(text);
            setError('');
          }}
          placeholder="Enter new title"
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TouchableOpacity
          style={[
            styles.saveButton,
            editedTitle.trim() === '' && styles.disabledButton,
          ]}
          onPress={handleSave}
          disabled={editedTitle.trim() === '' || isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text style={styles.saveButtonText}>Save</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  header: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#3498db',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
    width: '100%',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 24,
  },
  disabledButton: {
    backgroundColor: '#bdc3c7',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditScreen;
