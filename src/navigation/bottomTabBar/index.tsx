// BottomTabBar.tsx
import { JSX } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';

// ─── Icon Components ───────────────────────────────────────────────────────────

const HomeIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CalendarIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11v4m-2-2h4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const UserIcon = ({ color }: { color: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21a8 8 0 10-16 0"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 11a4 4 0 100-8 4 4 0 000 8z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ─── Tab Config ────────────────────────────────────────────────────────────────

type TabKey = 'home' | 'reservations' | 'moi';

interface Tab {
  key: TabKey;
  label: string;
  icon: (color: string) => JSX.Element;
  badge?: boolean;
}

const TABS: Tab[] = [
  { key: 'home',         label: 'Accueil',       icon: (c) => <HomeIcon color={c} /> },
  { key: 'reservations', label: 'Réservations',   icon: (c) => <CalendarIcon color={c} /> },
  { key: 'moi',          label: 'Moi',            icon: (c) => <UserIcon color={c} /> },
];

const GOLD = '#F5B800';
const GOLD_BG = '#FFF8DC';
const INACTIVE_COLOR = '#9E9E9E';

// ─── Main Component ────────────────────────────────────────────────────────────

export default function BottomTabBar({
  state,
  navigation,
}: BottomTabBarProps) {
  const activeTabIndex = state.index;
  const activeTabKey = state.routes[activeTabIndex]?.name as TabKey;

  const handlePress = (key: TabKey) => {
    navigation.navigate(key);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.wrapper}>
        <View style={styles.pillBar}>
          {TABS.map((tab) => {
            const isActive = activeTabKey === tab.key;
            const iconColor = isActive ? GOLD : INACTIVE_COLOR;

            return (
              <TouchableOpacity
                key={tab.key}
                onPress={() => handlePress(tab.key)}
                style={[styles.tabItem, isActive && styles.tabItemActive]}
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel={tab.label}
                accessibilityState={{ selected: isActive }}
              >
                {/* Icon + optional badge */}
                <View style={styles.iconWrap}>
                  {tab.icon(iconColor)}
                  {tab.badge && (
                    <View style={styles.badge} />
                  )}
                </View>

                {/* Label */}
                <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
  },
  wrapper: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(0,0,0,0.12)',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'android' ? 16 : 8,
  },
  pillBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.12)',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderRadius: 16,
  },
  tabItemActive: {
    backgroundColor: GOLD_BG,
  },
  iconWrap: {
    position: 'relative',
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E24B4A',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '400',
    color: INACTIVE_COLOR,
    letterSpacing: 0.3,
  },
  tabLabelActive: {
    color: GOLD,
    fontWeight: '500',
  },
});
