import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useEffect } from 'react';
import Header from '@/components/common/header';
// import Footer from './common/footer';
// import DesktopContainer from './desktop/container';
// import MobileContainer from './mobile/container';
import DesktopLayout from './desktop/layout';
import MobileLayout from './mobile/layout';
import { usePuzzleStore } from '@/store/puzzle';

const { height, width } = Dimensions.get('window');
export default function Layout() {
  if (width > height) {
    return (<DesktopLayout/>)
  } else {
    return (<MobileLayout/>)
  }
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
