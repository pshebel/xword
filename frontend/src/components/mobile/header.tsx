import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
  // Get the current day of the week
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dates = [
    "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th",
    "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th",
    "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th",
    "31st"
  ];
  const time = new Date();
  const currentDay = days[time.getDay()];
  const date = dates[time.getDate()-1];
  const month = months[time.getMonth()]

  return (
    <View style={styles.header}>
      <View style={styles.centerContainer}>
        <Text style={styles.dayText}>{currentDay}, {month} {date}</Text>
      </View>
      
      {/* Empty view to balance the flex layout and keep the day perfectly centered */}
      <View style={styles.rightPlaceholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    paddingLeft: 40,
    fontFamily: 'Cooper-Black',
    color: '#FDFBD4',
    fontSize: 32,
    zIndex: 1, // Ensures logo stays on top if overlapping
  },
  centerContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontFamily: 'Cooper-Black', // Keeping the same font
    color: 'black',
    fontSize: 26,
  },
  dateSubtext: {
    fontFamily: 'Cooper-Black', // Keep consistent font or use sans-serif for contrast
    color: '#666',
    fontSize: 14,
    textTransform: 'uppercase',
    marginTop: -2,
  },
  rightPlaceholder: {
    flex: 1,
  }
});