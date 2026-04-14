import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { useGameStore } from '@/store/game';
import { usePuzzleStore } from '@/store/puzzle';
import { getPuzzle } from '@hooks/puzzles';
import Button from '@/components/common/button';
import { getTime } from '@/store/local';

export default function Success() {
    const { reset: resetGame } = useGameStore();
    const { reset: resetPuzzle } = usePuzzleStore();
    const { refetch } = getPuzzle();

    const timeTaken = getTime() || '00:00';

    return (
        <View style={styles.successContainer}>
            <View style={styles.card}>
                <Text style={styles.success}>Success!</Text>
                
                <View style={styles.timeWrapper}>
                    <Text style={styles.timeLabel}>Time Taken</Text>
                    <Text style={styles.timeValue}>{timeTaken}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    successContainer: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', // Slightly softer grey
        padding: 20,
    },
    card: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 30,
        alignItems: 'center',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        // Elevation for Android
        elevation: 5,
    },
    label: {
        fontSize: 14,
        letterSpacing: 2,
        color: '#888',
        marginBottom: 8,
    },
    success: {
        fontWeight: 'bold',
        fontSize: 42,
        fontFamily: 'Cooper-Black',
        color: '#4CAF50', // Success Green
        marginBottom: 24,
    },
    timeWrapper: {
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 40,
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#eee',
    },
    timeLabel: {
        fontSize: 12,
        color: '#666',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    timeValue: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333',
    },
    button: {
        width: '100%',
        marginTop: 10,
    }
});