import { View, StyleSheet } from 'react-native';
import { KeyboardProvider } from "react-native-keyboard-controller";

import Header from '@/components/common/header';
import Container from './container';
import Footer from '@/components/common/footer';

export default function Layout() {
  
  return (
    <View style={styles.layout}>
      {/* <Header /> */}
      <Container />
      {/* <Footer /> */}
    </View>
  );
}


const styles = StyleSheet.create({
  layout: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    // minWidth: '100%',
    // minHeight: '100%'
  },
});
