import { StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
    color: Colors.text.primary,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background.screen,

  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background.card,
  },

  logo: {
    height: 70,
    transform: [{ translateX: -50 }],
  },

  menu: {
    fontSize: 24,
  },

  hero: {
    padding: 20,
    height: 250,
  },

  heroTitle: {
    color: Colors.text.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  heroSubtitle: {
    color: Colors.text.muted,
    fontSize: 14,
  },

  carImage: {
    width: '100%',
    height: 150,
    marginTop: 20,
  },

  card: {
    backgroundColor: Colors.background.card,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border.primary,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },

  cardSubtitle: {
    fontSize: 13,
    color: Colors.text.secondary,
    marginBottom: 15,
  },

  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border.primary,
    marginBottom: 15,
  },

  toggleButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: Colors.background.muted,
  },

  active: {
    backgroundColor: Colors.button.primary,
  },

  toggleText: {
    fontWeight: 'bold',
    color: Colors.text.caption,
  },

  activeText: {
    color: Colors.text.primary,
  },

  dropdown: {
    backgroundColor: Colors.input.background,
    padding: 15,
    borderRadius: 30,
    marginBottom: 20,
  },

  dropdownText: {
    color: Colors.text.placeholder,
  },

  button: {
    backgroundColor: Colors.button.primary,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: Colors.button.disabled,
  },
  dropdownContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    paddingBottom: 8,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 30,
    backgroundColor: Colors.input.background,
  },
});
