import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// ─── DATA TYPES ───────────────────────────────────────────────────────────────
interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  icon: string;
}
// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  bg: '#0A0A0A',
  card: '#141414',
  cardAlt: '#1C1C1C',
  gold: '#C9A84C',
  goldLight: '#E4C97B',
  goldDim: '#6B5520',
  white: '#F5F0E8',
  gray: '#888888',
  grayDim: '#444444',
  red: '#C0392B',
} as const;

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const SERVICES: Service[] = [
  { id: '1', name: 'Classic Cut',         duration: '30 min', price: '$25', icon: '✂️' },
  { id: '2', name: 'Beard Trim',          duration: '20 min', price: '$15', icon: '🪒' },
  { id: '3', name: 'Hot Towel Shave',     duration: '45 min', price: '$35', icon: '🧴' },
  { id: '4', name: 'Fade & Design',       duration: '45 min', price: '$40', icon: '💈' },
  { id: '5', name: 'Hair + Beard Combo',  duration: '60 min', price: '$50', icon: '👑' },
  { id: '6', name: 'Kids Cut',            duration: '20 min', price: '$18', icon: '🌟' },
];
// ─── SERVICES SCREEN ─────────────────────────────────────────────────────────
const ServicesScreen: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screenHeader}>
        <Text style={styles.screenTitle}>Services</Text>
        <Text style={styles.screenSub}>Choose your grooming treatment</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
        {SERVICES.map((s) => (
          <TouchableOpacity
            key={s.id}
            style={[styles.serviceCard, selected === s.id && styles.serviceCardSelected]}
            onPress={() => setSelected(s.id)}
          >
            <View style={styles.serviceIconBox}>
              <Text style={{ fontSize: 28 }}>{s.icon}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.serviceName}>{s.name}</Text>
              <Text style={styles.serviceDuration}>⏱ {s.duration}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.servicePrice}>{s.price}</Text>
              {selected === s.id && (
                <Text style={{ color: C.gold, fontSize: 12, marginTop: 4 }}>✓ Selected</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
        {selected && (
          <TouchableOpacity style={styles.primaryBtn} onPress={() => console.log('Booking')}>
            <Text style={styles.primaryBtnText}>Continue to Booking</Text>
          </TouchableOpacity>
        )}
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ServicesScreen;

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },

  // Tab Bar
  tabBar: {
    backgroundColor: C.card,
    borderTopColor: C.goldDim,
    borderTopWidth: 1,
    height: 70,
    paddingBottom: 10,
    paddingTop: 8,
  },
  tabLabel: { fontSize: 10 },

  // Home
  homeHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: 20, paddingTop: 16, paddingBottom: 12,
  },
  homeGreeting: { color: C.gray, fontSize: 14 },
  homeUser:     { color: C.white, fontSize: 22, fontWeight: '700' },
  notifBtn: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: C.card, justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: C.grayDim,
  },

  heroBanner: {
    marginHorizontal: 20, borderRadius: 20,
    backgroundColor: '#0E1A10',
    borderWidth: 1, borderColor: C.goldDim,
    padding: 24, flexDirection: 'row', alignItems: 'center',
    marginBottom: 24, overflow: 'hidden',
  },
  heroContent: { flex: 1 },
  heroTagline:  { color: C.gold, fontSize: 11, letterSpacing: 3, fontWeight: '700', marginBottom: 8 },
  heroTitle:    { color: C.white, fontSize: 26, fontWeight: '800', lineHeight: 32, marginBottom: 20 },
  heroBtn:      { backgroundColor: C.gold, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, alignSelf: 'flex-start' },
  heroBtnText:  { color: C.bg, fontWeight: '800', fontSize: 13, letterSpacing: 1 },
  heroEmoji:    { fontSize: 64, opacity: 0.3 },

  statsRow: { flexDirection: 'row', gap: 10, marginHorizontal: 20, marginBottom: 28 },
  statCard: {
    flex: 1, backgroundColor: C.card, borderRadius: 12, padding: 14, alignItems: 'center',
    borderWidth: 1, borderColor: C.grayDim,
  },
  statValue: { color: C.gold, fontSize: 22, fontWeight: '800' },
  statLabel: { color: C.gray, fontSize: 11, marginTop: 4 },

  section:      { paddingHorizontal: 20, marginBottom: 24 },
  sectionTitle: { color: C.white, fontSize: 18, fontWeight: '700' },
  sectionSub:   { color: C.gray,  fontSize: 12, marginTop: 2 },
  rowBetween:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  seeAll:       { color: C.gold, fontSize: 13 },

  serviceChip: {
    backgroundColor: C.card, borderRadius: 14, padding: 16, marginRight: 12,
    alignItems: 'center', width: 110, borderWidth: 1, borderColor: C.grayDim,
  },
  serviceChipName:  { color: C.white, fontSize: 12, marginTop: 8, textAlign: 'center', fontWeight: '600' },
  serviceChipPrice: { color: C.gold, fontSize: 13, marginTop: 4, fontWeight: '700' },

  barberCard: {
    backgroundColor: C.card, borderRadius: 14, padding: 14,
    flexDirection: 'row', alignItems: 'center', marginBottom: 12,
    borderWidth: 1, borderColor: C.grayDim,
  },
  barberAvatar: {
    width: 50, height: 50, borderRadius: 25,
    justifyContent: 'center', alignItems: 'center', marginRight: 14,
    borderWidth: 2, borderColor: C.goldDim,
  },
  barberInitial:   { color: C.white, fontSize: 20, fontWeight: '700' },
  barberName:      { color: C.white, fontWeight: '700', fontSize: 15 },
  barberSpecialty: { color: C.gray, fontSize: 12, marginTop: 2 },
  barberMeta:      { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 4 },
  barberRating:    { color: C.gold, fontSize: 12, fontWeight: '600' },
  barberReviews:   { color: C.gray, fontSize: 11 },
  availBadge:      { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  availText:       { fontSize: 11, fontWeight: '600' },
  bookMiniBtn:     { backgroundColor: C.gold, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8 },
  bookMiniBtnText: { color: C.bg, fontWeight: '700', fontSize: 12 },

  promoBanner: {
    marginHorizontal: 20, borderRadius: 14, padding: 16,
    backgroundColor: '#1A160A', borderWidth: 1, borderColor: C.gold,
    flexDirection: 'row', alignItems: 'center', gap: 12,
  },
  promoEmoji:   { fontSize: 30 },
  promoTitle:   { color: C.gold, fontWeight: '700', fontSize: 15 },
  promoSub:     { color: C.gray, fontSize: 12, marginTop: 2 },
  promoBtn:     { backgroundColor: C.gold, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  promoBtnText: { color: C.bg, fontWeight: '700', fontSize: 13 },

  screenHeader: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16 },
  screenTitle:  { color: C.white, fontSize: 26, fontWeight: '800' },
  screenSub:    { color: C.gray, fontSize: 13, marginTop: 4 },

  serviceCard: {
    backgroundColor: C.card, borderRadius: 14, padding: 16,
    flexDirection: 'row', alignItems: 'center', marginBottom: 12,
    borderWidth: 1, borderColor: C.grayDim,
  },
  serviceCardSelected: { borderColor: C.gold, backgroundColor: '#1A160A' },
  serviceIconBox: {
    width: 52, height: 52, borderRadius: 12,
    backgroundColor: C.cardAlt, justifyContent: 'center', alignItems: 'center', marginRight: 14,
  },
  serviceName:     { color: C.white, fontWeight: '700', fontSize: 15 },
  serviceDuration: { color: C.gray, fontSize: 12, marginTop: 4 },
  servicePrice:    { color: C.gold, fontWeight: '800', fontSize: 18 },

  barberDetailCard: {
    backgroundColor: C.card, borderRadius: 16, padding: 20, marginBottom: 16,
    borderWidth: 1, borderColor: C.grayDim, alignItems: 'center',
  },
  barberAvatarLg: {
    width: 80, height: 80, borderRadius: 40,
    justifyContent: 'center', alignItems: 'center', marginBottom: 12,
    borderWidth: 2, borderColor: C.gold,
  },
  barberInitialLg:   { color: C.white, fontSize: 32, fontWeight: '700' },
  barberNameLg:      { color: C.white, fontSize: 20, fontWeight: '700' },
  barberSpecialtyLg: { color: C.gold, fontSize: 13, marginTop: 4 },
  barberStatsRow:    { flexDirection: 'row', gap: 20 },
  barberStat:        { alignItems: 'center' },
  barberStatVal:     { color: C.gold, fontSize: 20, fontWeight: '800' },
  barberStatLbl:     { color: C.gray, fontSize: 11, marginTop: 2 },

  progressBar:  { height: 4, backgroundColor: C.card, borderRadius: 2, marginBottom: 24, overflow: 'hidden' },
  progressFill: { height: 4, backgroundColor: C.gold, borderRadius: 2 },

  selectChip: {
    backgroundColor: C.card, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10,
    marginRight: 10, alignItems: 'center', borderWidth: 1, borderColor: C.grayDim, gap: 4,
  },
  selectChipActive: { backgroundColor: C.gold, borderColor: C.gold },
  chipText:         { color: C.white, fontSize: 12, fontWeight: '600' },

  barberChip: {
    backgroundColor: C.card, borderRadius: 10, paddingHorizontal: 14, paddingVertical: 10,
    marginRight: 10, alignItems: 'center', borderWidth: 1, borderColor: C.grayDim, gap: 6,
  },
  barberChipActive: { backgroundColor: C.gold, borderColor: C.gold },
  barberChipAvatar: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },

  daysRow: { flexDirection: 'row', gap: 8, marginBottom: 24, flexWrap: 'wrap' },
  dayBtn: {
    flex: 1, minWidth: 44, backgroundColor: C.card, borderRadius: 10, padding: 10,
    alignItems: 'center', borderWidth: 1, borderColor: C.grayDim,
  },
  dayBtnActive: { backgroundColor: C.gold, borderColor: C.gold },
  dayText:      { color: C.gray, fontSize: 11, fontWeight: '600' },
  dayNum:       { color: C.white, fontSize: 16, fontWeight: '700', marginTop: 2 },

  timesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 24 },
  timeBtn:   {
    backgroundColor: C.card, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10,
    borderWidth: 1, borderColor: C.grayDim,
  },
  timeBtnActive: { backgroundColor: C.gold, borderColor: C.gold },
  timeText:      { color: C.white, fontSize: 13, fontWeight: '600' },

  confirmCard: {
    backgroundColor: C.card, borderRadius: 16, padding: 20,
    borderWidth: 1, borderColor: C.goldDim,
  },
  confirmRow:   { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  confirmLabel: { color: C.gray, fontSize: 13 },
  confirmValue: { color: C.white, fontWeight: '700', fontSize: 14 },

  noteInput: {
    backgroundColor: C.card, borderRadius: 12, padding: 14, color: C.white,
    fontSize: 14, borderWidth: 1, borderColor: C.grayDim, marginBottom: 24,
    textAlignVertical: 'top', minHeight: 80,
  },

  primaryBtn:         { backgroundColor: C.gold, borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 16 },
  primaryBtnDisabled: { backgroundColor: C.goldDim, opacity: 0.5 },
  primaryBtnText:     { color: C.bg, fontWeight: '800', fontSize: 15, letterSpacing: 0.5 },

  ghostBtn:     { borderWidth: 1, borderColor: C.grayDim, borderRadius: 12, paddingVertical: 14, alignItems: 'center', marginTop: 10 },
  ghostBtnText: { color: C.gray, fontWeight: '600', fontSize: 14 },

  profileHeader: { alignItems: 'center', paddingVertical: 28, paddingHorizontal: 20 },
  profileAvatar: {
    width: 88, height: 88, borderRadius: 44, backgroundColor: C.card,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: C.gold, marginBottom: 14,
  },
  profileName:  { color: C.white, fontSize: 22, fontWeight: '800' },
  profileEmail: { color: C.gray,  fontSize: 13, marginTop: 4, marginBottom: 10 },

  goldBadge:     { backgroundColor: '#1A160A', borderWidth: 1, borderColor: C.gold, paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20 },
  goldBadgeText: { color: C.gold, fontSize: 12, fontWeight: '700', letterSpacing: 1 },

  menuItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: C.card,
    borderRadius: 12, padding: 16, marginBottom: 10,
    borderWidth: 1, borderColor: C.grayDim,
  },
  menuLabel: { color: C.white, fontSize: 14, fontWeight: '600' },
  menuSub:   { color: C.gray,  fontSize: 12, marginTop: 2 },
  version:   { color: C.grayDim, textAlign: 'center', fontSize: 12, marginTop: 8 },
});
