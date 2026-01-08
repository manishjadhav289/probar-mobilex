import { useColorScheme } from 'react-native';

export interface ThemeColors {
    background: string;
    cardBackground: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    progressBackground: string;
    statusBar: 'light-content' | 'dark-content';
}

const lightColors: ThemeColors = {
    background: '#f5f5f5',
    cardBackground: '#ffffff',
    text: '#333333',
    textSecondary: '#666666',
    textMuted: '#888888',
    progressBackground: '#e0e0e0',
    statusBar: 'dark-content',
};

const darkColors: ThemeColors = {
    background: '#121212',
    cardBackground: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#b0b0b0',
    textMuted: '#888888',
    progressBackground: '#333333',
    statusBar: 'light-content',
};

export interface UseThemeReturn {
    isDark: boolean;
    colors: ThemeColors;
}

export const useTheme = (): UseThemeReturn => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    return {
        isDark,
        colors: isDark ? darkColors : lightColors,
    };
};
