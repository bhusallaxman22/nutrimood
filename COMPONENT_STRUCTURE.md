# Project Structure Documentation

## Overview
This project has been reorganized to follow a clean and modular architecture with separate directories for component organization, utilities, models, and styles.

## Directory Structure

### `/src` Directory
- **`/components`** - Application-specific components organized by atomic design principles
- **`/screens`** - Screen components with their own directory structure
- **`/navigation`** - Navigation setup and configuration with directory structure
- **`/utils`** - Utility functions and helper methods
- **`/models`** - TypeScript interfaces and type definitions
- **`/styles`** - Reusable style objects and style utilities

### `/components` Directory (Expo/React Native base components)
- **`/ThemedText`** - Themed text component with directory structure
- **`/ThemedView`** - Themed view component with directory structure
- **`/ui`** - UI-specific components

## Screen Organization

### Each Screen Directory Contains:
- **`index.tsx`** - Main screen implementation
- **`types.ts`** - TypeScript interfaces and types for the screen
- **`utils.ts`** - Screen-specific utility functions and business logic
- **`styles.ts`** - Screen-specific styles

### Reorganized Screens (`/src/screens`)

#### Completed Reorganizations:
- **`LoginScreen/`** - User authentication login interface
- **`SignUpScreen/`** - User registration interface  
- **`HomeScreen/`** - Main dashboard and mood tracking
- **`ProfileScreen/`** - User profile management and settings
- **`DashboardScreen/`** - Mood analytics and overview
- **`MindfulnessScreen/`** - Meditation and breathing exercises
- **`SettingsScreen/`** - App settings and account management
- **`OnboardingScreen/`** - First-time user onboarding flow
- **`MoodTrendsScreen/`** - Detailed mood analytics with interactive charts
- **`NewSuggestionScreen/`** - AI-powered nutrition suggestion generation
- **`SuggestionScreen/`** - Individual suggestion viewing and management
- **`SuggestionsHistoryScreen/`** - Historical suggestions management with filtering
- **`SocialScreen/`** - Community social feed with posts and reactions

#### Pending Reorganizations:
✅ All screens have been successfully reorganized!

## Navigation Organization

### Each Navigation Directory Contains:
- **`index.tsx`** - Main navigation implementation
- **`types.ts`** - Navigation-related type definitions
- **`utils.ts`** - Navigation utility functions (when needed)
- **`styles.ts`** - Navigation-specific styles (when needed)

### Reorganized Navigation (`/src/navigation`)
- **`AppNavigator/`** - Main app navigation structure
- **`TabNavigator/`** - Bottom tab navigation configuration

## Component Organization

### Each Component Directory Contains:
- **`index.tsx`** - Main component implementation
- **`types.ts`** - TypeScript interfaces and types for the component
- **`utils.ts`** - Component-specific utility functions (when needed)
- **`styles.ts`** - Component-specific styles

### Component Categories

#### Atoms (`/src/components/atoms`)
Basic building blocks of the UI:
- **`Button/`** - Primary button component with variants
- **`Input/`** - Input field component with validation
- **`MarkdownRenderer/`** - Markdown content renderer
- **`MaterialButton/`** - Material design button component

#### Molecules (`/src/components/molecules`)
Combinations of atoms that form functional components:
- **`GlassCard/`** - Glass morphism card component
- **`GoalSelector/`** - Goal selection interface
- **`MoodSelector/`** - Mood selection interface

#### Organisms (`/src/components/organisms`)
Complex components that combine molecules and atoms:
- **`MoodAndGoalForm/`** - Complete form combining mood and goal selectors

#### Templates (`/src/components/templates`)
Page-level components that define layout (currently empty, ready for future components)

## Screen Organization (`/src/screens`)

### Each Screen Directory Contains:
- **`index.tsx`** - Main screen component implementation
- **`types.ts`** - TypeScript interfaces and navigation types
- **`utils.ts`** - Screen-specific utility functions and business logic
- **`styles.ts`** - Screen-specific styles

### Screen Categories
- **`LoginScreen/`** - User authentication and login
- **`HomeScreen/`** - Main dashboard and interaction hub (large screen with multiple utils)
- **Additional screens** - Following the same pattern

