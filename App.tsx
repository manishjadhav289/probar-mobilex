import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import CircularProgress from './src/components/CircularProgress';
import RechargeModal from './src/components/RechargeModal';
import { useDataUsage } from './src/hooks/useDataUsage';
import { NotificationService } from './src/services/NotificationService';

const App = (): React.JSX.Element => {
  const {
    userData,
    usedData,
    remainingData,
    percentageRemaining,
    progressColor,
    handleRecharge,
  } = useDataUsage();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const onRechargePress = () => {
    setIsModalVisible(true);
  };

  const onModalClose = async () => {
    handleRecharge(); // Reset data when modal is closed
    setIsModalVisible(false);
    // Show device notification with dynamic user data
    await NotificationService.showRechargeNotification({
      userName: userData.userName,
      planName: userData.planName,
      dataMB: userData.totalDataMB,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {userData.userName}</Text>
          <Text style={styles.planName}>{userData.planName}</Text>
        </View>

        <View style={styles.progressContainer}>
          <CircularProgress
            size={250}
            strokeWidth={20}
            percentage={percentageRemaining}
            color={progressColor}
            backgroundColor="#e0e0e0"
          >
            <View style={styles.innerContent}>
              {percentageRemaining === 0 ? (
                <>
                  <Text style={styles.urgentText}>No{'\n'}Data Available</Text>
                  <Text style={styles.suspendedText}>RECHARGE{'\n'}NOW</Text>
                </>
              ) : (
                <>
                  <Text style={[styles.percentageText, { color: progressColor }]}>
                    {Math.round(percentageRemaining)}%
                  </Text>
                  <Text style={styles.remainingLabel}>Remaining</Text>
                  <Text style={styles.dataText}>
                    {usedData.toFixed(1)} {userData.currency} / {userData.totalDataMB} {userData.currency}
                  </Text>
                </>
              )}
            </View>
          </CircularProgress>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#2ecc71' }]} onPress={onRechargePress}>
            <Text style={styles.buttonText}>RECHARGE DATA</Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>
            Data consumes automatically every second. Tap Recharge to reset.
          </Text>
        </View>
      </ScrollView>

      <RechargeModal visible={isModalVisible} onClose={onModalClose} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  planName: {
    fontSize: 18,
    color: '#666',
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 150,
    padding: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  innerContent: {
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  remainingLabel: {
    fontSize: 16,
    color: '#888',
    marginTop: 5,
  },
  dataText: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  urgentText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
    lineHeight: 28,
  },
  suspendedText: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 16,
  },
  footer: {
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
  },
});

export default App;
