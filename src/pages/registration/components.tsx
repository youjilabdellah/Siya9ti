import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import { styles } from './styles';

// ─── Types ───────────────────────────────────────────────────────────────────

export type RegistrationFor = 'myself' | 'someone_else';

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
}

// ─── Step Indicator ──────────────────────────────────────────────────────────

const steps = ['CHOISIR', 'RÉSERVER', 'VOS DÉTAILS', 'PAIEMENT'];

export const StepIndicator: React.FC = () => (
  <View style={styles.stepContainer}>
    {steps.map((label, i) => {
      const done = i < 2;
      const active = i === 2;
      return (
        <View key={label} style={styles.stepItem}>
          {i > 0 && (
            <View style={[styles.stepLine, (done || active) && styles.stepLineDone]} />
          )}
          <View
            style={[
              styles.stepCircle,
              done && styles.stepCircleDone,
              active && styles.stepCircleActive,
            ]}
          >
            {done ? (
              <Text style={styles.stepCheckmark}>✓</Text>
            ) : active ? (
              <View style={styles.stepAvatar}>
                <Text style={styles.stepAvatarText}>JS</Text>
              </View>
            ) : (
              <View style={styles.stepDot} />
            )}
          </View>
          <Text style={[styles.stepLabel, (done || active) && styles.stepLabelActive]}>
            {i + 1 <= 2 ? '' : `ÉTAPE ${i + 1}`}
          </Text>
          <Text style={[styles.stepName, active && styles.stepNameActive]}>{label}</Text>
        </View>
      );
    })}
  </View>
);

// ─── Floating Label Input ─────────────────────────────────────────────────────

interface FloatingInputProps {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  onBlur?: (e: any) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
  required?: boolean;
}

export const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  secureTextEntry,
  keyboardType = 'default',
  required,
}) => {
  const [focused, setFocused] = useState(false);
  const raised = focused || value.length > 0;

  return (
    <View style={[styles.inputWrapper, focused && styles.inputWrapperFocused]}>
      <Text style={[styles.floatLabel, raised && styles.floatLabelRaised]}>
        {label}
        {required && <Text style={styles.asterisk}> *</Text>}
      </Text>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize="none"
        placeholderTextColor="transparent"
      />
    </View>
  );
};

// ─── Fake Select ──────────────────────────────────────────────────────────────

interface FakeSelectProps {
  label: string;
  value: string;
  required?: boolean;
}

export const FakeSelect: React.FC<FakeSelectProps> = ({ label, value, required }) => (
  <View style={styles.inputWrapper}>
    <Text style={[styles.floatLabel, value.length > 0 && styles.floatLabelRaised]}>
      {label}
      {required && <Text style={styles.asterisk}> *</Text>}
    </Text>
    <View style={styles.selectRow}>
      <Text style={styles.selectValue}>{value || ''}</Text>
      <Text style={styles.chevron}>›</Text>
    </View>
  </View>
);

// ─── DOB Row ──────────────────────────────────────────────────────────────────

interface DOBRowProps {
  day: string; month: string; year: string;
  onDay: (v: string) => void;
  onMonth: (v: string) => void;
  onYear: (v: string) => void;
}

export const DOBRow: React.FC<DOBRowProps> = ({ day, month, year, onDay, onMonth, onYear }) => (
  <View style={styles.dobContainer}>
    <Text style={styles.dobLabel}>Date de naissance <Text style={styles.asterisk}>*</Text></Text>
    <View style={styles.dobRow}>
      {[
        { placeholder: 'JJ', val: day, fn: onDay, max: 2 },
        { placeholder: 'MM', val: month, fn: onMonth, max: 2 },
        { placeholder: 'AAAA', val: year, fn: onYear, max: 4 },
      ].map((f, i) => (
        <React.Fragment key={f.placeholder}>
          <TextInput
            style={styles.dobInput}
            placeholder={f.placeholder}
            placeholderTextColor="#bbb"
            value={f.val}
            onChangeText={f.fn}
            keyboardType="numeric"
            maxLength={f.max}
          />
          {i < 2 && <Text style={styles.dobSep}>–</Text>}
        </React.Fragment>
      ))}
    </View>
  </View>
);

// ─── Section Header ───────────────────────────────────────────────────────────

export const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionAccent} />
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);