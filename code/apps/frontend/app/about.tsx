import { ScrollView, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

interface TeamMember {
  name: string;
  email: string;
}

const teamMembers: TeamMember[] = [
  { name: 'Alan Cunin', email: 'alan.cunin@epitech.eu' },
  { name: 'Gabriel Leveque', email: 'gabriel.leveque@epitech.eu' },
  { name: 'Lucas Andres', email: 'lucas.andres@epitech.eu' },
  { name: 'Aymeric Bretin', email: 'aymeric.bretin@epitech.eu' },
  { name: 'Ewan Schaffhauser', email: 'ewan.schaffhauser@epitech.eu' },
  { name: 'Thomas Furstenberger', email: 'thomas.furstenberger@epitech.eu' },
];

const COLORS = {
  background: '#FFFFFF',
  text: '#333333',
  textSecondary: '#888888',
  accent: '#3B82F6',
  accentLight: '#EFF6FF',
  border: '#E5E5E5',
};

export default function AboutScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <ThemedView style={styles.heroSection}>
        <View style={styles.heroIcon}>
          <MaterialIcons name="lightbulb" size={48} color={COLORS.accent} />
        </View>
        <ThemedText style={styles.heroTitle}>BaselHack 2025</ThemedText>
        <ThemedText style={styles.heroSubtitle}>Consensus.AI - Building the Future Together</ThemedText>
      </ThemedView>

      <ThemedView style={styles.content}>
        {/* Team Card */}
        <ThemedView style={styles.highlightCard}>
          <View style={styles.highlightHeader}>
            <MaterialIcons name="group" size={24} color={COLORS.accent} />
            <ThemedText style={styles.highlightTitle}>Our Team</ThemedText>
          </View>
          <ThemedText style={styles.highlightText}>
            6 French engineering students from Epitech, united by passion for innovation and problem-solving at BaselHack 2025.
          </ThemedText>
        </ThemedView>

        {/* Challenge Spotlight */}
        <ThemedView style={[styles.highlightCard, styles.challengeCard]}>
          <View style={styles.highlightHeader}>
            <MaterialIcons name="trending-up" size={24} color={COLORS.accent} />
            <ThemedText style={styles.highlightTitle}>Our Challenge</ThemedText>
          </View>
          <ThemedText style={styles.challengeName}>
            Collective Intelligence - Building Consensus Through AI
          </ThemedText>
          <ThemedText style={styles.highlightText}>
            Create an innovative platform that gathers diverse opinions and leverages AI to extract meaningful consensus, enabling smarter and more inclusive decisions.
          </ThemedText>
        </ThemedView>

        {/* Objectives */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="checklist" size={24} color={COLORS.accent} />
            <ThemedText style={styles.sectionTitle}>Challenge Objectives</ThemedText>
          </View>

          <View style={styles.objectivesList}>
            {[
              { icon: 'comment', title: 'Collect Opinions', desc: 'Gather diverse perspectives and arguments from participants' },
              { icon: 'analytics', title: 'Analyze Data', desc: 'Identify common themes, divergences and patterns' },
              { icon: 'summarize', title: 'Generate Consensus', desc: 'Produce balanced summaries reflecting collective wisdom' },
            ].map((obj, idx) => (
              <ThemedView key={idx} style={styles.objectiveCard}>
                <View style={styles.objectiveIcon}>
                  <MaterialIcons name={obj.icon as any} size={20} color={COLORS.accent} />
                </View>
                <View style={styles.objectiveContent}>
                  <ThemedText style={styles.objectiveTitle}>{obj.title}</ThemedText>
                  <ThemedText style={styles.objectiveDesc}>{obj.desc}</ThemedText>
                </View>
              </ThemedView>
            ))}
          </View>
        </ThemedView>

        {/* Team Members Grid */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="people" size={24} color={COLORS.accent} />
            <ThemedText style={styles.sectionTitle}>Team Members</ThemedText>
          </View>

          <View style={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <ThemedView key={index} style={styles.modernTeamCard}>
                <View style={styles.avatarCircle}>
                  <MaterialIcons name="person" size={24} color={COLORS.accent} />
                </View>
                <ThemedText style={styles.memberName}>{member.name}</ThemedText>
                <ThemedText style={styles.memberEmail}>{member.email}</ThemedText>
              </ThemedView>
            ))}
          </View>
        </ThemedView>

        {/* Values */}
        <ThemedView style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="favorite" size={24} color={COLORS.accent} />
            <ThemedText style={styles.sectionTitle}>Our Values</ThemedText>
          </View>

          <View style={styles.valuesGrid}>
            {[
              { icon: 'flash-on', title: 'Innovation', desc: 'Creative solutions' },
              { icon: 'handshake', title: 'Collaboration', desc: 'Team synergy' },
              { icon: 'star', title: 'Excellence', desc: 'Technical perfection' },
              { icon: 'school', title: 'Learning', desc: 'Continuous growth' },
            ].map((val, idx) => (
              <ThemedView key={idx} style={styles.valueCard}>
                <View style={styles.valueIconContainer}>
                  <MaterialIcons name={val.icon as any} size={24} color={COLORS.accent} />
                </View>
                <ThemedText style={styles.valueTitle}>{val.title}</ThemedText>
                <ThemedText style={styles.valueDesc}>{val.desc}</ThemedText>
              </ThemedView>
            ))}
          </View>
        </ThemedView>

        {/* Sponsor */}
        <ThemedView style={styles.sponsorCard}>
          <ThemedText style={styles.sponsorLabel}>Proud Sponsor</ThemedText>
          <ThemedText style={styles.sponsorName}>Endress+Hauser</ThemedText>
          <ThemedText style={styles.sponsorDesc}>
            Global leader in measurement instrumentation driving innovation through digital transformation and collective intelligence.
          </ThemedText>
        </ThemedView>

        {/* Contact CTA */}
        <ThemedView style={styles.ctaSection}>
          <MaterialIcons name="mail" size={32} color={COLORS.accent} />
          <ThemedText style={styles.ctaTitle}>Get In Touch</ThemedText>
          <ThemedText style={styles.ctaText}>
            Questions? Ideas? We're always open to collaboration.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  heroSection: {
    backgroundColor: COLORS.accentLight,
    paddingVertical: 48,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heroIcon: {
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.accent,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  highlightCard: {
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    borderWidth: 1,
    borderTopColor: COLORS.border,
    borderRightColor: COLORS.border,
    borderBottomColor: COLORS.border,
  },
  challengeCard: {
    backgroundColor: COLORS.accentLight,
  },
  highlightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  highlightTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.accent,
  },
  highlightText: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textSecondary,
  },
  challengeName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 10,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.accent,
  },
  objectivesList: {
    gap: 12,
  },
  objectiveCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.accentLight,
    borderRadius: 10,
    padding: 14,
    gap: 12,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  objectiveIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  objectiveContent: {
    flex: 1,
  },
  objectiveTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  objectiveDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  modernTeamCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: COLORS.accentLight,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  memberName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  memberEmail: {
    fontSize: 11,
    color: COLORS.accent,
    textAlign: 'center',
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  valueCard: {
    flex: 1,
    minWidth: '48%',
    backgroundColor: COLORS.accentLight,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  valueIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  valueTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  valueDesc: {
    fontSize: 12,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  sponsorCard: {
    backgroundColor: COLORS.accentLight,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.accent,
    marginBottom: 24,
  },
  sponsorLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.accent,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sponsorName: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 10,
  },
  sponsorDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  ctaSection: {
    backgroundColor: COLORS.accentLight,
    borderRadius: 12,
    padding: 28,
    alignItems: 'center',
    marginBottom: 40,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.accent,
    marginTop: 12,
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
