import { ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { QuestionCard } from '@/components/question-card';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';

interface Question {
  id: string;
  category: string;
  author: string;
  title: string;
  description: string;
  responseCount: number;
  audience: string;
  createdDate: string;
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    category: 'Technology',
    author: 'Alan Cunin',
    title: 'What are the most important features for a consensus-building platform?',
    description: 'We are developing a platform that helps teams reach consensus on complex decisions. What features would be most valuable?',
    responseCount: 24,
    audience: '1.2K participants',
    createdDate: 'Nov 1, 2025',
  },
  {
    id: '2',
    category: 'AI & ML',
    author: 'Gabriel Leveque',
    title: 'How should AI analyze diverse opinions ethically?',
    description: 'When using AI to process conflicting viewpoints, what ethical guidelines should we follow to ensure fair representation?',
    responseCount: 18,
    audience: '890 participants',
    createdDate: 'Oct 31, 2025',
  },
  {
    id: '3',
    category: 'User Experience',
    author: 'Lucas Andres',
    title: 'What makes consensus interfaces intuitive?',
    description: 'Designing UI for consensus building requires balancing complexity with usability. What design patterns work best?',
    responseCount: 32,
    audience: '1.5K participants',
    createdDate: 'Oct 30, 2025',
  },
  {
    id: '4',
    category: 'Business',
    author: 'Aymeric Bretin',
    title: 'How can organizations implement consensus-based decision making?',
    description: 'Moving from traditional hierarchical decision making to consensus-driven approaches. What are the challenges and solutions?',
    responseCount: 15,
    audience: '650 participants',
    createdDate: 'Oct 29, 2025',
  },
  {
    id: '5',
    category: 'Data Science',
    author: 'Ewan Schaffhauser',
    title: 'What metrics should measure consensus quality?',
    description: 'How do we quantify whether a consensus accurately represents the input from all participants?',
    responseCount: 21,
    audience: '950 participants',
    createdDate: 'Oct 28, 2025',
  },
  {
    id: '6',
    category: 'General',
    author: 'Thomas Furstenberger',
    title: 'How can we make consensus accessible to non-technical users?',
    description: 'Ensuring that the consensus platform is easy to use for people without technical backgrounds is critical.',
    responseCount: 28,
    audience: '1.1K participants',
    createdDate: 'Oct 27, 2025',
  },
];

export default function QuestionsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleRespond = (questionId: string) => {
    router.push({
      pathname: '/createQuestion',
      params: { questionId },
    });
  };

  const handleViewAnalysis = (questionId: string) => {
    // Navigate to analysis page (to be implemented)
    console.log('View analysis for question:', questionId);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemedView style={[styles.header, { backgroundColor: colors.accentLight }]}>
        <ThemedText style={[styles.title, { color: colors.accent }]}>Community Questions</ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          Explore diverse perspectives and help build consensus through collective intelligence
        </ThemedText>
      </ThemedView>

      <View style={styles.questionsContainer}>
        {sampleQuestions.map((question) => (
          <QuestionCard
            key={question.id}
            category={question.category}
            author={question.author}
            title={question.title}
            description={question.description}
            responseCount={question.responseCount}
            audience={question.audience}
            createdDate={question.createdDate}
            onRespond={() => handleRespond(question.id)}
            onViewAnalysis={() => handleViewAnalysis(question.id)}
          />
        ))}
      </View>

      <ThemedView style={[styles.emptyStateHelper, { backgroundColor: colors.accentLight, borderLeftColor: colors.accent }]}>
        <ThemedText style={[styles.emptyStateText, { color: colors.textSecondary }]}>
          Questions from the community help drive consensus. Respond with your perspective!
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  questionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  emptyStateHelper: {
    marginHorizontal: 16,
    marginVertical: 24,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
  },
  emptyStateText: {
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
