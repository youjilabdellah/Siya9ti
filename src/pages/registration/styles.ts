import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

const YELLOW = '#F5C518';
const DARK = '#1A1A2E';
const MID = '#4A4A6A';
const LIGHT = '#F7F7FB';
const BORDER = '#E0E0EE';
const RED = '#E53935';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAFAFA',

  },

  // ── Step Indicator ──
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: BORDER,
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  stepLine: {
    position: 'absolute',
    top: 14,
    right: '50%',
    left: '-50%',
    height: 2,
    backgroundColor: BORDER,
  },
  stepLineDone: { backgroundColor: YELLOW },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  stepCircleDone: { backgroundColor: YELLOW },
  stepCircleActive: { backgroundColor: '#fff', borderWidth: 2, borderColor: YELLOW },
  stepCheckmark: { color: '#fff', fontWeight: '700', fontSize: 13 },
  stepAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: YELLOW,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepAvatarText: { fontSize: 9, fontWeight: '800', color: DARK },
  stepDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ccc' },
  stepLabel: { fontSize: 8, color: '#ccc', marginTop: 3, letterSpacing: 0.5 },
  stepLabelActive: { color: YELLOW },
  stepName: { fontSize: 9, color: '#aaa', fontWeight: '600', letterSpacing: 0.3 },
  stepNameActive: { color: DARK },

  // ── Scroll ──
  scroll: { padding: 16, paddingBottom: 40, gap: 12 },

  // ── Card ──
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: DARK,
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    gap: 12,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: DARK,
    letterSpacing: -0.3,
  },

  // ── Radio ──
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterSelected: { borderColor: YELLOW },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: YELLOW },
  radioLabel: { fontSize: 14, color: MID, flex: 1 },

  // ── Cart Badge ──
  cartBadge: {
    flexDirection: 'row',
    backgroundColor: '#FFFDE7',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderLeftWidth: 3,
    borderLeftColor: YELLOW,
    flexWrap: 'wrap',
  },
  cartBadgeText: { fontSize: 13, color: MID },
  bold: { fontWeight: '700', color: DARK },

  // ── Section Header ──
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  sectionAccent: {
    width: 3,
    height: 18,
    borderRadius: 2,
    backgroundColor: YELLOW,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: DARK,
    letterSpacing: 0.8,
    flex: 1,
  },

  // ── Floating Input ──
  inputWrapper: {
    borderWidth: 1.5,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 18,
    paddingBottom: 10,
    backgroundColor: LIGHT,
    position: 'relative',
  },
  inputWrapperFocused: {
    borderColor: YELLOW,
    backgroundColor: '#fff',
  },
  floatLabel: {
    position: 'absolute',
    top: 14,
    left: 14,
    fontSize: 14,
    color: '#aaa',
  },
  floatLabelRaised: {
    top: 6,
    fontSize: 10,
    color: MID,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  asterisk: { color: RED },
  textInput: {
    fontSize: 15,
    color: DARK,
    paddingTop: 2,
    fontWeight: '500',
  },

  // ── Select ──
  selectRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 2,
  },
  selectValue: { fontSize: 15, color: DARK, fontWeight: '500' },
  chevron: { fontSize: 22, color: '#aaa', transform: [{ rotate: '90deg' }] },

  // ── DOB ──
  dobContainer: {
    borderWidth: 1.5,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: LIGHT,
  },
  dobLabel: { fontSize: 10, color: MID, fontWeight: '600', marginBottom: 6, letterSpacing: 0.4 },
  dobRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  dobInput: {
    flex: 1,
    borderBottomWidth: 1.5,
    borderBottomColor: BORDER,
    fontSize: 15,
    color: DARK,
    textAlign: 'center',
    paddingBottom: 4,
    fontWeight: '500',
  },
  dobSep: { fontSize: 18, color: '#ccc', fontWeight: '300' },

  // ── Hint ──
  hint: { fontSize: 12, color: '#999', lineHeight: 17 },
  errorText: { fontSize: 12, color: '#E53935', marginTop: 4, marginLeft: 4 },

  // ── Bottom ──
  bottomSection: { gap: 16 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: { backgroundColor: YELLOW, borderColor: YELLOW },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: '800' },
  termsText: { fontSize: 13, color: MID, flex: 1 },
  termsLink: { color: DARK, fontWeight: '700', textDecorationLine: 'underline' },

  continueBtn: {
    backgroundColor: YELLOW,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: YELLOW,
    shadowOpacity: 0.45,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  continueBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: DARK,
    letterSpacing: 1.2,
  },
  backRow: {
    paddingBottom: 0,
    marginBottom: 12,
  },
  backBtn: {
    marginBottom: 12,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.button.primary,
  },
});
