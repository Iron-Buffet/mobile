/**
 * Libraries
 */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
/**
 * Components
 */
import HeaderLeft from './components/HeaderLeft';
import ProfileHeaderRight from './components/ProfileHeaderRight';
import CalendarHeaderRight from './components/CalendarHeaderRight';
/**
 * Configs
 */
import theme from '../constants/Theme';
import Menu from './components/Drawer';
import {Icons, LINKS} from '../constants';

/**
 * Screens
 */
import BillingInformationScreen from '../screens/BillingInformation';
import ChangePasswordScreen from '../screens/ChangePassword';
import AddToCalendarScreen from '../screens/AddToCalendar';
import CreateWorkoutScreen from '../screens/CreateWorkout';
import EditProfileScreen from '../screens/EditProfile';
import DashboardScreen from '../screens/Dashboard';
import CheckAuthScreen from '../screens/CheckAuth';
import WorkoutsScreen from '../screens/Workouts';
import RegisterScreen from '../screens/Register';
import CalendarScreen from '../screens/Calendar';
import WorkoutScreen from '../screens/Workout';
import ProfileScreen from '../screens/Profile';
import LoginScreen from '../screens/Login';
import PartsScreen from '../screens/Parts';
import ChatsScreen from '../screens/Chat/Chats';
import MessagesScreen from '../screens/Chat/Messages';
import {AuthContext} from '../context/contexts';

const headerBaseConfig = {
  headerStyle: {
    backgroundColor: theme.COLORS.APP_BG,
    shadowColor: theme.COLORS.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitleStyle: {
    color: theme.COLORS.TEXT,
    textTransform: 'uppercase',
    fontFamily: theme.FONT_FAMILY.REGULAR,
  },
};

const AuthStack = createStackNavigator();
const WMStack = createStackNavigator();
const CertifiedStack = createStackNavigator();
const DashboardStack = createStackNavigator();
const CalendarStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const RootStack = createStackNavigator();
const ChatStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        ...headerBaseConfig,
        headerShown: false,
      }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

const Profile = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          ...headerBaseConfig,
          title: 'Profile',
          headerLeft: () => <HeaderLeft icon={Icons.menu} />,
          headerRight: () => <ProfileHeaderRight />,
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          ...headerBaseConfig,
          title: 'Edit',
          headerLeft: () => (
            <HeaderLeft title="Profile" back icon={Icons.back} />
          ),
          headerRight: () => <ProfileHeaderRight />,
        }}
      />
      <ProfileStack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          ...headerBaseConfig,
          title: 'Change Password',
          headerLeft: () => (
            <HeaderLeft title="Profile" back icon={Icons.back} />
          ),
        }}
      />
      <ProfileStack.Screen
        name="BillingInformation"
        component={BillingInformationScreen}
        path="prfl"
        options={{
          ...headerBaseConfig,
          title: 'Billing Information',
          headerLeft: () => <HeaderLeft title="Edit" back icon={Icons.back} />,
        }}
      />
    </ProfileStack.Navigator>
  );
};

const Dashboard = () => {
  return (
    <DashboardStack.Navigator
      screenOptions={{
        ...headerBaseConfig,
      }}>
      <DashboardStack.Screen name="Dashboard" component={DashboardScreen} />
      <DashboardStack.Screen
        options={{
          ...headerBaseConfig,
          title: 'Create',
          headerLeft: () => (
            <HeaderLeft title="Dashboard" back icon={Icons.back} />
          ),
        }}
        name="DCreateWorkout"
        component={CreateWorkoutScreen}
      />
    </DashboardStack.Navigator>
  );
};

