import { useWindowDimensions, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { Appbar, Menu, Button, Text } from 'react-native-paper';
import { useState } from 'react';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';
import { ThemedView } from './themed-view';

interface NavItem {
  name: string;
  href: string;
}

export function Navbar() {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
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
        <Appbar.Header style={{ backgroundColor: colors.card, borderBottomColor: colors.border, borderBottomWidth: 1 }}>
          <Link href="/" asChild>
            <Appbar.Action icon="check-circle" color={colors.tint} size={24} />
          </Link>
          <Appbar.Content title="BaselHack" color={colors.text} />
          <Menu
            visible={menuOpen}
            onDismiss={() => setMenuOpen(false)}
            anchor={
              <Appbar.Action
                icon={menuOpen ? 'close' : 'menu'}
                color={colors.text}
                onPress={() => setMenuOpen(!menuOpen)}
              />
            }
          >
            {navItems.map((item) => (
              <Menu.Item
                key={item.href}
                onPress={() => setMenuOpen(false)}
                title={item.name}
              />
            ))}
            <Menu.Item
              onPress={() => setMenuOpen(false)}
              title="Get Started"
            />
          </Menu>
        </Appbar.Header>
      </>
    );
  }

  return (
    <ThemedView
      lightColor={Colors.light.card}
      darkColor={Colors.dark.card}
      style={{
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      alignItems: 'center',
      gap: 16,
    }}>
      <Link href="/" asChild>
        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
            backgroundColor: logoHovered ? (colorScheme === 'dark' ? '#2a2a2a' : '#F0F0F0') : 'transparent',
          }}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <Appbar.Action icon="check-circle" color={colors.tint} size={24} />
          <Text style={{
            fontSize: 18,
            fontWeight: '600',
            color: logoHovered ? colors.tint : colors.text,
          }}>
            BaselHack
          </Text>
        </Pressable>
      </Link>

      <ThemedView style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        gap: 24,
        backgroundColor: 'transparent',
      }}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href as any} asChild>
            <Pressable
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 6,
                backgroundColor: hoveredNav === item.href ? (colorScheme === 'dark' ? '#2a2a2a' : '#F0F0F0') : 'transparent',
              }}
              onMouseEnter={() => setHoveredNav(item.href)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: '500',
                color: hoveredNav === item.href ? colors.tint : colors.icon,
              }}>
                {item.name}
              </Text>
            </Pressable>
          </Link>
        ))}
      </ThemedView>

      <Link href="/createQuestion" asChild>
        <Pressable>
          <Button
            mode="contained"
            textColor="#ffffff"
            buttonColor={colors.tint}
          >
            Get Started
          </Button>
        </Pressable>
      </Link>
    </ThemedView>
  );
}


