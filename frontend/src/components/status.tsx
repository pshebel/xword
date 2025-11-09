import { StyleSheet, Text, View } from 'react-native';


export default function Status() {
  return (
    <View style={styles.status}>
        <Text>short lived status messages</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  status: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
