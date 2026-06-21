import * as React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { colors, device, gStyle } from '../constants';

// components
import LineItemCategory from '../components/LineItemCategory';
import ScreenHeader from '../components/ScreenHeader';

// mock data
import yourLibrary from '../mockdata/menuYourLibrary.json';

function Library() {
  const [activeFilter, setActiveFilter] = React.useState('Playlists');
  const filters = ['Playlists', 'Artists', 'Albums', 'Podcasts & Shows'];

  return (
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader title="Your Library" />

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
