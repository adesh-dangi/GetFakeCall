import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Play, Pause, Phone, Video, RotateCcw } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CallPlaybackProps {
  scenario: string;
  type: 'audio' | 'video';
  onBack: () => void;
}

export default function CallPlayback({ scenario, type, onBack }: CallPlaybackProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getCallerInfo = (scenario: string) => {
    switch (scenario) {
      case 'Angry Girlfriend':
        return {
          name: 'Sarah ❤️',
          image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
          status: 'Calling...',
        };
      case 'Emergency Mom':
        return {
          name: 'Mom',
          image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
          status: 'Emergency Call',
        };
      case 'Sales Call':
        return {
          name: 'Unknown Number',
          image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
          status: 'Incoming Call',
        };
      case 'Strict Boss':
        return {
          name: 'Mr. Johnson',
          image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
          status: 'Work Call',
        };
      default:
        return {
          name: 'Unknown',
          image: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400',
          status: 'Incoming Call',
        };
    }
  };

  const callerInfo = getCallerInfo(scenario);

  return (
    <LinearGradient
      colors={['#1F2937', '#111827']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <RotateCcw size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.callType}>
          {type === 'video' ? 'Video Call' : 'Voice Call'}
        </Text>
      </View>

      <View style={styles.callerContainer}>
        <View style={styles.callerImageContainer}>
          <Image source={{ uri: callerInfo.image }} style={styles.callerImage} />
        </View>
        <Text style={styles.callerName}>{callerInfo.name}</Text>
        <Text style={styles.callerStatus}>{callerInfo.status}</Text>
        <Text style={styles.duration}>{formatTime(duration)}</Text>
      </View>

      {type === 'video' && (
        <View style={styles.videoContainer}>
          <Image source={{ uri: callerInfo.image }} style={styles.videoImage} />
          <View style={styles.videoOverlay}>
            <Text style={styles.videoText}>Video Call Active</Text>
          </View>
        </View>
      )}

      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause size={24} color="#FFFFFF" />
          ) : (
            <Play size={24} color="#FFFFFF" />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.endCallButton} onPress={onBack}>
          <Phone size={24} color="#FFFFFF" />
        </TouchableOpacity>

        {type === 'video' && (
          <TouchableOpacity style={styles.controlButton}>
            <Video size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Tap the red button to end the call
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    padding: 8,
  },
  callType: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  callerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  callerImageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  callerImage: {
    width: '100%',
    height: '100%',
  },
  callerName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  callerStatus: {
    fontSize: 18,
    color: '#D1D5DB',
    marginBottom: 20,
  },
  duration: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  videoContainer: {
    position: 'absolute',
    top: 100,
    right: 20,
    width: 120,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  videoImage: {
    width: '100%',
    height: '100%',
  },
  videoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
  },
  videoText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingBottom: 40,
    gap: 40,
  },
  controlButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endCallButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '135deg' }],
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});