import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// ─── Types ────────────────────────────────────────────────────────────────────

// type ViewMode = 'Jour' | 'Semaine' | 'Mois';

interface TimeSlot {
  time: string;
  label: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const COLORS = {
  yellow: '#F5C400',
  navy: '#1E2C6A',
  darkText: '#2B2200',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  border: '#E0E0E0',
  booked: '#1E2C6A',
  muted: '#8A8A8A',
};

// const DAYS_SHORT = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
const DAYS_FULL = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const MONTHS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

function generateTimeSlots(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let h = 6; h <= 20; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === 20 && m > 0) {
        break;
      }
      const hh = h;
      const mm = m.toString().padStart(2, '0');
      const display = `${hh.toString().padStart(2, '0')}:${mm}`;
      slots.push({ time: `${hh}:${mm}`, label: display });
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

// Booked slots: "HH:MM_dayIndex" (dayIndex 0–6 for week view)
const DEFAULT_BOOKED = new Set([
  '8:00_1', '9:30_1', '10:00_1',
  '13:00_3', '14:30_3',
  '9:00_2', '11:00_5',
]);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
/*
function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day; // start on Monday
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}
  */

// ─── Sub-components ───────────────────────────────────────────────────────────

interface LegendDotProps {
  booked?: boolean;
}

const LegendDot: React.FC<LegendDotProps> = ({ booked }) => (
  <View
    style={[
      styles.legendDot,
      booked ? styles.legendDotBooked : styles.legendDotAvailable,
    ]}
  />
);


// ─── Day View ─────────────────────────────────────────────────────────────────

interface DayViewProps {
  selectedSlots: Set<string>;
  onToggleSlot: (key: string) => void;
}

const DayView: React.FC<DayViewProps> = ({ selectedSlots, onToggleSlot }) => (
  <ScrollView style={styles.dayContainer} showsVerticalScrollIndicator={false}>
    {TIME_SLOTS.map((slot) => {
      const key = `${slot.time}_day`;
      const isBooked = DEFAULT_BOOKED.has(`${slot.time}_1`);
      const isSelected = selectedSlots.has(key);

      return (
        <TouchableOpacity
          key={key}
          style={[
            styles.daySlot,
            isSelected && styles.daySlotSelected,
          ]}
          onPress={() => !isBooked && onToggleSlot(key)}
          disabled={isBooked}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.slotDot,
              isBooked
                ? styles.slotDotBooked
                : isSelected
                  ? styles.slotDotSelected
                  : styles.slotDotAvailable,
            ]}
          />
          <Text style={styles.daySlotTime}>{slot.label}</Text>
          <Text style={styles.daySlotStatus}>
            {isBooked ? 'Complet' : isSelected ? 'Sélectionné' : 'Disponible'}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);
/*
// ─── Week View ────────────────────────────────────────────────────────────────

interface WeekViewProps {
  currentDate: Date;
  selectedSlots: Set<string>;
  onToggleSlot: (key: string) => void;
}

const WeekView: React.FC<WeekViewProps> = ({ currentDate, selectedSlots, onToggleSlot }) => {
  const weekStart = getWeekStart(currentDate);
  const today = new Date();

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return d;
  });

  // Only show hours (not :15, :30, :45) as row labels
  const hourSlots = TIME_SLOTS.filter((s) => s.time.endsWith(':00'));

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View>
        {/* Header row *//*}
        <View style={styles.weekHeaderRow}>
          <View style={styles.weekTimeCell} />
          {weekDays.map((d, i) => {
            const isToday = isSameDay(d, today);
            return (
              <View key={i} style={styles.weekDayHeader}>
                <Text style={[styles.weekDayLabel, isToday && styles.weekDayLabelToday]}>
                  {DAYS_SHORT[i]} {d.getDate()}/{d.getMonth() + 1}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Slots *//*}
        <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
          {TIME_SLOTS.map((slot, ri) => {
            const showLabel = slot.time.endsWith(':00');
            return (
              <View key={ri} style={styles.weekRow}>
                <View style={styles.weekTimeCell}>
                  {showLabel && (
                    <Text style={styles.weekTimeLabel}>{slot.label}</Text>
                  )}
                </View>
                {weekDays.map((_, di) => {
                  const key = `${slot.time}_${di}`;
                  const isBooked = DEFAULT_BOOKED.has(key);
                  const isSelected = selectedSlots.has(key);
                  return (
                    <TouchableOpacity
                      key={di}
                      style={styles.weekSlotCell}
                      onPress={() => !isBooked && onToggleSlot(key)}
                      disabled={isBooked}
                      activeOpacity={0.7}
                    >
                      <View
                        style={[
                          styles.weekSlot,
                          isBooked && styles.weekSlotBooked,
                          isSelected && styles.weekSlotSelected,
                        ]}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

// ─── Month View ───────────────────────────────────────────────────────────────

interface MonthViewProps {
  currentDate: Date;
  selectedSlots: Set<string>;
  onToggleSlot: (key: string) => void;
}

const MonthView: React.FC<MonthViewProps> = ({ currentDate, selectedSlots, onToggleSlot }) => {
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  // Convert Sunday=0 to Monday-first: Mon=0 … Sun=6
  const startOffset = (firstDayOfWeek + 6) % 7;

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return (
    <View>
      {/* Day headers *//*}
      <View style={styles.monthHeaderRow}>
        {['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'].map((d) => (
          <Text key={d} style={styles.monthHeaderCell}>{d}</Text>
        ))}
      </View>
      {weeks.map((week, wi) => (
        <View key={wi} style={styles.monthWeekRow}>
          {week.map((day, di) => {
            if (!day) {
              return <View key={di} style={styles.monthDayCell} />;
            }
            const isToday = (
              today.getFullYear() === year &&
              today.getMonth() === month &&
              today.getDate() === day
            );
            const key = `month_${year}_${month}_${day}`;
            const isSelected = selectedSlots.has(key);
            return (
              <TouchableOpacity
                key={di}
                style={styles.monthDayCell}
                onPress={() => onToggleSlot(key)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.monthDayCircle,
                    isToday && styles.monthDayToday,
                    isSelected && !isToday && styles.monthDaySelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.monthDayText,
                      isToday && styles.monthDayTextToday,
                      isSelected && !isToday && styles.monthDayTextSelected,
                    ]}
                  >
                    {day}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
};
*/

// ─── Main Component ───────────────────────────────────────────────────────────

const BookingCalendar: React.FC = () => {
  const navigation = useNavigation<any>();
  //const [viewMode, setViewMode] = useState<ViewMode>('Jour');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedSlots, setSelectedSlots] = useState<Set<string>>(new Set());

  const today = new Date();
  const isToday = isSameDay(currentDate, today);

  const dayLabel = isToday
    ? "Aujourd'hui"
    : `${DAYS_FULL[currentDate.getDay()]} ${currentDate.getDate()}`;

  const monthLabel = `${MONTHS[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  const prevDay = () => {
    if(isToday) {   return; } // prevent going to past days
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    setCurrentDate(d);
  };
  const nextDay = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    setCurrentDate(d);
  };
  const prevMonth = () => {
    const d = new Date(currentDate);
    if (d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()) { return; } // prevent going to past months
    d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
  };
  const nextMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
  };

  const toggleSlot = useCallback((key: string) => {
    setSelectedSlots((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {next.delete(key);}
      else {next.add(key);}
      return next;
    });
  }, []);

  const handleBook = () => {
    if (selectedSlots.size === 0) {
      Alert.alert('Aucun créneau sélectionné', 'Veuillez sélectionner au moins un créneau avant de réserver.');
    } else {
      Alert.alert(
        'Confirmer la réservation',
        `Vous avez sélectionné ${selectedSlots.size} créneau(s). Continuer la réservation avec Jay ?`,
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Confirmer', onPress: () => Alert.alert('Réservé !', 'Votre leçon a été réservée.') },
        ],
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.backRow}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text style={styles.backBtnText}>← Retour</Text>
          </TouchableOpacity>
        </View>
        {/* Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>
            Pour commencer le processus de réservation, veuillez sélectionner "Réserver avec Jay"
          </Text>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <LegendDot />
              <Text style={styles.legendText}>Disponible</Text>
            </View>
            <View style={styles.legendItem}>
              <LegendDot booked />
              <Text style={styles.legendText}>Complet</Text>
            </View>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Day navigation */}
          <View style={styles.navRow}>
            <TouchableOpacity onPress={prevDay} style={styles.navBtn} activeOpacity={0.7}>
              <Text style={styles.navArrow}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.navLabel}>{dayLabel}</Text>
            <TouchableOpacity onPress={nextDay} style={styles.navBtn} activeOpacity={0.7}>
              <Text style={styles.navArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* Month navigation */}
          <View style={styles.navRow}>
            <TouchableOpacity onPress={prevMonth} style={styles.navBtn} activeOpacity={0.7}>
              <Text style={styles.navArrow}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.navLabel}>{monthLabel}</Text>
            <TouchableOpacity onPress={nextMonth} style={styles.navBtn} activeOpacity={0.7}>
              <Text style={styles.navArrow}>›</Text>
            </TouchableOpacity>
          </View>

          {/* View toggle */}
          {/*
          <View style={styles.viewToggle}>
            {(['Jour', 'Semaine', 'Mois'] as ViewMode[]).map((mode) => (
              <TouchableOpacity
                key={mode}
                style={[styles.viewBtn, viewMode === mode && styles.viewBtnActive]}
                onPress={() => setViewMode(mode)}
                activeOpacity={0.8}
              >
                <Text style={[styles.viewBtnText, viewMode === mode && styles.viewBtnTextActive]}>
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          */}

          {/* Calendar content */}
          <View style={styles.calContent}>
            <DayView selectedSlots={selectedSlots} onToggleSlot={toggleSlot} />
          </View>

          {/* Info */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>Durée de la leçon de conduite = 1 heure ou 2 heures</Text>
            <Text style={styles.infoText}>Durée du forfait test de conduite = 2,5 heures</Text>
            <Text style={styles.infoText}>Les heures de début sont par tranches de 15 minutes</Text>
          </View>

          {/* Book button */}
          <TouchableOpacity style={styles.bookBtn} onPress={handleBook} activeOpacity={0.85}>
            <Text style={styles.bookBtnText}>RÉSERVER AVEC JAY</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  // Banner
  banner: {
    backgroundColor: COLORS.yellow,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  bannerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkText,
    marginBottom: 10,
  },
  legend: {
    flexDirection: 'row',
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendDotBooked: {
    backgroundColor: COLORS.darkText,
  },
  legendDotAvailable: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: '#aaa',
  },
  legendText: {
    fontSize: 12,
    color: COLORS.darkText,
  },

  // Body
  body: {
    backgroundColor: COLORS.white,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 16,
  },

  // Nav rows
  backRow: {
    marginBottom: 12,
  },
  backBtn: {
    marginBottom: 12,
  },
  backBtnText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.navy,
  },
  navRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 4,
  },
  navBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  navArrow: {
    fontSize: 22,
    color: COLORS.navy,
    lineHeight: 26,
  },
  navLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.navy,
    minWidth: 140,
    textAlign: 'center',
  },

  // View toggle
  viewToggle: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: '#E0C94A',
    borderRadius: 999,
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 12,
  },
  viewBtn: {
    paddingHorizontal: 20,
    paddingVertical: 7,
    backgroundColor: 'transparent',
  },
  viewBtnActive: {
    backgroundColor: COLORS.yellow,
  },
  viewBtnText: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.navy,
  },
  viewBtnTextActive: {
    color: COLORS.darkText,
  },

  calContent: {
    marginBottom: 12,
  },

  // Day view
  dayContainer: {
    maxHeight: 380,
  },
  daySlot: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 6,
    marginBottom: 3,
    borderWidth: 0.5,
    borderColor: '#E0E0E0',
    gap: 8,
  },
  daySlotSelected: {
    backgroundColor: 'rgba(245,196,0,0.15)',
    borderColor: COLORS.yellow,
  },
  slotDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  slotDotBooked: {
    backgroundColor: COLORS.navy,
  },
  slotDotSelected: {
    backgroundColor: COLORS.yellow,
  },
  slotDotAvailable: {
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: '#aaa',
  },
  daySlotTime: {
    width: 58,
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.navy,
  },
  daySlotStatus: {
    fontSize: 11,
    color: COLORS.muted,
  },

  // Week view
  weekHeaderRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#E0E0E0',
    marginBottom: 2,
  },
  weekTimeCell: {
    width: 44,
    paddingRight: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  weekTimeLabel: {
    fontSize: 10,
    color: COLORS.navy,
    lineHeight: 14,
  },
  weekDayHeader: {
    width: 60,
    alignItems: 'center',
    paddingBottom: 6,
  },
  weekDayLabel: {
    fontSize: 11,
    color: COLORS.navy,
    fontWeight: '500',
    textAlign: 'center',
  },
  weekDayLabelToday: {
    color: COLORS.yellow,
  },
  weekRow: {
    flexDirection: 'row',
    height: 14,
  },
  weekSlotCell: {
    width: 60,
    paddingHorizontal: 2,
  },
  weekSlot: {
    flex: 1,
    borderRadius: 2,
  },
  weekSlotBooked: {
    backgroundColor: COLORS.navy,
  },
  weekSlotSelected: {
    backgroundColor: COLORS.yellow,
  },

  // Month view
  monthHeaderRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  monthHeaderCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.navy,
    paddingVertical: 4,
  },
  monthWeekRow: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  monthDayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 2,
  },
  monthDayCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthDayToday: {
    backgroundColor: COLORS.yellow,
  },
  monthDaySelected: {
    backgroundColor: COLORS.navy,
  },
  monthDayText: {
    fontSize: 12,
    color: '#333',
  },
  monthDayTextToday: {
    color: COLORS.darkText,
    fontWeight: '600',
  },
  monthDayTextSelected: {
    color: COLORS.white,
  },

  // Info
  infoBox: {
    marginTop: 8,
    marginBottom: 4,
    gap: 2,
  },
  infoText: {
    fontSize: 12,
    color: '#555',
    lineHeight: 20,
  },

  // Book button
  bookBtn: {
    marginTop: 14,
    backgroundColor: COLORS.yellow,
    borderRadius: 999,
    paddingVertical: 15,
    alignItems: 'center',
  },
  bookBtnText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.darkText,
    letterSpacing: 0.8,
  },
});

export default BookingCalendar;
