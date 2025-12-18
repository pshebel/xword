import { StyleSheet, Text, TouchableOpacity } from 'react-native';



export default function Button({text, onClick}) {
    return (
        <TouchableOpacity style={styles.buttonContainer} onPress={() => onClick()}>
          <Text style={styles.button}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        // flex: 2,
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
})