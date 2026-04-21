import { Platform, StatusBar, StyleSheet } from 'react-native';

const YELLOW = '#F5C518';
const DARK = '#1A1A2E';
const MID = '#4A4A6A';

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

  backBtn: {
    marginBottom: 4,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: YELLOW,
  },

  brandContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  brandTitle: {
    fontSize: 32,
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

  hint: {
    fontSize: 13,
    color: MID,
    lineHeight: 19,
  },

  errorText: {
    fontSize: 12,
    color: '#E53935',
    marginTop: 4,
    marginLeft: 4,
  },

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

  disabledBtn: {
    opacity: 0.6,
  },
});
