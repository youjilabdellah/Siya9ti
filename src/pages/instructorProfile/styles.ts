import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.screen,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  hero: {
    backgroundColor: Colors.text.primary,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
  backButtonText: {
    color: Colors.text.white,
    fontSize: 14,
    fontWeight: '600',
  },
  heroCard: {
    marginTop: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 24,
    padding: 20,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.border.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: Colors.text.primary,
    fontSize: 24,
    fontWeight: '800',
  },
  name: {
    color: Colors.text.white,
    fontSize: 28,
    fontWeight: '800',
  },
  headline: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 18,
  },
  statCard: {
    minWidth: 92,
    backgroundColor: Colors.background.card,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  statValue: {
    color: Colors.text.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  statLabel: {
    color: Colors.text.secondary,
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 22,
  },
  sectionTitle: {
    color: Colors.text.primary,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 12,
  },
  sectionText: {
    color: Colors.text.secondary,
    fontSize: 15,
    lineHeight: 22,
  },
  featureCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  featureTitle: {
    color: Colors.text.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  featureText: {
    color: Colors.text.secondary,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  pricingCard: {
    backgroundColor: Colors.background.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  pricingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pricingHours: {
    color: Colors.text.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  pricingValue: {
    color: Colors.text.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  pricingHint: {
    color: Colors.text.secondary,
    fontSize: 13,
    marginTop: 8,
  },
  stickyFooter: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  bookButton: {
    backgroundColor: Colors.border.primary,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  bookButtonText: {
    color: Colors.text.primary,
    fontSize: 15,
    fontWeight: '800',
  },
  emptyCard: {
    margin: 20,
    backgroundColor: Colors.background.card,
    borderRadius: 20,
    padding: 20,
  },
  emptyTitle: {
    color: Colors.text.primary,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
  },
  emptyText: {
    color: Colors.text.secondary,
    fontSize: 15,
    lineHeight: 22,
  },
  emptyActionButton: {
    marginTop: 18,
  },
});
