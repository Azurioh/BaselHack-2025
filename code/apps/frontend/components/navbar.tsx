import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
  background: '#0A0A0A',
  text: '#FFFFFF',
  textSecondary: '#A0A0A0',
  accent: '#3B82F6',
  border: '#1F1F1F',
};

interface NavItem {
  name: string;
  href: string;
}

export function Navbar() {
  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Questions', href: '/questions' },
    { name: 'Profile', href: '/profile' },
    { name: 'About', href: '/about' },
  ];

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Link href="/" asChild>
        <Pressable style={styles.logo}>
          <View style={styles.logoIcon}>
            <MaterialIcons name="check-circle" size={24} color={COLORS.accent} />
          </View>
          <Text style={styles.logoText}>BaselHack</Text>
        </Pressable>
      </Link>

      {/* Navigation */}
      <View style={styles.navLinks}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} asChild>
            <Pressable style={({ pressed }) => [styles.navLink, pressed && styles.navLinkPressed]}>
              <Text style={styles.navLinkText}>{item.name}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      {/* Get Started button */}
      <Link href="/questions" asChild>
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.background,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  navLinks: {
    flexDirection: 'row',
    gap: 24,
    flex: 1,
    justifyContent: 'center',
  },
  navLink: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  navLinkPressed: {
    opacity: 0.6,
  },
  navLinkText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    gap: 6,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: '500',
  },
});