## Navigation Organization (`/src/navigation`)

### Navigation Structure:
- **`AppNavigator/`** - Main navigation setup and routing logic
- **`TabNavigator/`** - Bottom tab navigation configuration
- **`types.ts`** - Navigation parameter lists and types

### Each Navigator Directory Contains:
- **`index.tsx`** - Main navigator implementation
- **`types.ts`** - Navigator-specific types
- **`utils.ts`** - Navigation utility functions and configurations
- **`styles.ts`** - Navigator-specific styles

## Utility Functions (`/src/utils/index.ts`)

### Validation Utilities
- `validateEmail(email: string): boolean`
- `validatePassword(password: string): boolean`
- `validateRequired(value: string): boolean`

### Date Utilities
- `formatDate(date: Date): string`
- `formatTime(date: Date): string`
- `formatDateTime(date: Date): string`
- `isToday(date: Date): boolean`

### String Utilities
- `capitalize(str: string): string`
- `truncate(str: string, maxLength: number): string`

### Array Utilities
- `shuffleArray<T>(array: T[]): T[]`
- `removeDuplicates<T>(array: T[]): T[]`

### Mood Utilities
- `getMoodEmoji(mood: string): string`

### Other Utilities
- `generateId(): string`

## Models (`/src/models/index.ts`)

### Core Types
- `User` - User account information
- `MoodEntry` - User mood tracking data
- `MoodNutrition` - Nutrition recommendations for moods
- `Goal` - User goals and objectives
- `NutritionSuggestion` - AI-generated nutrition suggestions
- `ApiResponse<T>` - Standard API response wrapper
- `ThemeColors` - Theme color definitions
- `FormField` - Form field state management

## Styles (`/src/styles/index.ts`)

### Layout Styles
- Container and positioning utilities
- Flexbox helper classes
- Sizing utilities

### Spacing Styles
- Margin and padding variants
- Consistent spacing system

### Text Styles
- Typography hierarchy
- Text alignment and weight utilities
- Color variants

### Component Styles
- Card style variants
- Button style presets
- Input field styles

### Utility Functions
- `createShadowStyle(elevation: number)` - Generate shadow styles
- `createBorderStyle(color: string, width: number)` - Generate border styles
- `createBackgroundGradient(colors: string[])` - Generate gradient configurations

## Usage Examples

### Importing Components
```typescript
// From src/components
import { Button, Input, GlassCard, MoodAndGoalForm } from '@/src/components';

// From main components
import { ThemedText, ThemedView } from '@/components';

// From screens
import { LoginScreen, HomeScreen } from '@/src/screens';

// From navigation
import { AppNavigator, TabNavigator } from '@/src/navigation';
```

### Using Screen Components
```typescript
import { LoginScreen } from '@/src/screens';
import { LoginFormData, validateLoginForm } from '@/src/screens/LoginScreen/utils';

const formData: LoginFormData = {
  email: 'user@example.com',
  password: 'password123'
};

const isValid = validateLoginForm(formData.email, formData.password);
```

### Using Navigation
```typescript
import { AppNavigator } from '@/src/navigation';
import { RootStackParamList } from '@/src/navigation/types';

// Navigation component is ready to use with proper typing
<AppNavigator />
```

### Using Utilities
```typescript
import { validateEmail, formatDate, capitalize } from '@/src/utils';

const isValid = validateEmail('user@example.com');
const formattedDate = formatDate(new Date());
const capitalizedText = capitalize('hello world');
```

### Using Models
```typescript
import { User, MoodEntry, ApiResponse } from '@/src/models';

const user: User = {
  id: '1',
  email: 'user@example.com',
  name: 'John Doe',
  createdAt: new Date(),
  updatedAt: new Date(),
};
```

## Project Reorganization Progress

### ✅ Completed Reorganizations

#### Components (All Complete)
- **Atoms**: Button, Input, MarkdownRenderer, MaterialButton
- **Molecules**: GlassCard, GoalSelector, MoodSelector  
- **Organisms**: MoodAndGoalForm
- **Base Components**: ThemedText, ThemedView, IconSymbol

#### Navigation (All Complete)
- **AppNavigator**: Main app navigation with proper types and utilities
- **TabNavigator**: Bottom tab navigation with configuration

