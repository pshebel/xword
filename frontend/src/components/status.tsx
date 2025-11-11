import { StyleSheet, Text, View } from 'react-native';
import { useStatusStore } from '@store/status';

export default function Status() {
  const {text} = useStatusStore();
  return (
    <View style={styles.status}>
        <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  status: {
    // flex: 1,
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
