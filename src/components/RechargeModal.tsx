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
    isDark?: boolean;
}

const AnimatedCheckIcon: React.FC<{ animate: boolean; isDark?: boolean }> = ({ animate, isDark }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const checkAnim = useRef(new Animated.Value(0)).current;
    const strokeColor = isDark ? '#ffffff' : '#1a1a1a';

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
            <View style={[styles.checkCircle, { borderColor: strokeColor }]}>
                <Animated.View style={{ opacity: checkAnim, transform: [{ scale: checkAnim }] }}>
                    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
                        <Path
                            d="M5 12l5 5 9-9"
                            stroke={strokeColor}
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

const RechargeModal: React.FC<RechargeModalProps> = ({ visible, onClose, isDark = false }) => {
    const modalBg = isDark ? '#1a472a' : '#2ecc71';
    const titleColor = isDark ? '#ffffff' : '#000000';
    const textColor = isDark ? '#e0e0e0' : '#333333';
    const buttonBg = isDark ? '#2a2a2a' : '#f5f5f5';
    const buttonTextColor = isDark ? '#ffffff' : '#333333';

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.modalContainer, { backgroundColor: modalBg }]}>
                    <Text style={[styles.title, { color: titleColor }]}>Payment successful!</Text>

                    <View style={styles.messageRow}>
                        <AnimatedCheckIcon animate={visible} isDark={isDark} />
                        <Text style={[styles.messageText, { color: textColor }]}>
                            Thank you, your payment has been successfully processed.
                        </Text>
                    </View>

                    <TouchableOpacity style={[styles.closeButton, { backgroundColor: buttonBg }]} onPress={onClose}>
                        <Text style={[styles.closeButtonText, { color: buttonTextColor }]}>Close</Text>
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
        flex: 1,
        lineHeight: 20,
    },
    closeButton: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default RechargeModal;