#### Screens (8 of 13 Complete)
- **LoginScreen**: Authentication with form validation
- **SignUpScreen**: User registration with validation
- **HomeScreen**: Main dashboard with mood tracking
- **ProfileScreen**: User profile management (complex refactor)
- **DashboardScreen**: Analytics and mood overview
- **MindfulnessScreen**: Meditation and breathing exercises (large screen)
- **SettingsScreen**: App settings and account management
- **OnboardingScreen**: First-time user experience

#### Core Infrastructure (All Complete)
- **Utilities**: Common functions (validation, date, string utils)
- **Models**: TypeScript interfaces and types
- **Styles**: Reusable style utilities and theme functions
- **Index Files**: Comprehensive exports for easy imports

### ⏳ Pending Reorganizations (5 remaining)
- **MoodTrendsScreen**: Detailed mood analytics (very large, complex animations)
- **NewSuggestionScreen**: AI suggestion generation
- **SuggestionScreen**: View and manage suggestions
- **SuggestionsHistoryScreen**: Historical suggestions view
- **SocialScreen**: Community features

### 📈 Benefits Achieved
1. **Improved Maintainability**: Modular structure with clear separation of concerns
2. **Better Type Safety**: Comprehensive TypeScript interfaces throughout
3. **Enhanced Reusability**: Utility functions and components are easily shared
4. **Cleaner Imports**: Centralized index files for simplified imports
5. **Consistent Patterns**: Every component/screen follows the same structure
6. **Easier Testing**: Logic separated into testable utility functions
7. **Better Documentation**: Self-documenting code structure

### 🚀 Next Steps
1. Complete reorganization of remaining 5 screens
2. Add unit tests for utility functions
3. Implement component storybook for design system
4. Add performance optimizations
5. Consider adding feature-based organization as the app grows

This modular architecture provides a scalable foundation that will support the application's growth while maintaining code quality and developer experience.

### Using Styles
```typescript
import { layoutStyles, textStyles, spacingStyles } from '@/src/styles';

<View style={[layoutStyles.container, spacingStyles.paddingLg]}>
  <Text style={[textStyles.h1, textStyles.textCenter]}>
    Welcome
  </Text>
</View>
```

## Benefits of This Structure

1. **Modularity** - Each component is self-contained with its own types, styles, and utilities
2. **Reusability** - Components can be easily imported and reused across the application
3. **Maintainability** - Clear separation of concerns makes the codebase easier to maintain
4. **Scalability** - The atomic design structure scales well as the application grows
5. **Type Safety** - Comprehensive TypeScript definitions ensure type safety
6. **Consistency** - Shared utilities and styles promote consistency across the application

## Future Enhancements

1. **Storybook Integration** - Document and test components in isolation
2. **Component Testing** - Add unit tests for each component directory
3. **Theme System** - Expand the theme system for better customization
4. **Animation Library** - Add shared animation utilities
5. **Accessibility** - Enhance accessibility features across all components

## SocialScreen Detailed Structure

The **`SocialScreen/`** is a complex social feed component with the following modular structure:

#### Files:
- **`index.tsx`** - Main social feed implementation with real-time updates
- **`types.ts`** - Social-specific interfaces including:
  - `SocialScreenProps` - Screen component props
  - `PostCardProps` - Individual post component props  
  - `SocialScreenState` - State management interfaces
  - `AnimationRefs` - Animation value references
  - `PostActions` - Action handler interfaces
  - `REACTION_EMOJIS` - Available reaction emojis
- **`utils.ts`** - Social feed utility functions:
  - `formatTimeAgo()` - Convert timestamps to human-readable format
  - `createPost()` - Handle post creation with validation
  - `addReaction()` - Add emoji reactions to posts
  - `setupFeedUpdates()` - Configure real-time feed updates
  - `handleRefresh()` - Handle pull-to-refresh functionality
- **`styles.ts`** - Responsive social feed styles with improved viewport
- **`components.tsx`** - Modular sub-components:
  - `PostCard` - Individual post display with reactions

#### Key Features:
- Real-time social feed updates
- Emoji reaction system
- Post creation with character limits
- Pull-to-refresh functionality
- Animated entrance effects
- Responsive design optimizations
