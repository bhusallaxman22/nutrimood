# Firebase Setup Instructions

## Firestore Security Rules

To fix the "Missing or insufficient permissions" error, you need to update your Firestore security rules in the Firebase Console:

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`nutri-food-98d8e`)
3. Go to Firestore Database
4. Click on "Rules" tab
5. Replace the existing rules with the content from `firestore.rules` file
6. Click "Publish"

## Alternative: Test Mode (Development Only)

For development, you can temporarily set the rules to allow all reads and writes:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

⚠️ **Warning**: Never use these permissive rules in production!

## Fixing Navigation Issues

The app now registers all screens to prevent navigation errors. The key changes:

1. All screens are always registered in the navigator
2. Only the initial route changes based on auth state
3. Added proper auth guards in protected screens
4. Added fallback handling for missing chart libraries

## iOS Compatibility

Added proper iOS handling for:
- SafeAreaView for proper spacing
- KeyboardAvoidingView for form interactions
- ScrollView for content that might exceed screen height
- Platform-specific status bar handling
