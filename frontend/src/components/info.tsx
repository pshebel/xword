import { FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import {useMutation } from '@tanstack/react-query';
import { useGameStore } from '@store/game';
import {useStatusStore} from '@store/status'
import { checkPuzzle } from '@hooks/puzzles';
import { Clue, CheckRequest, CheckResponse } from '@types/api';
import Button from '@components/button';

export default function Info({ puzzle }) {
  const {squares, setSuccess} = useGameStore();
  const {timedText} = useStatusStore();
  const across = [...puzzle.clues].filter((clue) => clue.across).sort((a, b) => a.index - b.index)
  const down = [...puzzle.clues].filter((clue) => !clue.across).sort((a, b) => a.index - b.index)

  const mutation = useMutation({
    mutationFn: async (req: CheckRequest) => {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req)
      });
      return response.json() as Promise<CheckResponse>;
    },
    onSuccess: (data) => {
      if (data.success) {
        setSuccess(true);
      } else {
        timedText("Not quite right. Keep trying!");
      }
    },
    onError: (err: any) => {
      timedText(err.message);
    }
  });

  const handleCheck = async () => {
    let userInput: Map<number, string> = new Map<number, string>();
    for (let i=0;i<puzzle.size;i++){
      userInput.set(i, squares.slice(i*puzzle.size, (i+1)*puzzle.size).join("").toLowerCase());
    }
    // const req = {id: puzzle.id, words: userInput}
    mutation.mutate({ id: puzzle.id, words: Object.fromEntries(userInput) });
    // const {data, error} = checkPuzzle(req)
    // if (error) {
    //   timedText(error.message)
    // } else if (data?.success) {
    //   setSuccess(true)
    // } else {
    //   timedText('Not quite right. Keep trying!')
    // }
  }

  return (
    <View style={styles.infoContainer}>
      <View style={styles.info}>
        <Text style={styles.infoHeader}>Across</Text>
        <FlatList
          data={across}
          style={styles.infoList}
          keyExtractor={(item) => item.index}
          renderItem={({item}) => (
              <Text style={styles.clue} >{item.index+1}: {item.text}</Text>
          )}
        />
        <Text style={styles.infoHeader}>Down</Text>
        <FlatList
          data={down}
          style={styles.infoList}
          keyExtractor={(item) => item.index}
          renderItem={({item}) => (
            <Text style={styles.clue}>{item.index+1}: {item.text}</Text>
          )}
        />
      
        {/* <TouchableOpacity style={styles.buttonContainer} onPress={() => handleCheck()}>
          <Text style={styles.button}>Check</Text>
        </TouchableOpacity> */}
        <Button text={"Check"} onClick={handleCheck}/>
      </View>
    </View>
   
  );
}


const { width, height } = Dimensions.get('window');
const mobile = StyleSheet.create({
  info: {
    maxWidth:  width  - 50 // same width as puzzle
  }
})

const web = StyleSheet.create({
  info: {
    maxHeight: width / 4, // same height as puzzle
  }
})

const styles = StyleSheet.create({
  infoContainer: (height > width) ? mobile.info : web.info,
  info: {
    flexGrow: 1,
    // flex: 1,
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // overflow: 'scroll',
    // maxWidth: size,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    borderColor: '#999',
    borderWidth: 1,
  },
  infoList: {
    paddingTop: 2,
  },
  clue: {
    flex: 1,
  },
  infoHeader: {
    flex: 2,
    fontSize: 32,
    fontFamily: 'Cooper-Black',
  },
  buttonContainer: {
    flex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
  button: {
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#000',
    fontFamily: 'Cooper-Black',
    color: '#FDFBD4',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 32,
  } 
});
