# StreamBox - Authentication Module

A complete authentication system for the StreamBox entertainment app built with Expo React Native and TypeScript.

## 🚀 Features

- ✅ **Complete TypeScript Implementation**
- ✅ **React Hook Form + Yup Validation**
- ✅ **DummyJSON API Integration**
- ✅ **AsyncStorage for Persistent Auth**
- ✅ **Auto-redirect Based on Auth State**
- ✅ **Beautiful UI with Feather Icons**
- ✅ **Login & Register Screens**
- ✅ **Secure Password Handling**
- ✅ **Type-safe Navigation**

## 📦 Dependencies Installed

```bash
npm install react-hook-form yup @hookform/resolvers axios @react-native-async-storage/async-storage
```

## 📁 Project Structure

```
StreamBox/
├── src/
│   ├── api/
│   │   └── authApi.ts              # API layer with DummyJSON integration
│   ├── storage/
│   │   └── authStorage.ts          # AsyncStorage wrapper for auth
│   ├── types/
│   │   └── auth.ts                 # TypeScript interfaces & types
│   ├── navigation/
│   │   ├── AuthStack.tsx           # Authentication stack navigator
│   │   ├── AppNavigator.tsx        # Root navigator with auth logic
│   │   └── index.tsx               # Original navigation (kept)
│   ├── screens/
│   │   ├── LoginScreen.tsx         # Login with validation
│   │   ├── RegisterScreen.tsx      # Register UI (demo)
│   │   └── HomeScreen.tsx          # Home with logout
│   ├── components/
│   │   └── CustomText.tsx          # Reusable text component
│   ├── assets/
│   ├── theme/
│   └── utils/
├── App.tsx                         # Main entry point
└── package.json
```

## 🔐 Authentication Flow

1. **App Startup**: `AppNavigator` checks AsyncStorage for saved user
2. **Not Authenticated**: Shows `AuthStack` (Login/Register screens)
3. **Login**: User enters credentials → API call → Save to AsyncStorage
4. **Authenticated**: Shows `HomeScreen` with user info
5. **Logout**: Clears AsyncStorage → Returns to Login

## 🎯 Key Components

### API Layer (`authApi.ts`)
- `login()` - Authenticates with DummyJSON API
- `verifyToken()` - Validates JWT tokens
- Full error handling with Axios

### Storage Layer (`authStorage.ts`)
- `saveUser()` - Saves user data and token
- `getUser()` - Retrieves user data
- `getToken()` - Retrieves auth token
- `logoutUser()` - Clears all auth data
- `isAuthenticated()` - Checks auth status

### Type Definitions (`types/auth.ts`)
```typescript
interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}
```

## 🧪 Demo Credentials

Use these credentials from DummyJSON to test login:

```
Username: emilys
Password: emilyspass
```

Other available users:
- Username: `michaelw` / Password: `michaelwpass`
- Username: `sophiab` / Password: `sophiabpass`

## 🎨 Form Validation

### Login Screen
- Username: Required, min 3 characters
- Password: Required, min 6 characters

### Register Screen (UI Only)
- Username: Required, 3-20 chars, alphanumeric + underscore
- Email: Required, valid email format
- Password: Required, min 6 chars, must contain case, lowercase, and number
- Confirm Password: Must match password

## 🚦 Running the App

```bash
cd StreamBox
npm start
```

Then:
- Press `a` for Android
- Press `i` for iOS (macOS only)
- Press `w` for web

## 🔄 Auto-Navigation

The app automatically handles navigation based on authentication state:
- Login success → Home Screen
- Logout → Login Screen
- App restart with saved session → Home Screen
- No saved session → Login Screen

## 🎨 UI Features

- Dark theme with consistent colors (#0f3460, #1a1a2e, #e94560)
- Feather icons throughout
- Password visibility toggle
- Loading states
- Error messages
- Responsive layouts
- KeyboardAvoidingView for mobile keyboards

## 📱 Screens

### LoginScreen
- Username/password inputs with icons
- Form validation with error messages
- Password show/hide toggle
- Loading indicator during login
- Demo credentials display
- Link to Register screen

### RegisterScreen
- Full registration form UI
- All form fields validated
- Shows demo message (no real registration)
- Link back to Login

### HomeScreen
- Welcome message with user's name
- Logout button in top-right
- Statistics cards
- Film icon and branding

## 🔧 Technical Details

- **Framework**: Expo with TypeScript
- **State Management**: React Hooks (useState, useEffect)
- **Forms**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **Navigation**: React Navigation v6
- **Icons**: Expo Vector Icons (Feather)

## 🛡️ Security Features

- Secure password input (hidden by default)
- Token-based authentication
- AsyncStorage for persistent sessions
- Error handling for failed requests
- Input validation before API calls

## 📝 TypeScript Coverage

100% TypeScript implementation:
- All files use `.tsx` or `.ts` extensions
- Strongly typed components and functions
- Type-safe navigation with parameter lists
- Interface definitions for all data structures
- No `any` types used

## 🐛 Error Handling

- Network errors caught and displayed
- Invalid credentials handling
- Storage errors logged
- Form validation errors shown inline
- User-friendly error messages

## 🎯 Next Steps

To extend this authentication module:

1. **Add Social Login**: Google, Facebook, Apple
2. **Implement Password Reset**: Forgot password flow
3. **Add Profile Screen**: Edit user information
4. **Token Refresh**: Automatic token renewal
5. **Biometric Auth**: Face ID / Touch ID
6. **Remember Me**: Optional persistence
7. **Multi-factor Auth**: SMS or email verification
8. **Real Backend**: Replace DummyJSON with your API

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup Validation](https://github.com/jquense/yup)
- [DummyJSON API](https://dummyjson.com/docs/auth)

---

**Built with ❤️ for StreamBox Entertainment App**
