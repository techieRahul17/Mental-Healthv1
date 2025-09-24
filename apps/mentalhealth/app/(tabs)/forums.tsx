import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Colors, Typography } from '@/constants/theme';
import { useTheme } from '@/contexts/theme-context';
import { useUser } from '@/contexts/user-context';
import { mongoService } from '@/services/mongodb';
import { formatTimeAgo } from '@/utils/timeFormat';

export default function ForumsScreen() {
  const { theme } = useTheme();
  const { user } = useUser();
  const colors = Colors[theme];
  
  const [forums, setForums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchForums = async () => {
    try {
      setError(null);
      const data = await mongoService.getForums();
      setForums(data || []);
    } catch (error: any) {
      console.error('Fetch forums error:', error);
      setError(error.message);
      setForums([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchForums();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchForums(); // Refresh when screen comes into focus
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchForums();
    setRefreshing(false);
  };

  const handleForumPress = (forumId: string) => {
    router.push(`/forum/${forumId}`);
  };

  const handleCreateForum = () => {
    router.push('/create-forum');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.headerTitle, Typography.medium, { color: colors.text }]}>
            takeUrTime
          </Text>
          <Text style={[styles.userInfo, Typography.body, { color: colors.textSecondary }]}>
            Welcome, {user?.username || 'Guest'}
          </Text>
        </View>
        <ThemeToggle />
      </View>

      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.titleSection}>
          <Text style={[styles.title, Typography.heading, { color: colors.text }]}>
            Support Forums
          </Text>
          <Button
            title="Create Forum"
            onPress={handleCreateForum}
            variant="primary"
          />
        </View>

        <View style={styles.forumsList}>
          {loading ? (
            <Text style={[styles.loadingText, Typography.body, { color: colors.text }]}>
              Loading forums...
            </Text>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={[styles.errorText, Typography.body, { color: colors.textSecondary }]}>
                Error: {error}
              </Text>
            </View>
          ) : forums.length === 0 ? (
            <Text style={[styles.emptyText, Typography.body, { color: colors.textSecondary }]}>
              No forums yet. Create the first one!
            </Text>
          ) : (
            forums.map((forum: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={[styles.forumCard, { backgroundColor: colors.card }]}
                onPress={() => handleForumPress(forum._id)}
              >
                <View style={styles.forumHeader}>
                  <View style={[styles.forumIcon, { backgroundColor: colors.tint }]}>
                    <Text style={styles.forumIconText}>r/</Text>
                  </View>
                  <View style={styles.forumInfo}>
                    <Text style={[styles.forumTitle, Typography.subheading, { color: colors.text }]}>
                      r/{forum.title.toLowerCase().replace(/\s+/g, '')}
                    </Text>
                    <Text style={[styles.memberCount, Typography.body, { color: colors.textSecondary }]}>
                      {forum.members?.length || 0} members
                    </Text>
                  </View>
                </View>
                <Text style={[styles.forumDescription, Typography.body, { color: colors.textSecondary }]}>
                  {forum.description}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 16,
  },
  userInfo: {
    fontSize: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  forumsList: {
    gap: 16,
  },
  loadingText: {
    textAlign: 'center',
    padding: 20,
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    padding: 20,
  },
  forumCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  forumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  forumIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  forumIconText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  forumInfo: {
    flex: 1,
  },
  forumTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  forumDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  memberCount: {
    fontSize: 12,
  },
});
