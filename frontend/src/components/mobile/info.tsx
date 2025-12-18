import { Platform, StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
import {useMutation } from '@tanstack/react-query';
import { useGameStore } from '@store/game';
import { CheckRequest, CheckResponse, Puzzle } from '@types/api';
import Button from '@/components/common/button';

type InfoProps = {
  puzzle: Puzzle;
}

export default function Info({ puzzle }: InfoProps) {
  const { squares, setSuccess, focus, orientation } = useGameStore();

    const fail = () => {
    if (Platform.OS === 'web') {
      return window.confirm('Not quite right. Keep Trying!')
    } else {
      return Alert.alert('Alert Title', 'My Alert Msg', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ])
    }
   
  }
  

  const mutation = useMutation({
    mutationFn: async (req: CheckRequest) => {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/check`, {
      // const response = await fetch('https://r9cljvi9e9.execute-api.us-east-1.amazonaws.com/', {
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
        fail()
        // timedText("Not quite right. Keep trying!");
      }
    },
    onError: (err: any) => {
      Alert.alert(err.message);
      // timedText(err.message);
    }
  });

  const handleCheck = async () => {
    let words = []
    for (let i=0;i<puzzle.size;i++){
      words.push(squares.slice(i*puzzle.size, (i+1)*puzzle.size).join("").toLowerCase())
    }

    mutation.mutate({ id: puzzle.id, cert: words.join(",")});
  }

  // Find the clue that corresponds to the current focus and orientation
  const getCurrentClue = () => {
    if (!puzzle.clues || puzzle.clues.length === 0) return null;
    
    // Determine which clue index we're in based on focus position and orientation

    if (orientation) {
      const index = Math.floor(focus / puzzle.size);
      return puzzle.clues.find(item => item.index === index && item.across === true)
    } else {
      const index = focus % puzzle.size;
      return puzzle.clues.find(item => item.index === index && item.across === false)
    }
  };
  
  const currentClue = getCurrentClue();
  
  if (!currentClue) return null;
  
  return (
    <View>
      <View style={styles.keyboardContainer}>
        {/* <Text style={styles.clueNumber}>
          {currentClue.index + 1} {orientation ? 'Across' : 'Down'}
        </Text> */}
        <Text style={styles.clueText}>{currentClue.text}</Text>
      </View>
      <View>
        <Button style={styles.buttonContainer} text={"Check"} onClick={handleCheck}/>
      </View>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  keyboardContainer: {
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: 20,
    backgroundColor: 'white',
    minHeight: 40,
    padding: 10,
    // flexDirection: 'colum',
    // gap: 10,
    // // position: 'absolute',
    // // bottom: 0,
    // // left: 0,
    // // right: 0,
    // backgroundColor: '#fff',
    // borderTopWidth: 1,
    // borderTopColor: '#999',
    // paddingHorizontal: 15,
    // paddingVertical: 12,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: -2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 5,
  },
  buttonContainer: {
    paddingTop: 5,
  },
  clueHeader: {
    marginBottom: 6,
  },
  clueNumber: {
    fontSize: 16,
    fontFamily: 'Cooper-Black',
    color: '#C12C2C',
  },
  clueBody: {
    paddingBottom: 4,
  },
  clueText: {
    maxWidth: (width) - 20,
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
  },
});