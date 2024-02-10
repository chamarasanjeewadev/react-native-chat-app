import Snackbar, { SnackBarOptions } from 'react-native-snackbar'

const useSnackBar = () => {
  const showSnackBar = (options: SnackBarOptions) => {
    Snackbar.show(options)
  }

  return { showSnackBar }
}

export default useSnackBar
