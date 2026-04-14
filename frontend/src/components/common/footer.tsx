import { StyleSheet, Text, View } from 'react-native';


export default function Footer() {
  return (
    <View style={styles.footer}>
        <Text style={styles.footerText}>Contact Me: phil.shebel@gmail.com</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    // flex: 1,
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  footerText: {
    color: 'grey',
    
  }
});
