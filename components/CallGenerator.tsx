import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { Phone, Video, Play, Pause, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@/contexts/AuthContext';

const CALL_SCENARIOS = [
  'Angry Girlfriend',
  'Emergency Mom',
  'Sales Call',
  'Strict Boss',
];

interface CallGeneratorProps {
  onGenerateCall: (scenario: string, type: 'audio' | 'video', userId: string) => void;
}

export default function CallGenerator({ onGenerateCall }: CallGeneratorProps) {
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [callType, setCallType] = useState<'audio' | 'video'>('audio');
  const [showScenarioModal, setShowScenarioModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleGenerateCall = async () => {
    if (!selectedScenario) {
      Alert.alert('Error', 'Please select a call scenario');
      return;
    }

    if (!user?.id) {
      Alert.alert('Error', 'User not authenticated');
      return;
    }

    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      onGenerateCall(selectedScenario, callType, user.id);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate call');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate Fake Call</Text>
      <Text style={styles.subtitle}>
        Create a realistic fake call to get out of any situation
      </Text>

      {/* Scenario Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Scenario</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowScenarioModal(true)}
        >
          <Text style={[styles.dropdownText, !selectedScenario && styles.placeholder]}>
            {selectedScenario || 'Choose a scenario...'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Call Type Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Call Type</Text>
        <View style={styles.callTypeContainer}>
          <TouchableOpacity
            style={[
              styles.callTypeButton,
              callType === 'audio' && styles.callTypeButtonActive,
            ]}
            onPress={() => setCallType('audio')}
          >
            <Phone
              size={24}
              color={callType === 'audio' ? '#FFFFFF' : '#6B7280'}
            />
            <Text
              style={[
                styles.callTypeText,
                callType === 'audio' && styles.callTypeTextActive,
              ]}
            >
              Audio Call
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.callTypeButton,
              callType === 'video' && styles.callTypeButtonActive,
            ]}
            onPress={() => setCallType('video')}
          >
            <Video
              size={24}
              color={callType === 'video' ? '#FFFFFF' : '#6B7280'}
            />
            <Text
              style={[
                styles.callTypeText,
                callType === 'video' && styles.callTypeTextActive,
              ]}
            >
              Video Call
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Generate Button */}
      <TouchableOpacity
        style={[styles.generateButton, loading && styles.generateButtonDisabled]}
        onPress={handleGenerateCall}
        disabled={loading}
      >
        <LinearGradient
          colors={loading ? ['#9CA3AF', '#9CA3AF'] : ['#3B82F6', '#1D4ED8']}
          style={styles.generateButtonGradient}
        >
          <Text style={styles.generateButtonText}>
            {loading ? 'Generating Call...' : 'Generate Call'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      {/* Scenario Selection Modal */}
      <Modal
        visible={showScenarioModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowScenarioModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Scenario</Text>
              <TouchableOpacity onPress={() => setShowScenarioModal(false)}>
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            {CALL_SCENARIOS.map((scenario) => (
              <TouchableOpacity
                key={scenario}
                style={[
                  styles.scenarioOption,
                  selectedScenario === scenario && styles.scenarioOptionSelected,
                ]}
                onPress={() => {
                  setSelectedScenario(scenario);
                  setShowScenarioModal(false);
                }}
              >
                <Text
                  style={[
                    styles.scenarioOptionText,
                    selectedScenario === scenario && styles.scenarioOptionTextSelected,
                  ]}
                >
                  {scenario}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  dropdownText: {
    fontSize: 16,
    color: '#111827',
  },
  placeholder: {
    color: '#9CA3AF',
  },
  callTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  callTypeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  callTypeButtonActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  callTypeText: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 8,
    fontWeight: '500',
  },
  callTypeTextActive: {
    color: '#FFFFFF',
  },
  generateButton: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  generateButtonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  generateButtonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  scenarioOption: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  scenarioOptionSelected: {
    backgroundColor: '#EBF4FF',
    borderColor: '#3B82F6',
  },
  scenarioOptionText: {
    fontSize: 16,
    color: '#111827',
    textAlign: 'center',
  },
  scenarioOptionTextSelected: {
    color: '#3B82F6',
    fontWeight: '600',
  },
});