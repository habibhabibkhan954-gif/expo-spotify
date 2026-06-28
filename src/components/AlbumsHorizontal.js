import * as React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, gStyle, images } from '../constants';

function AlbumsHorizontal({ data, heading, tagline }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {heading && (
        <View style={styles.containerHeader}>
          <Text style={styles.heading}>{heading}</Text>
        </View>
      )}
      {tagline && <Text style={styles.tagline}>{tagline}</Text>}

      <FlatList
        contentContainerStyle={styles.containerContent}
        data={data}
        horizontal
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={gStyle.activeOpacity}
            onPress={() => navigation.navigate('Album', { title: item.title })}
            style={styles.item}
          >
            <View style={styles.imageContainer}>
              {item.image && (
                <Image source={images[item.image]} style={styles.image} />
              )}
            </View>
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            {item.artist && (
              <Text numberOfLines={1} style={styles.artist}>
                {item.artist}
              </Text>
            )}
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

AlbumsHorizontal.defaultProps = {
  heading: null,
  tagline: null
};

AlbumsHorizontal.propTypes = {
  // required
  data: PropTypes.array.isRequired,

  // optional
  heading: PropTypes.string,
  tagline: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    width: '100%'
  },
  containerHeader: {
    paddingBottom: 8,
    paddingHorizontal: 16
  },
  containerContent: {
    paddingLeft: 16
  },
  heading: {
    ...gStyle.text_md,
    color: colors.text_primary
  },
  tagline: {
    ...gStyle.text_sm,
    color: colors.text_secondary,
    paddingBottom: 12,
    paddingHorizontal: 16
  },
  item: {
    marginRight: 16,
    width: 140
  },
  imageContainer: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    height: 140,
    overflow: 'hidden',
    width: 140
  },
  image: {
    height: 140,
    width: 140
  },
  title: {
    ...gStyle.text_base,
    color: colors.text_primary,
    fontWeight: '600',
    marginTop: 8
  },
  artist: {
    ...gStyle.text_sm,
    color: colors.text_secondary,
    marginTop: 2
  }
});

export default AlbumsHorizontal;
