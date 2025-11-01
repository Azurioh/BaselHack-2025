import { View, StyleSheet, Pressable, ScrollView, useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';

interface QuestionCardProps {
  category: string;
  author: string;
  title: string;
  description: string;
  responseCount: number;
  audience: string;
  createdDate: string;
  onRespond: () => void;
  onViewAnalysis: () => void;
}

export function QuestionCard({
  category,
  author,
  title,
  description,
  responseCount,
  audience,
  createdDate,
  onRespond,
  onViewAnalysis,
}: QuestionCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={styles.container}>
      {/* Header with Badge and Author */}
      <View style={styles.header}>
        <View style={styles.badgeContainer}>
          <View style={[styles.badge, { backgroundColor: colors.accentLight }]}>
            <ThemedText style={{ fontSize: 12, fontWeight: '600', color: colors.accent }}>{category}</ThemedText>
          </View>
          <ThemedText style={{ fontSize: 11, color: colors.textSecondary, fontStyle: 'italic' }}>by {author}</ThemedText>
        </View>
      </View>

      {/* Title */}
      <ThemedText style={styles.title} numberOfLines={3}>
        {title}
      </ThemedText>

      {/* Description */}
      <ThemedText style={styles.description} numberOfLines={3}>
        {description}
      </ThemedText>

      {/* Read More Link */}
      <Pressable style={styles.readMoreButton}>
        <ThemedText style={{ fontSize: 12, fontWeight: '600', color: colors.accent }}>Read more</ThemedText>
        <MaterialIcons name="arrow-forward" size={14} color={colors.accent} />
      </Pressable>

      {/* Metadata */}
      <View style={[styles.metadata, { borderTopColor: colors.border, borderBottomColor: colors.border }]}>
        <View style={styles.metadataItem}>
          <MaterialIcons name="chat-bubble-outline" size={16} color={colors.textSecondary} />
          <ThemedText style={styles.metadataText}>{responseCount} Responses</ThemedText>
        </View>

        <View style={styles.metadataItem}>
          <MaterialIcons name="people" size={16} color={colors.textSecondary} />
          <ThemedText style={styles.metadataText}>{audience}</ThemedText>
        </View>

        <View style={styles.metadataItem}>
          <MaterialIcons name="calendar-today" size={16} color={colors.textSecondary} />
          <ThemedText style={styles.metadataText}>{createdDate}</ThemedText>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.primaryButton,
            { backgroundColor: colors.accent },
            pressed && styles.primaryButtonPressed,
          ]}
          onPress={onRespond}
        >
          <MaterialIcons name="edit" size={12} color="#FFFFFF" />
          <ThemedText style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '600' }}>Respond</ThemedText>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.secondaryButton,
            { backgroundColor: colors.accentLight, borderColor: colors.accent },
            pressed && styles.secondaryButtonPressed,
          ]}
          onPress={onViewAnalysis}
        >
          <MaterialIcons name="analytics" size={12} color={colors.accent} />
          <ThemedText style={{ color: colors.accent, fontSize: 11, fontWeight: '600' }}>Analysis</ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  header: {
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 22,
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 10,
  },
  readMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  metadata: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metadataText: {
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    minHeight: 32,
    maxHeight: 32,
  },
  primaryButtonPressed: {
    opacity: 0.8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    minHeight: 32,
    maxHeight: 32,
  },
  secondaryButtonPressed: {
    opacity: 0.7,
  },
});
