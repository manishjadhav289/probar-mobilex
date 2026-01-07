import React from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface RechargeModalProps {
    visible: boolean;
    onClose: () => void;
}

const CheckIcon = () => (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Circle cx={12} cy={12} r={11} stroke="#2ecc71" strokeWidth={2} />
        <Path
            d="M7 12l3 3 7-7"
            stroke="#2ecc71"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);

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
                        <CheckIcon />
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
        marginBottom: 20,
        textAlign: 'center',
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 24,
    },
    messageText: {
        fontSize: 14,
        color: '#333',
        marginLeft: 12,
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
