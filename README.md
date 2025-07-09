# Nutrition App

This is a React Native application built with Expo that helps users improve their mental and physical well-being by matching their emotions with food and nutrition suggestions. The app is designed using the atomic design principle for a modular and scalable UI.

## Core Features

- **Mood Input**: Users can manually input their mood or connect to wearables for automatic mood detection.
- **Nutrition Suggestions**: Personalized food and supplement suggestions based on the user's mood and goals.
- **Goal-Based Personalization**: Users can set goals like "Energize," "Calm," or "Focus" to receive tailored suggestions.
- **Feedback and Mood Tracking**: Users can provide feedback on the suggestions and track their mood over time.
- **Insights Dashboard**: A dashboard to visualize mood trends and the effectiveness of the suggestions.

## Tech Stack

- **Frontend**: React Native with Expo
- **UI**: Atomic Design
- **Backend**: Firebase (Authentication and Database)
- **AI**: OpenAI for personalized suggestions

## Project Structure

The project follows the atomic design methodology, with the UI components organized as follows:

- `src/components/atoms`: Basic building blocks of the UI (e.g., Button, Input, Text).
- `src/components/molecules`: Groups of atoms that form a more complex component (e.g., MoodSelector, GoalSelector).
- `src/components/organisms`: Combinations of molecules that create a section of the UI (e.g., MoodAndGoalForm).
- `src/components/templates`: The overall layout of a screen.
- `src/screens`: The different screens of the application.
- `src/navigation`: The navigation logic of the app.
- `src/services`: Services for interacting with APIs (e.g., Firebase, OpenAI).
- `src/store`: State management for the application.
- `src/theme`: The theme and styling of the app.
- `src/assets`: Images, fonts, and other assets.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Run the app**:
   ```bash
   npm start
   ```

## Roadmap

- [x] Set up the project with Expo.
- [x] Create the directory structure for atomic design.
- [x] Create atom components (`Button`, `Input`).
- [x] Create molecule components (`MoodSelector`, `GoalSelector`).
- [x] Create organism components (`MoodAndGoalForm`).
- [ ] Create the `HomeScreen`.
- [ ] Set up navigation.
- [ ] Update `App.tsx` to use the navigation.
- [ ] Set up Firebase for authentication and database.
- [ ] Integrate OpenAI for personalized suggestions.
- [ ] Create the `DashboardScreen`.
- [ ] Implement mood tracking and feedback.
- [ ] Connect to wearables for automatic mood detection.
