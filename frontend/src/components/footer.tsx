import { StyleSheet, Text, View } from 'react-native';


export default function Footer() {
  return (
    <View style={styles.footer}>
        <Text style={styles.footerText}>Contact Me: phil.shebel@gmail.com</Text>
        <Text style={styles.footerText}>Last Updated: {}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    flexShrink: 0,
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  footerText: {
    color: 'grey',
  }
});
