import notifee, { AndroidImportance, AuthorizationStatus } from '@notifee/react-native';
import { Platform } from 'react-native';

export interface NotificationData {
    userName: string;
    planName: string;
    dataMB: number;
}

export class NotificationService {
    private static channelId: string | null = null;

    static async requestPermission(): Promise<boolean> {
        try {
            const settings = await notifee.requestPermission();
            console.log('Notification permission status:', settings.authorizationStatus);

            if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED ||
                settings.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
                return true;
            }

            console.log('Notification permission denied');
            return false;
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    }

    static async createChannel(): Promise<string> {
        if (this.channelId) {
            return this.channelId;
        }

        try {
            // Create a channel for Android
            this.channelId = await notifee.createChannel({
                id: 'recharge',
                name: 'Recharge Notifications',
                importance: AndroidImportance.HIGH,
                vibration: true,
                sound: 'default',
            });
            console.log('Notification channel created:', this.channelId);
            return this.channelId;
        } catch (error) {
            console.error('Error creating notification channel:', error);
            throw error;
        }
    }

    static async showRechargeNotification(data: NotificationData): Promise<void> {
        try {
            console.log('Attempting to show notification with data:', data);

            // Request permission first (required for Android 13+)
            const hasPermission = await this.requestPermission();
            if (!hasPermission) {
                console.log('No notification permission, skipping notification');
                return;
            }

            const channelId = await this.createChannel();
            console.log('Using channel:', channelId);

            const notificationId = await notifee.displayNotification({
                title: `🎉 Recharge Successful, ${data.userName}!`,
                body: `Your ${data.planName} has been recharged with ${data.dataMB} MB. Enjoy your data!`,
                android: {
                    channelId,
                    importance: AndroidImportance.HIGH,
                    pressAction: {
                        id: 'default',
                    },
                    smallIcon: 'ic_launcher',
                },
            });

            console.log('Notification displayed with ID:', notificationId);
        } catch (error) {
            console.error('Failed to show notification:', error);
        }
    }
}
