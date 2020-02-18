/**
 * Libraries
 */
import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer'
/**
 * Components
 */
import DrawerLabel from './components/DrawerLabel'
import HeaderLeft from './components/HeaderLeft'
import ProfileHeaderRight from './components/ProfileHeaderRight'
import EditProfileHeaderRight from './components/EditProfileHeaderRight'
import CalendarHeaderRight from './components/CalendarHeaderRight'

/**
 * Configs
 */
import theme from '../constants/Theme'
import Menu from './Menu'
import { Icons, LINKS } from '../constants'

/**
 * Screens
 */
import BillingInformationScreen from '../screens/BillingInformation'
import ChangePasswordScreen from '../screens/ChangePassword'
import AddToCalendarScreen from '../screens/AddToCalendar'
import CreateWorkoutScreen from '../screens/CreateWorkout'
import EditProfileScreen from '../screens/EditProfile'
import AlertTrialScreen from '../screens/AlertTrial'
import DashboardScreen from '../screens/Dashboard'
import CheckAuthScreen from '../screens/CheckAuth'
import WorkoutsScreen from '../screens/Workouts'
import RegisterScreen from '../screens/Register'
import CalendarScreen from '../screens/Calendar'
import WorkoutScreen from '../screens/Workout'
import ProfileScreen from '../screens/Profile'
import LogoutScreen from '../screens/Logout'
import LoginScreen from '../screens/Login'
import PartsScreen from '../screens/Parts'

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
    fontFamily: theme.FONT_FAMILY.REGULAR
  },
};

const WorkoutManagementStack = createStackNavigator({
  WMParts: {
    screen: (props) => (<PartsScreen path="WMWorkouts" {...props} />),
    navigationOptions: () => ({
      ...headerBaseConfig,
      headerTitle: 'Workout Management',
      headerLeft: () => (<HeaderLeft icon={Icons.menu} />)
    })
  },
  WMWorkouts: {
    screen: (props) => (<WorkoutsScreen
      workoutPath="WMWorkout"
      createWorkoutPath="WMCreateWorkout"
      url={LINKS.WORKOUT_INDEX}
      {...props} />),
    navigationOptions: () => ({
      ...headerBaseConfig,
      title: 'Workout Management',
      headerLeft: () => (<HeaderLeft title="Parts" back icon={Icons.back} />)
    })
  },
  WMWorkout: {
    screen: (props) => (<WorkoutScreen {...props} />),
    navigationOptions: () => ({
      ...headerBaseConfig,
      title: '',
      headerLeft: () => (<HeaderLeft title="Workout Management" back icon={Icons.back} />)
    })
  },
  WMCreateWorkout: {
    screen: (props) => (<CreateWorkoutScreen workoutPath="WMWorkout" {...props} />),
    navigationOptions: () => ({
      ...headerBaseConfig,
      title: 'Create',
      headerLeft: () => (<HeaderLeft title="Workouts" back icon={Icons.back} />),
      mode: 'modal'
    })
  }
});

const CertifiedStack = createStackNavigator({
  CParts: {
    screen: (props) => (<PartsScreen path="CWorkouts" {...props} />),
    navigationOptions: () => ({
      ...headerBaseConfig,
      headerTitle: 'Certified Workouts',
      headerLeft: () => (<HeaderLeft icon={Icons.menu} />)
    })
  },
  CWorkouts: {
    screen: (props) => (<WorkoutsScreen
      workoutPath="CWorkout"
      url={LINKS.WORKOUT_CERTIFIED}
      createWorkoutPath="CCreateWorkout"
      {...props} />),
    navigationOptions: () => ({
      ...headerBaseConfig,
      title: 'Certified Workouts',
      headerLeft: () => (<HeaderLeft title="Parts" back icon={Icons.back} />)
    })
  },
  CWorkout: {
    screen: (props) => (<WorkoutScreen {...props} />),
    navigationOptions: () => ({
      ...headerBaseConfig,
      title: '',
      headerLeft: () => (<HeaderLeft title="Certified Workouts" back icon={Icons.back} />)
    })
  },
  CCreateWorkout: {
    screen: CreateWorkoutScreen,
    navigationOptions: () => ({
      ...headerBaseConfig,
      title: 'Create',
      headerLeft: () => (<HeaderLeft title="Certified Workouts" back icon={Icons.back} />),
      mode: 'modal'
    })
  }
});

