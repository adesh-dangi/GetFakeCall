import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CallGenerator from '@/components/CallGenerator';
import CallPlayback from '@/components/CallPlayback';

export default function HomeScreen() {
  const [currentCall, setCurrentCall] = useState<{
    scenario: string;
    type: 'audio' | 'video';
    userId: string;
  } | null>(null);

  const handleGenerateCall = (scenario: string, type: 'audio' | 'video', userId: string) => {
    setCurrentCall({ scenario, type, userId });
  };

  const handleBackToGenerator = () => {
    setCurrentCall(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      {currentCall ? (
        <CallPlayback
          scenario={currentCall.scenario}
          type={currentCall.type}
          onBack={handleBackToGenerator}
        />
      ) : (
        <LinearGradient
          colors={['#F8FAFC', '#E2E8F0']}
          style={styles.gradient}
        >
          <CallGenerator onGenerateCall={handleGenerateCall} />
        </LinearGradient>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  gradient: {
    flex: 1,
  },
});