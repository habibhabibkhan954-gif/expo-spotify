import * as React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Feather,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome
} from '@expo/vector-icons';
import { colors, gStyle, images } from '../constants';

function LineItemCategory({
  icon,
  onPress,
  title,
  disableRightSide,
  iconLibrary
}) {
  let iconDisplay;

  switch (iconLibrary) {
    case 'Entypo':
      iconDisplay = (
        <Entypo color={colors.greyInactive} name={icon} size={24} />
      );
      break;
    case 'MaterialIcons':
      iconDisplay = (
        <MaterialIcons color={colors.greyInactive} name={icon} size={24} />
      );
      break;
    case 'MaterialCommunityIcons':
      iconDisplay = (
        <MaterialCommunityIcons
          color={colors.greyInactive}
          name={icon}
          size={24}
        />
      );
      break;
    case 'FontAwesome':
      iconDisplay = (
        <FontAwesome color={colors.greyInactive} name={icon} size={24} />
      );
      break;
    case 'Feather':
    default:
      iconDisplay = (
        <Feather color={colors.greyInactive} name={icon} size={24} />
      );
      break;
  }

  return (
    <TouchableOpacity
      activeOpacity={gStyle.activeOpacity}
      onPress={onPress}
      style={styles.container}
    >
      <View style={gStyle.flexRowCenterAlign}>
        {icon ? (
          iconDisplay
        ) : (
          <Image
            source={images.albumSwimming}
            style={[
              styles.image,
              iconLibrary === 'Artist' ? styles.imageCircle : styles.imageRadius
            ]}
          />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      {disableRightSide ? null : (
        <View style={styles.containerRight}>
          <Feather color={colors.greyInactive} name="chevron-right" size={20} />
        </View>
      )}
    </TouchableOpacity>
  );
}

LineItemCategory.defaultProps = {
  disableRightSide: null,
  iconLibrary: 'Feather'
};

LineItemCategory.propTypes = {
  // required
  icon: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,

  // optional
  disableRightSide: PropTypes.bool,
  iconLibrary: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%'
  },
  image: {
    height: 56,
    width: 56
  },
  imageRadius: {
    borderRadius: 4
  },
  imageCircle: {
    borderRadius: 28
  },
  title: {
    ...gStyle.textSpotify14,
    color: colors.white,
    marginLeft: 16
  },
  containerRight: {
    alignItems: 'flex-end',
    flex: 1
  }
});

export default LineItemCategory;
