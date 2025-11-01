import { ScrollView, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/constants/theme';

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

export default function AboutScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <ThemedView style={{ flex: 1 }}>
    <ScrollView style={{ flex: 1 }}>

      <ThemedView style={{
        backgroundColor: colors.accentLight,
        paddingVertical: 48,
        paddingHorizontal: 20,
        alignItems: 'center'
      }}>
        <View style={{ marginBottom: 16 }}>
          <MaterialIcons name="lightbulb" size={48} color={colors.accent} />
        </View>
        <ThemedText style={{
          fontSize: 32,
          fontWeight: '800',
          color: colors.accent,
          marginBottom: 8
        }}>BaselHack 2025</ThemedText>
        <ThemedText style={{
          fontSize: 16,
          color: colors.textSecondary,
          textAlign: 'center'
        }}>Consensus.AI - Building the Future Together</ThemedText>
      </ThemedView>

      <ThemedView style={{
        paddingHorizontal: 16,
        paddingVertical: 24
      }}>

        <ThemedView style={{
          backgroundColor: colors.card,
          borderRadius: 12,
          padding: 20,
          marginBottom: 16,
          borderLeftWidth: 4,
          borderLeftColor: colors.accent,
          borderWidth: 1,
          borderTopColor: colors.border,
          borderRightColor: colors.border,
          borderBottomColor: colors.border
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
            gap: 10
          }}>
            <MaterialIcons name="group" size={24} color={colors.accent} />
            <ThemedText style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.accent
            }}>Our Team</ThemedText>
          </View>
          <ThemedText style={{
            fontSize: 14,
            lineHeight: 22,
            color: colors.textSecondary
          }}>
            6 French engineering students from Epitech, united by passion for innovation and problem-solving at BaselHack 2025.
          </ThemedText>
        </ThemedView>

        <ThemedView style={{
          backgroundColor: colors.accentLight,
          borderRadius: 12,
          padding: 20,
          marginBottom: 16,
          borderLeftWidth: 4,
          borderLeftColor: colors.accent,
          borderWidth: 1,
          borderTopColor: colors.border,
          borderRightColor: colors.border,
          borderBottomColor: colors.border
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
            gap: 10
          }}>
            <MaterialIcons name="trending-up" size={24} color={colors.accent} />
            <ThemedText style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.accent
            }}>Our Challenge</ThemedText>
          </View>
          <ThemedText style={{
            fontSize: 15,
            fontWeight: '600',
            color: colors.text,
            marginBottom: 10
          }}>
            Collective Intelligence - Building Consensus Through AI
          </ThemedText>
          <ThemedText style={{
            fontSize: 14,
            lineHeight: 22,
            color: colors.textSecondary
          }}>
            Create an innovative platform that gathers diverse opinions and leverages AI to extract meaningful consensus, enabling smarter and more inclusive decisions.
          </ThemedText>
        </ThemedView>

        <ThemedView style={{ marginBottom: 28 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
            gap: 10
          }}>
            <MaterialIcons name="checklist" size={24} color={colors.accent} />
            <ThemedText style={{
              fontSize: 20,
              fontWeight: '700',
              color: colors.accent
            }}>Challenge Objectives</ThemedText>
          </View>

          <View style={{ gap: 12 }}>
            {[
              { icon: 'comment', title: 'Collect Opinions', desc: 'Gather diverse perspectives and arguments from participants' },
              { icon: 'analytics', title: 'Analyze Data', desc: 'Identify common themes, divergences and patterns' },
              { icon: 'summarize', title: 'Generate Consensus', desc: 'Produce balanced summaries reflecting collective wisdom' },
            ].map((obj, idx) => (
              <ThemedView key={idx} style={{
                flexDirection: 'row',
                backgroundColor: colors.accentLight,
                borderRadius: 10,
                padding: 14,
                gap: 12,
                borderLeftWidth: 3,
                borderLeftColor: colors.accent
              }}>
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: colors.background,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MaterialIcons name={obj.icon as any} size={20} color={colors.accent} />
                </View>
                <View style={{ flex: 1 }}>
                  <ThemedText style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: colors.text,
                    marginBottom: 2
                  }}>{obj.title}</ThemedText>
                  <ThemedText style={{
                    fontSize: 13,
                    color: colors.textSecondary
                  }}>{obj.desc}</ThemedText>
                </View>
              </ThemedView>
            ))}
          </View>
        </ThemedView>

        <ThemedView style={{ marginBottom: 28 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
            gap: 10
          }}>
            <MaterialIcons name="people" size={24} color={colors.accent} />
            <ThemedText style={{
              fontSize: 20,
              fontWeight: '700',
              color: colors.accent
            }}>Team Members</ThemedText>
          </View>

          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12
          }}>
            {teamMembers.map((member, index) => (
              <ThemedView key={index} style={{
                flex: 1,
                minWidth: '45%',
                backgroundColor: colors.accentLight,
                borderRadius: 12,
                padding: 16,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.accent
              }}>
                <View style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: colors.background,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10
                }}>
                  <MaterialIcons name="person" size={24} color={colors.accent} />
                </View>
                <ThemedText style={{
                  fontSize: 13,
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: 4,
                  textAlign: 'center'
                }}>{member.name}</ThemedText>
                <ThemedText style={{
                  fontSize: 11,
                  color: colors.accent,
                  textAlign: 'center'
                }}>{member.email}</ThemedText>
              </ThemedView>
            ))}
          </View>
        </ThemedView>

        <ThemedView style={{ marginBottom: 28 }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
            gap: 10
          }}>
            <MaterialIcons name="favorite" size={24} color={colors.accent} />
            <ThemedText style={{
              fontSize: 20,
              fontWeight: '700',
              color: colors.accent
            }}>Our Values</ThemedText>
          </View>

          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12
          }}>
            {[
              { icon: 'flash-on', title: 'Innovation', desc: 'Creative solutions' },
              { icon: 'handshake', title: 'Collaboration', desc: 'Team synergy' },
              { icon: 'star', title: 'Excellence', desc: 'Technical perfection' },
              { icon: 'school', title: 'Learning', desc: 'Continuous growth' },
            ].map((val, idx) => (
              <ThemedView key={idx} style={{
                flex: 1,
                minWidth: '48%',
                backgroundColor: colors.accentLight,
                borderRadius: 12,
                padding: 16,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.border
              }}>
                <View style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: colors.background,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10
                }}>
                  <MaterialIcons name={val.icon as any} size={24} color={colors.accent} />
                </View>
                <ThemedText style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: colors.text,
                  marginBottom: 4
                }}>{val.title}</ThemedText>
                <ThemedText style={{
                  fontSize: 12,
                  color: colors.textSecondary,
                  textAlign: 'center'
                }}>{val.desc}</ThemedText>
              </ThemedView>
            ))}
          </View>
        </ThemedView>

        <ThemedView style={{
          backgroundColor: colors.accentLight,
          borderRadius: 12,
          padding: 24,
          alignItems: 'center',
          borderWidth: 2,
          borderColor: colors.accent,
          marginBottom: 24
        }}>
          <ThemedText style={{
            fontSize: 12,
            fontWeight: '600',
            color: colors.accent,
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: 0.5
          }}>Proud Sponsor</ThemedText>
          <ThemedText style={{
            fontSize: 24,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 10
          }}>Endress+Hauser</ThemedText>
          <ThemedText style={{
            fontSize: 13,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 20
          }}>
            Global leader in measurement instrumentation driving innovation through digital transformation and collective intelligence.
          </ThemedText>
        </ThemedView>

        <ThemedView style={{
          backgroundColor: colors.accentLight,
          borderRadius: 12,
          padding: 28,
          alignItems: 'center',
          marginBottom: 40,
          borderLeftWidth: 4,
          borderLeftColor: colors.accent
        }}>
          <MaterialIcons name="mail" size={32} color={colors.accent} />
          <ThemedText style={{
            fontSize: 18,
            fontWeight: '700',
            color: colors.accent,
            marginTop: 12,
            marginBottom: 8
          }}>Get In Touch</ThemedText>
          <ThemedText style={{
            fontSize: 13,
            color: colors.textSecondary,
            textAlign: 'center'
          }}>
            Questions? Ideas? We're always open to collaboration.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ScrollView>
    </ThemedView>
  );
}
