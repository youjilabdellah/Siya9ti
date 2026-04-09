import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginHorizontal: 16,
    marginVertical: 8,
  },

  /* ── Top row ── */
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 14,
    backgroundColor: '#E5E7EB',
  },
  infoBlock: {
    flex: 1,
  },

  /* ── Text ── */
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 2,
  },
  title: {
    fontSize: 13,
    color: '#9CA3AF',
    marginBottom: 10,
  },

  /* ── Badges ── */
  badgesRow: {
    flexDirection: 'row',
    gap: 6,
  },
  badgesColumn: {
    flex: 1,
    gap: 4,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  badgeIcon: {
    fontSize: 13,
  },
  badgeLabel: {
    fontSize: 11.5,
    color: '#374151',
    fontWeight: '500',
  },

  /* ── Buttons ── */
  buttonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButton: {
    backgroundColor: '#FDE047',
    borderWidth: 0,
  },
  outlineButtonText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#111827',
  },
  filledButton: {
    backgroundColor: '#FBBF24',
  },
  filledButtonText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#111827',
  },
});
