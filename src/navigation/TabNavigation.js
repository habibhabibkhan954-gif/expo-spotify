import * as React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants';

// navigation stacks
import StackHome from './StackHome';
import StackSearch from './StackSearch';
import StackLibrary from './StackLibrary';

// components
import CustomTabBar from '../components/CustomTabBar';

const Tab = createBottomTabNavigator();

function TabBarIconHome({ focused, color, size }) {
  return (
    <Ionicons
      name={focused ? 'home' : 'home-outline'}
      size={size}
      color={color}
    />
  );
}
TabBarIconHome.propTypes = {
  color: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired
};

function TabBarIconSearch({ focused, color, size }) {
  return (
    <Ionicons
      name={focused ? 'search' : 'search-outline'}
      size={size}
      color={color}
    />
  );
}
TabBarIconSearch.propTypes = {
  color: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired
};

function TabBarIconLibrary({ focused, color, size }) {
  return (
    <Ionicons
      name={focused ? 'library' : 'library-outline'}
      size={size}
      color={color}
    />
  );
}
TabBarIconLibrary.propTypes = {
  color: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
  size: PropTypes.number.isRequired
};

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text_primary,
        tabBarInactiveTintColor: colors.text_secondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.divider,
          borderTopWidth: 0.5
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '500'
        }
      }}
      tabBar={CustomTabBar}
    >
      <Tab.Screen
        name="StackHome"
        component={StackHome}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: TabBarIconHome
        }}
      />
      <Tab.Screen
        name="StackSearch"
        component={StackSearch}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: TabBarIconSearch
        }}
      />
      <Tab.Screen
        name="StackLibrary"
        component={StackLibrary}
        options={{
          tabBarLabel: 'Library',
          tabBarIcon: TabBarIconLibrary
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
