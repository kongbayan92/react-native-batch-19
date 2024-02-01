import { Alert } from "react-native";


const useMessage = () => {

  const error = (error) => {
    const { data, status, statusText } = error.response;
    Alert.alert("Warning", data.detail || `${status}: ${statusText || 'Please check your data'}`)
  }

  const success = (response) => {
    const { status, statusText } = response;
    Alert.alert("Success", `${status}: ${statusText}`)
  }

  const confirmRemove = (action) => {
    Alert.alert('Are you sure?', 'You won\'t be able to revert this!', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes Sure!', onPress: action},
    ]);
  }

  return {success, error, confirmRemove}
}

export default useMessage;