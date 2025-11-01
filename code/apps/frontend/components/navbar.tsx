import { View, StyleSheet, useWindowDimensions, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Appbar, Menu, Button, Text } from 'react-native-paper';
import { useState } from 'react';

const COLORS = {
  background: '#FFFFFF',
  text: '#000000',
  textSecondary: '#666666',
  accent: '#3B82F6',
  border: '#E5E5E5',
};

interface NavItem {
  name: string;
  href: string;
}

export function Navbar() {
  const { width } = useWindowDimensions();
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = width < 768;

  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Questions', href: '/questions' },
    { name: 'Profile', href: '/profile' },
    { name: 'About', href: '/about' },
  ];

  if (isMobile) {
    return (
      <>
        <Appbar.Header style={styles.appbar}>
          <Link href="/" asChild>
            <Appbar.Action icon="check-circle" color={COLORS.accent} size={24} />
          </Link>
          <Appbar.Content title="BaselHack" color={COLORS.text} />
          <Menu
            visible={menuOpen}
            onDismiss={() => setMenuOpen(false)}
            anchor={
              <Appbar.Action
                icon={menuOpen ? 'close' : 'menu'}
                color={COLORS.text}
                onPress={() => setMenuOpen(!menuOpen)}
              />
            }
          >
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} asChild>
                <Menu.Item
                  onPress={() => setMenuOpen(false)}
                  title={item.name}
                />
              </Link>
            ))}
            <Menu.Divider />
            <Link href="/questions" asChild>
              <Menu.Item
                onPress={() => setMenuOpen(false)}
                title="Get Started"
              />
            </Link>
          </Menu>
        </Appbar.Header>
      </>
    );
  }

  // Desktop View
  return (
    <View style={styles.appbarDesktop}>
      <View style={styles.leftSection}>
        <Link href="/" asChild>
          <Pressable>
            <Appbar.Action icon="check-circle" color={COLORS.accent} size={24} />
          </Pressable>
        </Link>
        <Text style={styles.logoText}>BaselHack</Text>
      </View>

      <View style={styles.navContainer}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} asChild>
            <Pressable style={({ pressed }) => [styles.navLink, pressed && styles.navLinkPressed]}>
              <Text style={styles.navLinkText}>{item.name}</Text>
            </Pressable>
          </Link>
        ))}
      </View>

      <Link href="/questions" asChild>
        <Pressable>
          <Button
            mode="contained"
            textColor={COLORS.text}
            buttonColor={COLORS.accent}
          >
            Get Started
          </Button>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  appbar: {
    backgroundColor: COLORS.background,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
  },
  appbarDesktop: {
    backgroundColor: COLORS.background,
    borderBottomColor: COLORS.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  navContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    gap: 24,
  },
  navLink: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  navLinkPressed: {
    opacity: 0.6,
  },
  navLinkText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
});
