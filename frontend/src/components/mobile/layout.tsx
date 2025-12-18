import { ScrollView, StyleSheet } from 'react-native';

import Header from '@/components/common/header';
import Container from './container';
import Footer from '@/components/common/footer';

export default function Layout() {
  return (
    <ScrollView style={styles.layout} contentContainerStyle={{ flexGrow: 1 }}>
      <Header />
      <Container />
      <Footer />
    </ScrollView>
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
