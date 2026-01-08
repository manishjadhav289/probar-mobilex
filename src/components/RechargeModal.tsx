import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    Easing,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface RechargeModalProps {
    visible: boolean;
    onClose: () => void;
}

const AnimatedCheckIcon: React.FC<{ animate: boolean }> = ({ animate }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const checkAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (animate) {
            // Reset animations
            scaleAnim.setValue(0);
            checkAnim.setValue(0);

            // Run animations in sequence
            Animated.sequence([
                // Circle pops in with bounce
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 4,
                    tension: 100,
                    useNativeDriver: true,
                }),
                // Checkmark draws in
                Animated.timing(checkAnim, {
                    toValue: 1,
                    duration: 300,
                    easing: Easing.out(Easing.ease),
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [animate, scaleAnim, checkAnim]);

    return (
        <Animated.View
            style={[
                styles.checkIconContainer,
                {
                    transform: [{ scale: scaleAnim }],
                },
            ]}
        >
            <View style={styles.checkCircle}>
                <Animated.View style={{ opacity: checkAnim, transform: [{ scale: checkAnim }] }}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M5 12l5 5 9-9"
                            stroke="#1a1a1a"
                            strokeWidth={3}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </Svg>
                </Animated.View>
            </View>
        </Animated.View>
    );
};

const RechargeModal: React.FC<RechargeModalProps> = ({ visible, onClose }) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Payment successful!</Text>

                    <View style={styles.messageRow}>
                        <AnimatedCheckIcon animate={visible} />
                        <Text style={styles.messageText}>
                            Thank you, your payment has been successfully processed.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#2ecc71',
        borderRadius: 12,
        padding: 24,
        marginHorizontal: 40,
        alignItems: 'center',
        width: '80%',
        maxWidth: 300,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 16,
        textAlign: 'center',
    },
    checkIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    checkCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#1a1a1a',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    messageText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
        lineHeight: 20,
    },
    closeButton: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
});

export default RechargeModal;
