import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { styles } from './instractorCard.styles';

type Badge = {
  icon: string;
  label: string;
};

type InstructorCardProps = {
  name: string;
  title: string;
  avatarUri: string;
  badges: Badge[];
  onViewProfile?: () => void;
  onBookOnline?: () => void;
};

const BADGES: Badge[] = [
  { icon: '🌍', label: 'Intl conversions' },
  { icon: '🚗', label: 'Your car or mine' },
  { icon: '⭐', label: 'Free cancellation' },
  { icon: '📦', label: 'Test package' },
];

export default function InstructorCard({
  name = 'Darrell Steward',
  title = 'Standard Driving Instructor',
  avatarUri = 'https://randomuser.me/api/portraits/men/32.jpg',
  badges = BADGES,
  onViewProfile,
  onBookOnline,
}: Partial<InstructorCardProps>) {
  // Split badges into two columns
  const leftBadges = badges.filter((_, i) => i % 2 === 0);
  const rightBadges = badges.filter((_, i) => i % 2 !== 0);

  return (
    <View style={styles.card}>
      {/* Top Section: Avatar + Info */}
      <View style={styles.topRow}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />

        <View style={styles.infoBlock}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.title}>{title}</Text>

          {/* Badges Grid */}
          <View style={styles.badgesRow}>
            <View style={styles.badgesColumn}>
              {leftBadges.map((badge, i) => (
                <View key={i} style={styles.badge}>
                  <Text style={styles.badgeIcon}>{badge.icon}</Text>
                  <Text style={styles.badgeLabel}>{badge.label}</Text>
                </View>
              ))}
            </View>
            <View style={styles.badgesColumn}>
              {rightBadges.map((badge, i) => (
                <View key={i} style={styles.badge}>
                  <Text style={styles.badgeIcon}>{badge.icon}</Text>
                  <Text style={styles.badgeLabel}>{badge.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* Buttons Row */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
          style={[styles.button, styles.outlineButton]}
          onPress={onViewProfile}
          activeOpacity={0.8}
        >
          <Text style={styles.outlineButtonText}>View Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.filledButton]}
          onPress={onBookOnline}
          activeOpacity={0.8}
        >
          <Text style={styles.filledButtonText}>Book Online Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
