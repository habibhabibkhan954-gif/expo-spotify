import * as React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../constants';

// navigation stacks
import StackHome from './StackHome';
import StackSearch from './StackSearch';
import StackLibrary from './StackLibrary';

// components
import CustomTabBar from '../components/CustomTabBar';

// icons
import SvgTabHome from '../icons/Svg.TabHome';
import SvgTabLibrary from '../icons/Svg.TabLibrary';
import SvgTabSearch from '../icons/Svg.TabSearch';

const Tab = createBottomTabNavigator();

function TabBarIconHome({ active }) {
  return <SvgTabHome active={active} />;
}

TabBarIconHome.propTypes = {
  active: PropTypes.bool.isRequired
};

function TabBarIconSearch({ active }) {
  return <SvgTabSearch active={active} />;
}

TabBarIconSearch.propTypes = {
  active: PropTypes.bool.isRequired
};

function TabBarIconLibrary({ active }) {
  return <SvgTabLibrary active={active} />;
}

TabBarIconLibrary.propTypes = {
  active: PropTypes.bool.isRequired
};

function renderTabBar(props) {
  return <CustomTabBar {...props} />;
}

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.greyInactive
      }}
      tabBar={renderTabBar}
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
