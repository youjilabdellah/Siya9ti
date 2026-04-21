import { StyleSheet, Platform, StatusBar } from 'react-native';
import { Colors } from '../../theme/colors';

const YELLOW = '#F5C518';
const DARK = '#1A1A2E';
const MID = '#4A4A6A';
const LIGHT = '#F7F7FB';
const BORDER = '#E0E0EE';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  scroll: {
    padding: 16,
    paddingBottom: 40,
    gap: 20,
  },

  // ── Back ──
  backBtn: {
    marginBottom: 4,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.button.primary,
  },

  // ── Brand ──
  brandContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  brandTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: DARK,
    letterSpacing: -1,
  },
  brandSubtitle: {
    fontSize: 14,
    color: MID,
    textAlign: 'center',
    lineHeight: 20,
  },

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

  // ── Error ──
  errorText: {
    fontSize: 12,
    color: '#E53935',
    marginTop: 4,
    marginLeft: 4,
  },

  // ── Forgot ──
  forgotPassword: {
    fontSize: 13,
    color: YELLOW,
    fontWeight: '600',
    textAlign: 'right',
  },

  // ── Bottom ──
  bottomSection: {
    gap: 16,
  },

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

  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: MID,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: DARK,
    textDecorationLine: 'underline',
  },
});
