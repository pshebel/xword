import { StyleSheet, Text, View } from 'react-native';

import Header from '@components/header';
import Status from '@components/status';
import Container from '@components/container';
import Footer from '@components/footer';

export default function Layout() {
  return (
    <View style={styles.layout}>
        <Header />
        <Status />
        <Container />
        <Footer />
    </View>
  );
}


const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
