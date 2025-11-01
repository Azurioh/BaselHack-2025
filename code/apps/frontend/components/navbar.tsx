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
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [logoHovered, setLogoHovered] = useState(false);
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
      <Link href="/" asChild>
        <Pressable
          style={logoHovered ? styles.logoHovered : styles.leftSection}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <Appbar.Action icon="check-circle" color={COLORS.accent} size={24} />
          <Text style={logoHovered ? styles.logoTextHovered : styles.logoText}>
            BaselHack
          </Text>
        </Pressable>
      </Link>

      <View style={styles.navContainer}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} asChild>
            <Pressable
              style={hoveredNav === item.href ? styles.navLinkHovered : styles.navLink}
              onMouseEnter={() => setHoveredNav(item.href)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <Text style={hoveredNav === item.href ? styles.navLinkTextHovered : styles.navLinkText}>
                {item.name}
              </Text>
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  logoHovered: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#F0F0F0',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  logoTextHovered: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.accent,
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
    borderRadius: 6,
  },
  navLinkHovered: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F0F0F0',
  },
  navLinkText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  navLinkTextHovered: {
    fontSize: 14,
    color: COLORS.accent,
    fontWeight: '500',
  },
});
