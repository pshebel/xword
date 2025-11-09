import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useGameStore } from '@store/game';
import { Clue } from '@types/api';

export default function Info({ clues }) {
  const across = [...clues].filter((clue) => clue.across).sort((a, b) => a.index - b.index)
  const down = [...clues].filter((clue) => !clue.across).sort((a, b) => a.index - b.index)

  return (
    <View>
      <Text>Across</Text>
      <FlatList
        data={across}
        keyExtractor={(item) => item.index}
        renderItem={({item}) => (
            <Text>{item.index}: {item.text}</Text>
        )}
      />
      <Text>Down</Text>
      <FlatList
        data={down}
        keyExtractor={(item) => item.index}
        renderItem={({item}) => (
          <Text>{item.index}: {item.text}</Text>
        )}
      />
    </View>
   
  );
}


const styles = StyleSheet.create({
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