const DashboardStack = createStackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: () => ({
      ...headerBaseConfig,
      headerLeft: () => (<HeaderLeft icon={Icons.menu} />)
    })
  },
  DCreateWorkout: {
    screen: CreateWorkoutScreen,
    navigationOptions: () => ({
      ...headerBaseConfig,
      title: 'Create',
      headerLeft: () => (<HeaderLeft title="Dashboard" back icon={Icons.back} />),
      mode: 'modal'
    })
  }
}, {
  mode: 'modal'
});

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: () => ({
      ...headerBaseConfig,
      title: 'Profile',
      headerLeft: () => (<HeaderLeft icon={Icons.menu} />),
      headerRight: () => (<ProfileHeaderRight />)
    })
  },
  EditProfile: {
    screen: EditProfileScreen,
    navigationOptions: () => ({
      ...headerBaseConfig,
      title: 'Edit',
      headerLeft: () => (<HeaderLeft title="Profile" back icon={Icons.back} />),
      headerRight: () => (<EditProfileHeaderRight />)
    })
  },
  ChangePassword: {
    screen: ChangePasswordScreen,
    navigationOptions: () => ({
      ...headerBaseConfig,
      title: 'Change Password',
      headerLeft: () => (<HeaderLeft title="Edit" back icon={Icons.back} />),
    })
  },
  BillingInformation: {
    screen: BillingInformationScreen,
    navigationOptions: () => ({
      ...headerBaseConfig,
      title: 'Billing Information',
      headerLeft: () => (<HeaderLeft title="Edit" back icon={Icons.back} />),
    })
  }
},
{
  mode: 'modal'
});

const CalendarStack = createStackNavigator({
  Calendar: {
    screen: CalendarScreen,
    navigationOptions: () => ({
      ...headerBaseConfig,
      headerLeft: () => (<HeaderLeft icon={Icons.menu} />),
      headerRight: () => (<CalendarHeaderRight />),
    })
  },
  SCreateWorkout: {
    screen: CreateWorkoutScreen,
    navigationOptions: () => ({
      ...headerBaseConfig,
      headerLeft: () => (<HeaderLeft icon={Icons.menu} />)
    })
  },
  SWorkout: {
    screen: (props) => (<WorkoutScreen {...props} />),
    navigationOptions: () => ({
      ...headerBaseConfig,
      title: '',
      headerLeft: () => (<HeaderLeft title="Calendar" back icon={Icons.back} />)
    })
  },
  AddToCalendar: {
    screen: AddToCalendarScreen,
    navigationOptions: () => ({
      ...headerBaseConfig,
      title: 'Workout',
      headerLeft: () => (<HeaderLeft title="Calendar" back icon={Icons.back} />),
    })
  }
}, {
  mode: 'modal',
  unmountInactiveRoutes: true,
});

const RegisterStack = createStackNavigator({
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      headerShown: false,
      cardStyle: {
        backgroundColor: theme.COLORS.APP_BG,
      }
    }
  }
});

const CheckAuthStack = createStackNavigator({
  CheckAuth: {
    screen: CheckAuthScreen,
    navigationOptions: {
      headerShown: false,
      cardStyle: {
        backgroundColor: theme.COLORS.APP_BG,
      }
    }
  }
});

const AlertStack = createStackNavigator({
  AlertTrial: {
    screen: AlertTrialScreen,
    navigationOptions: {
      headerShown: false,
      cardStyle: {
        backgroundColor: theme.COLORS.APP_BG,
      }
    }
  }
});

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
      cardStyle: {
        backgroundColor: theme.COLORS.APP_BG,
      }
    }
  }
});

const AppNavigator = createDrawerNavigator({
  CheckAuth: {
    screen: CheckAuthStack,
    navigationOptions: {
      drawerLabel: () => {},
      drawerLockMode: 'locked-closed'
    }
  },
  Alert: {
    screen: AlertStack,
    navigationOptions: {
      drawerLabel: () => {},
      drawerLockMode: 'locked-closed'
    }
  },
  Login: {
    screen: LoginStack,
    navigationOptions: {
      drawerLabel: () => {},
      drawerLockMode: 'locked-closed'
    }
  },
  Dashboard: {
    screen: DashboardStack,
    navigationOptions: {
      drawerLabel: ({focused}) => (
        <DrawerLabel
          focused={focused}
          icon={{name: 'home'}}
          title="Dashboard" />
      )
    }
  },
  WorkoutManagement: {
    screen: WorkoutManagementStack,
    navigationOptions: {
      drawerLabel: ({focused}) => (
        <DrawerLabel
          focused={focused}
          icon={{name: 'accessibility'}}
          title="Workout management" />
      )
    }
  },
  Certified: {
    screen: CertifiedStack,
    navigationOptions: {
      drawerLabel: ({focused}) => (
        <DrawerLabel
          focused={focused}
          icon={{name: 'group'}}
          title="Certified workouts" />
      )
    }
  },
  Calendar: {
    screen: CalendarStack,
    navigationOptions: {
      drawerLabel: ({focused}) => (
        <DrawerLabel
          focused={focused}
          icon={{name: 'schedule'}}
          title="Calendar" />
      )
    }
  },
  Logout: {
    screen: LogoutScreen,
    navigationOptions: {
      drawerLabel: () => {},
      drawerLockMode: 'locked-closed'
    }
  },
  Register: {
    screen: RegisterStack,
    navigationOptions: {
      drawerLabel: () => {},
      drawerLockMode: 'locked-closed'
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      drawerLabel: ({focused}) => (
        <DrawerLabel
          focused={focused}
          icon={{name: 'person'}}
          title="Profile" />
      )
    }
  },
},
  Menu);

export default createAppContainer(AppNavigator);
