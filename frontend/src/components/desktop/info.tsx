import { Platform, FlatList, StyleSheet, Text, TouchableOpacity, View, Dimensions, Alert } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { useGameStore } from '@store/game';
import { check } from '@/game/check';
import { CheckRequest, CheckResponse } from '@types/api';
import Button from '@/components/common/button';
import { Puzzle } from "@/types/api"

import {getSquares, setSuccess} from '@/store/local';

type InfoProps ={
  puzzle: Puzzle,
  onSuccess: () => void,
}

export default function Info({ puzzle, onSuccess }: InfoProps) {
  const squares = getSquares()
  // const {squares, setSuccess} = useGameStore();
  const across = [...puzzle.words].filter((word) => word.across).sort((a, b) => a.index - b.index)
  const down = [...puzzle.words].filter((word) => !word.across).sort((a, b) => a.index - b.index)

  // const fail = () => {
  //   if (Platform.OS === 'web') {
  //     return window.confirm('Not quite right. Keep Trying!')
  //   } else {
  //     return Alert.alert('Alert Title', 'My Alert Msg', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Cancel Pressed'),
  //         style: 'cancel',
  //       },
  //       {text: 'OK', onPress: () => console.log('OK Pressed')},
  //     ])
  //   }
   
  // }
  

  // const mutation = useMutation({
  //   mutationFn: async (req: CheckRequest) => {
  //     const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/check`, {
  //     // const response = await fetch('https://r9cljvi9e9.execute-api.us-east-1.amazonaws.com/', {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(req)
  //     });
  //     return response.json() as Promise<CheckResponse>;
  //   },
  //   onSuccess: (data) => {
  //     if (data.success) {
  //       setSuccess(true);
  //     } else {
  //       fail()
  //     }
  //   },
  //   onError: (err: any) => {
  //     Alert.alert(err.message);
  //   }
  // });

  // const handleCheck = async () => {
  //   let words = []
  //   for (let i=0;i<puzzle.size;i++){
  //     words.push(squares.slice(i*puzzle.size, (i+1)*puzzle.size).join("").toLowerCase())
  //   }

  //   mutation.mutate({ id: puzzle.id, cert: words.join(",")});
  // }

  return (
    <View style={styles.infoContainer}>
      <View style={styles.info}>
        <View>
          <Text style={styles.infoHeader}>Across</Text>
          <FlatList
            data={across}
            style={styles.infoList}
            keyExtractor={(item) => item.index}
            renderItem={({item}) => (
                <Text style={styles.clue} >{item.index+1}: {item.clue}</Text>
            )}
          />
        </View>
        <View>
          <Text style={styles.infoHeader}>Down</Text>
          <FlatList
            data={down}
            style={styles.infoList}
            keyExtractor={(item) => item.index}
            renderItem={({item}) => (
              <Text style={styles.clue}>{item.index+1}: {item.clue}</Text>
            )}
          />
        </View>
        <View style={styles.space}/>
        <Button text={"Check"} onClick={() => check({onSuccess})}/>
      </View>
    </View>
   
  );
}


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  infoContainer: {
    height: width / 2, // same height as puzzle
    width: (width / 2) * 0.618,
    maxHeight: 500,
    maxWidth: 309,
  },
  space: {
    flexGrow: 1,
  },
  info: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    // Elevation for Android
    elevation: 5,
  },
  infoList: {
    paddingTop: 2,
  },
  clue: {
    flex: 1,
    fontSize: 16,
  },
  infoHeader: {
    flex: 2,
    fontSize: 42,
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
