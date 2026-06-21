import * as React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { colors, device, gStyle, images } from '../constants';

// components
import AlbumsHorizontal from '../components/AlbumsHorizontal';

// mock data
import heavyRotation from '../mockdata/heavyRotation.json';
import jumpBackIn from '../mockdata/jumpBackIn.json';
import recentlyPlayed from '../mockdata/recentlyPlayed.json';

function Home() {
  const scrollY = React.useRef(new Animated.Value(0)).current;

  const opacityIn = scrollY.interpolate({
    inputRange: [0, 128],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const opacityOut = scrollY.interpolate({
    inputRange: [0, 88],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <React.Fragment>
      {device.iPhoneNotch && (
        <Animated.View style={[styles.iPhoneNotch, { opacity: opacityIn }]} />
      )}

      <Animated.View style={[styles.containerHeader, { opacity: opacityOut }]}>
        <FontAwesome color={colors.white} name="cog" size={24} />
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={gStyle.container}
      >
        <View style={styles.containerGreeting}>
          <Text style={styles.greetingText}>{getGreeting()}</Text>
        </View>

        <View style={styles.containerGrid}>
          {recentlyPlayed.slice(0, 6).map((item) => (
            <TouchableOpacity
              activeOpacity={gStyle.activeOpacity}
              key={item.id}
              style={styles.gridItem}
            >
              <Image source={images[item.image]} style={styles.gridImage} />
              <Text numberOfLines={2} style={styles.gridTitle}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <AlbumsHorizontal data={heavyRotation} heading="Your heavy rotation" />

        <AlbumsHorizontal
          data={jumpBackIn}
          heading="Jump back in"
          tagline="Your top listens from the past few months."
        />
      </Animated.ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  iPhoneNotch: {
    backgroundColor: colors.black70,
    height: 44,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 20
  },
  containerHeader: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: device.iPhoneNotch ? 60 : 36,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10
  },
  containerGreeting: {
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: device.iPhoneNotch ? 110 : 70
  },
  greetingText: {
    ...gStyle.text_lg,
    color: colors.text_primary,
    fontWeight: '700'
  },
  containerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 16
  },
  gridItem: {
    alignItems: 'center',
    backgroundColor: colors.player_bg,
    borderRadius: 4,
    flexDirection: 'row',
    height: 56,
    marginBottom: 8,
    overflow: 'hidden',
    width: '48.5%'
  },
  gridImage: {
    height: 56,
    width: 56
  },
  gridTitle: {
    ...gStyle.text_xs,
    color: colors.text_primary,
    flex: 1,
    fontWeight: '600',
    paddingHorizontal: 8
  }
});

export default Home;
