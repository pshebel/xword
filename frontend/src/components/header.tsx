import { StyleSheet, Text, View } from 'react-native';


export default function Header() {
  return (
    <View style={styles.header}>
        <Text style={styles.logo}>xword.io</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: '#000',
    flexShrink: 0,  
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  logo: {
    paddingLeft: 40,
    fontFamily: 'Cooper-Black',
    color: '#FDFBD4',
    fontSize: 32,
  },
});