const WM = () => {
  return (
    <WMStack.Navigator
      screenOptions={{
        ...headerBaseConfig,
      }}>
      <WMStack.Screen
        options={{
          ...headerBaseConfig,
          headerTitle: 'Workout Management',
          headerLeft: () => <HeaderLeft icon={Icons.menu} />,
        }}
        name="WMParts">
        {() => <PartsScreen path="WMWorkouts" />}
      </WMStack.Screen>
      <WMStack.Screen
        options={{
          ...headerBaseConfig,
          headerTitle: 'Workout Management',
          headerLeft: () => <HeaderLeft title="Parts" back icon={Icons.back} />,
        }}
        name="WMWorkouts">
        {() => (
          <WorkoutsScreen
            workoutPath="WMWorkout"
            createWorkoutPath="WMCreateWorkout"
            url={LINKS.WORKOUT_INDEX}
          />
        )}
      </WMStack.Screen>
      <WMStack.Screen
        name="WMWorkout"
        component={WorkoutScreen}
        options={{
          ...headerBaseConfig,
          title: '',
          headerLeft: () => (
            <HeaderLeft title="Workout Management" back icon={Icons.back} />
          ),
        }}
      />
      <WMStack.Screen
        name="WMCreateWorkout"
        options={{
          ...headerBaseConfig,
          title: 'Create',
          headerLeft: () => (
            <HeaderLeft title="Workouts" back icon={Icons.back} />
          ),
        }}>
        {() => <CreateWorkoutScreen workoutPath="WMWorkout" />}
      </WMStack.Screen>
    </WMStack.Navigator>
  );
};
const Certified = () => {
  return (
    <CertifiedStack.Navigator
      screenOptions={{
        ...headerBaseConfig,
      }}>
      <CertifiedStack.Screen
        options={{
          ...headerBaseConfig,
          headerTitle: 'Certified Workouts',
          headerLeft: () => <HeaderLeft icon={Icons.menu} />,
        }}
        name="CParts">
        {() => <PartsScreen path="CWorkouts" />}
      </CertifiedStack.Screen>
      <CertifiedStack.Screen
        options={{
          ...headerBaseConfig,
          headerTitle: 'Certified Workouts',
          headerLeft: () => <HeaderLeft title="Parts" back icon={Icons.back} />,
        }}
        name="CWorkouts">
        {() => (
          <WorkoutsScreen
            workoutPath="CWorkout"
            createWorkoutPath="CCreateWorkout"
            url={LINKS.WORKOUT_CERTIFIED}
          />
        )}
      </CertifiedStack.Screen>
      <CertifiedStack.Screen
        name="CWorkout"
        component={WorkoutScreen}
        options={{
          ...headerBaseConfig,
          title: '',
          headerLeft: () => (
            <HeaderLeft title="Certified Workouts" back icon={Icons.back} />
          ),
        }}
      />
      <CertifiedStack.Screen
        name="CCreateWorkout"
        options={{
          ...headerBaseConfig,
          title: 'Create',
          headerLeft: () => (
            <HeaderLeft title="Workouts" back icon={Icons.back} />
          ),
        }}>
        {() => <CreateWorkoutScreen workoutPath="CWorkout" />}
      </CertifiedStack.Screen>
    </CertifiedStack.Navigator>
  );
};

const Calendar = () => {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          ...headerBaseConfig,
          headerLeft: () => <HeaderLeft icon={Icons.menu} />,
          headerRight: () => <CalendarHeaderRight />,
        }}
      />
      <CalendarStack.Screen
        name="SCreateWorkout"
        component={CreateWorkoutScreen}
        options={{
          ...headerBaseConfig,
          headerLeft: () => <HeaderLeft icon={Icons.menu} />,
        }}
      />
      <CalendarStack.Screen
        name="SWorkout"
        component={WorkoutScreen}
        options={{
          ...headerBaseConfig,
          title: '',
          headerLeft: () => (
            <HeaderLeft title="Calendar" back icon={Icons.back} />
          ),
        }}
      />
      <CalendarStack.Screen
        name="AddToCalendar"
        component={AddToCalendarScreen}
        options={{
          ...headerBaseConfig,
          title: 'Workout',
          headerLeft: () => (
            <HeaderLeft title="Calendar" back icon={Icons.back} />
          ),
        }}
      />
    </CalendarStack.Navigator>
  );
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <Menu {...props} />}
      drawerContentOptions={{
        activeTintColor: theme.COLORS.TEXT,
        inactiveTintColor: theme.COLORS.TEXT,
        activeBackgroundColor: theme.COLORS.PRIMARY,
      }}>
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
      />
      <Drawer.Screen
        name="Messages"
        component={Chat}
      />
      <Drawer.Screen
        name="WorkoutManagement"
        component={WM}
      />
      <Drawer.Screen
        name="CertifiedWorkouts"
        component={Certified}
      />
      <Drawer.Screen
        name="Calendar"
        component={Calendar}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
      />
    </Drawer.Navigator>
  );
};

const Chat = () => {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="Trainer Chat"
        component={ChatsScreen}
        options={{
          ...headerBaseConfig,
          headerLeft: () => <HeaderLeft icon={Icons.menu} />,
        }}
      />
      <ChatStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          ...headerBaseConfig,
          headerLeft: () => <HeaderLeft title="" back icon={Icons.back} />,
        }}
      />
    </ChatStack.Navigator>
  );
};

const AppNavigation = () => {
  const {isLoading, userToken} = React.useContext(AuthContext);

  const linking = {
    prefixes: ['ironbuffetapp://'],
  };
  return (
    <NavigationContainer linking={linking}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {isLoading ? (
          <RootStack.Screen name="CheckAuth" component={CheckAuthScreen} />
        ) : userToken === null ? (
          <RootStack.Screen name="Auth" component={Auth} />
        ) : (
          <RootStack.Screen name="Drawer" component={DrawerNav} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
