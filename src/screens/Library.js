import * as React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native';
import { colors, device, gStyle } from '../constants';

// components
import LineItemCategory from '../components/LineItemCategory';
import ScreenHeader from '../components/ScreenHeader';
import TouchText from '../components/TouchText';

// context
import Context from '../context';

// mock data
import yourLibrary from '../mockdata/menuYourLibrary.json';

function Library() {
  const { user, isLoggedIn, loginWithGoogle, logout } =
    React.useContext(Context);
  const [activeFilter, setActiveFilter] = React.useState('Playlists');
  const filters = ['Playlists', 'Artists', 'Albums', 'Podcasts & Shows'];

  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader title="Your Library" />

        {isLoggedIn ? (
          <View style={styles.containerUser}>
            <Image source={{ uri: user.photo }} style={styles.userPhoto} />
            <View style={styles.containerUserInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>
            <TouchText
              onPress={logout}
              style={styles.btnLogout}
              styleText={styles.btnLogoutText}
              text="Logout"
            />
          </View>
        ) : (
          <View style={styles.containerLogin}>
            <TouchText
              onPress={loginWithGoogle}
              style={styles.btnLogin}
              styleText={styles.btnLoginText}
              text="Login with Google"
            />
          </View>
        )}

        <View style={styles.containerFilters}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersScroll}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter}
                activeOpacity={gStyle.activeOpacity}
                onPress={() => setActiveFilter(filter)}
                style={[
                  styles.filterPill,
                  activeFilter === filter && styles.filterPillActive
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === filter && styles.filterTextActive
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      <FlatList
        contentContainerStyle={styles.containerFlatlist}
        data={yourLibrary}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <LineItemCategory
            icon={item.icon}
            onPress={() => null}
            title={item.title}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerUser: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  userPhoto: {
    borderRadius: 24,
    height: 48,
    width: 48
  },
  containerUserInfo: {
    flex: 1,
    marginLeft: 12
  },
  userName: {
    ...gStyle.text_base,
    color: colors.text_primary,
    fontWeight: '600'
  },
  userEmail: {
    ...gStyle.text_xs,
    color: colors.text_secondary
  },
  btnLogout: {
    backgroundColor: colors.elevated,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  btnLogoutText: {
    ...gStyle.text_xs,
    color: colors.text_primary
  },
  containerLogin: {
    marginTop: 8,
    paddingHorizontal: 16
  },
  btnLogin: {
    alignItems: 'center',
    backgroundColor: colors.accent_green,
    borderRadius: 24,
    paddingVertical: 12
  },
  btnLoginText: {
    ...gStyle.text_base,
    color: colors.black,
    fontWeight: '700'
  },
  containerHeader: {
    backgroundColor: colors.background,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10
  },
  containerFilters: {
    paddingVertical: 12
  },
  filtersScroll: {
    paddingHorizontal: 16
  },
  filterPill: {
    backgroundColor: colors.elevated,
    borderColor: 'transparent',
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  filterPillActive: {
    backgroundColor: colors.accent_green
  },
  filterText: {
    ...gStyle.text_sm,
    color: colors.text_primary,
    fontWeight: '500'
  },
  filterTextActive: {
    color: colors.black
  },
  containerFlatlist: {
    marginTop: device.iPhoneNotch ? 160 : 130,
    paddingBottom: 80
  }
});

export default Library;
