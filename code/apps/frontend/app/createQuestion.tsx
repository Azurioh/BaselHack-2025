import { useState } from 'react';
import { ScrollView, StyleSheet, View, useWindowDimensions, useColorScheme } from 'react-native';
import { Button, Card, Divider, Menu, Switch, Text, TextInput } from 'react-native-paper';
import { Colors } from '@/constants/theme';

export default function CreateQuestionScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const [questionTitle, setQuestionTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [endDate, setEndDate] = useState('');

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const getStyles = () => ({
    scrollView: {
      flex: 1,
      backgroundColor: colors.card,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: isMobile ? 10 : 20,
      backgroundColor: colors.card,
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: isMobile ? 10 : 20,
      backgroundColor: colors.card,
    },
    headerContainer: {
      width: '100%',
      maxWidth: isMobile ? '100%' : 1200,
      marginBottom: isMobile ? 16 : 24,
      alignItems: 'flex-start',
    },
    title: {
      fontWeight: 'bold',
      marginBottom: isMobile ? 8 : 12,
      textAlign: 'left',
      fontSize: isMobile ? 28 : 48,
      color: colors.accent,
    },
    subtitle: {
      opacity: 0.7,
      textAlign: 'left',
      fontSize: isMobile ? 16 : 24,
      color: colors.textSecondary,
    },
    card: {
      width: '100%',
      maxWidth: isMobile ? '100%' : 1200,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      padding: isMobile ? 16 : 24,
    },
    cardTitle: {
      fontWeight: 'bold',
      marginBottom: isMobile ? 16 : 24,
      textAlign: 'left',
      fontSize: isMobile ? 22 : 32,
      color: colors.text,
    },
    fieldLabel: {
      fontWeight: '600',
      marginBottom: isMobile ? 6 : 8,
      textAlign: 'left',
      fontSize: isMobile ? 18 : 24,
      color: colors.text,
    },
    textInput: {
      marginBottom: isMobile ? 6 : 8,
      fontSize: isMobile ? 16 : 20,
    },
    fieldSubtitle: {
      opacity: 0.6,
      textAlign: 'left',
      marginBottom: isMobile ? 16 : 26,
      fontSize: isMobile ? 14 : 18,
      color: colors.textSecondary,
    },
    menuButton: {
      marginBottom: isMobile ? 6 : 8,
      justifyContent: 'flex-start',
      borderRadius: 4,
      minHeight: isMobile ? 40 : 50,
    },
    menuButtonContent: {
      justifyContent: 'flex-start',
    },
    menuButtonLabel: {
      fontSize: isMobile ? 16 : 20,
      color: colors.text,
    },
    divider: {
      marginTop: isMobile ? 6 : 8,
      backgroundColor: colors.border,
      marginBottom: isMobile ? 16 : 26,
    },
    cardAnon: {
      width: '100%',
      maxWidth: isMobile ? '100%' : 1200,
      backgroundColor: colors.accentLight,
      borderWidth: 1,
      borderColor: colors.accent,
      minHeight: isMobile ? 60 : 70,
      marginBottom: isMobile ? 16 : 24,
    },
    cardAnonContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardAnonLeft: {
      flex: 1,
    },
    cardAnonTitle: {
      fontSize: isMobile ? 16 : 20,
      fontWeight: '600',
      marginBottom: 4,
      color: colors.text,
    },
    cardAnonSubtitle: {
      fontSize: isMobile ? 13 : 16,
      opacity: 0.7,
      color: colors.textSecondary,
    },
    switch: {
      transform: isMobile ? [{ scaleX: 1.2 }, { scaleY: 1.2 }] : [{ scaleX: 1.5 }, { scaleY: 1.5 }],
      marginRight: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: isMobile ? 16 : 24,
    },
    createButton: {
      borderRadius: 6,
    },
    createButtonLabel: {
      fontSize: isMobile ? 12 : 14,
      fontWeight: '600',
    },
  });

  return (
    <ScrollView style={getStyles().scrollView} contentContainerStyle={getStyles().contentContainer}>
      <View style={getStyles().headerContainer}>
        <Text variant="headlineLarge" style={getStyles().title}>
          Create a Question
        </Text>
        <Text variant="bodyLarge" style={getStyles().subtitle}>
          Create question and start gathering opinions
        </Text>
      </View>

      <Card style={getStyles().card}>
        <Card.Content>
          <Text variant="titleLarge" style={getStyles().cardTitle}>
            Basic Information
          </Text>

          <Text variant="titleMedium" style={getStyles().fieldLabel}>
            Question Title
          </Text>

          <TextInput
            mode="outlined"
            value={questionTitle}
            onChangeText={setQuestionTitle}
            placeholder="What should we prioritize in Q1 2025?"
            style={getStyles().textInput}
          />

          <Text variant="bodySmall" style={getStyles().fieldSubtitle}>
            A clear, concise question that participants will respond to
          </Text>

          <Text variant="titleMedium" style={getStyles().fieldLabel}>
            Description
          </Text>

          <TextInput
            mode="outlined"
            value={description}
            onChangeText={setDescription}
            placeholder="Provide context and any additional information that will help participants give thoughtful responses..."
            style={getStyles().textInput}
            multiline={true}
            numberOfLines={4}
          />

          <Text variant="bodySmall" style={getStyles().fieldSubtitle}>
            Add context, background, or specific areas you want participants to consider
          </Text>

          <Text variant="titleMedium" style={getStyles().fieldLabel}>
            Category
          </Text>

          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <Button
                mode="outlined"
                onPress={openMenu}
                style={getStyles().menuButton}
                contentStyle={getStyles().menuButtonContent}
                labelStyle={getStyles().menuButtonLabel}
                textColor="rgba(255, 255, 255, 0.7)"
              >
                {category || 'Select a category'}
              </Button>
            }
          >
            <Menu.Item onPress={() => { setCategory('Technology'); closeMenu(); }} title="Technology" />
            <Menu.Item onPress={() => { setCategory('Business'); closeMenu(); }} title="Business" />
            <Menu.Item onPress={() => { setCategory('Marketing'); closeMenu(); }} title="Marketing" />
            <Menu.Item onPress={() => { setCategory('Product'); closeMenu(); }} title="Product" />
            <Menu.Item onPress={() => { setCategory('Other'); closeMenu(); }} title="Other" />
          </Menu>

          <Text variant="bodySmall" style={getStyles().fieldSubtitle}>
            Helps organize and filter questions
          </Text>

          <Divider style={getStyles().divider} />

          <Text variant="titleLarge" style={getStyles().cardTitle}>
            Settings
          </Text>

          <Card style={getStyles().cardAnon}>
            <Card.Content style={getStyles().cardAnonContent}>
              <View style={getStyles().cardAnonLeft}>
                <Text variant="titleMedium" style={getStyles().cardAnonTitle}>
                  Anonymous Responses
                </Text>
                <Text variant="bodySmall" style={getStyles().cardAnonSubtitle}>
                  Allow participants to respond anonymously
                </Text>
              </View>
              <Switch value={isAnonymous} onValueChange={setIsAnonymous} style={getStyles().switch} />
            </Card.Content>
          </Card>

          <Text variant="titleMedium" style={getStyles().fieldLabel}>
            End Date
          </Text>

          <TextInput
            mode="outlined"
            value={endDate}
            onChangeText={setEndDate}
            placeholder="jj/mm/aaaa --:--"
            style={getStyles().textInput}
          />

          <Text variant="bodySmall" style={getStyles().fieldSubtitle}>
            Set when the question will close for responses
          </Text>

          <View style={getStyles().buttonContainer}>
            <Button
              mode="contained"
              onPress={() => console.log('Create Question pressed')}
              style={getStyles().createButton}
              labelStyle={getStyles().createButtonLabel}
              contentStyle={{ paddingVertical: 6, paddingHorizontal: 16 }}
              buttonColor={colors.accent}
              textColor={colors.card}
            >
              Create Question
            </Button>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
