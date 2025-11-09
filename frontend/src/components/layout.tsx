import { StyleSheet, View } from 'react-native';

import Header from './header';
import Status from './status';
import Container from './container';
import Footer from './footer';

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
    display: 'flex',
    flexDirection: 'column',
  },
});
