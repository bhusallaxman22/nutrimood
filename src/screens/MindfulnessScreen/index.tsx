import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Button from "../../components/atoms/Button";
import GlassCard from "../../components/molecules/GlassCard";
import { GlassBackground } from "../../components/templates/GlassBackground";
import { colors } from "../../theme/materialDesign";

import { styles } from "./styles";
import { MindfulnessSession } from "./types";
import {
    createAffirmationChangeAnimation,
    createAffirmationShowAnimation,
    createAnimationInterpolations,
    createBreathingAnimation,
    createCardScaleAnimation,
    createCompletionAnimation,
    createPanResponder,
    createParticlePositions,
    formatTime,
    getPhaseInstruction,
    sessions,
    startParticleAnimations,
    startPulseAnimation,
    startRotationAnimation,
} from "./utils";

const MindfulnessScreen: React.FC = () => {
  const [selectedSession, setSelectedSession] =
    useState<MindfulnessSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<
    "inhale" | "hold" | "exhale"
  >("inhale");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentAffirmation, setCurrentAffirmation] = useState("");
  const [favoritesList, setFavoritesList] = useState<string[]>([]);
  const [showTips, setShowTips] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);

  // const scaleAnim = useRef(new Animated.Value(0.8)).current; // Reserved for future scale effects (currently unused)
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const breathingAnim = useRef(new Animated.Value(0)).current;
  const affirmationAnim = useRef(new Animated.Value(0)).current;
  const cardScaleAnims = useRef(
    sessions.map(() => new Animated.Value(1))
  ).current;
  const particleAnims = useRef(
    Array.from({ length: 20 }, () => new Animated.Value(0))
  ).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const completionAnim = useRef(new Animated.Value(0)).current;
  const tipsPanAnim = useRef(new Animated.ValueXY()).current;

  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const affirmationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const animationLoop = useRef<Animated.CompositeAnimation | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  // Pan responder for interactive tips card
  const tipsPanResponder = useRef(createPanResponder(tipsPanAnim)).current;

  // Start looping background animations
  useEffect(() => {
    startRotationAnimation(rotationAnim);
    startParticleAnimations(particleAnims);
    startPulseAnimation(pulseAnim);

    return () => {
      if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
      if (phaseTimerRef.current) clearInterval(phaseTimerRef.current);
      if (affirmationTimerRef.current)
        clearInterval(affirmationTimerRef.current);
      animationLoop.current?.stop();
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, [rotationAnim, particleAnims, pulseAnim]);

  const toggleFavorite = (sessionId: string) => {
    setInteractionCount((prev) => prev + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    setFavoritesList((prev) => {
      const isFavorite = prev.includes(sessionId);
      if (isFavorite) {
        return prev.filter((id) => id !== sessionId);
      } else {
        return [...prev, sessionId];
      }
    });

    // Animate the card
    const sessionIndex = sessions.findIndex((s) => s.id === sessionId);
    if (sessionIndex !== -1) {
      createCardScaleAnimation(
        cardScaleAnims[sessionIndex],
        !favoritesList.includes(sessionId)
      ).start();
    }
  };

  const handleCardPress = (session: MindfulnessSession) => {
    setInteractionCount((prev) => prev + 1);
    const sessionIndex = sessions.findIndex((s) => s.id === session.id);

    createCardScaleAnimation(cardScaleAnims[sessionIndex], false).start(() => {
      startSession(session);
    });
  };

  const showCompletionAnimation = () => {
    setSessionCompleted(true);
    createCompletionAnimation(completionAnim).start(() => {
      setSessionCompleted(false);
    });

    // Celebration haptics
    setTimeout(
      () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
      100
    );
    setTimeout(
      () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
      300
    );
    setTimeout(
      () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
      500
    );
  };

  const startSession = async (session: MindfulnessSession) => {
    setSelectedSession(session);
    setIsPlaying(true);
    setTimeRemaining(session.duration);
    setCurrentPhase("inhale");
    setCurrentAffirmation(session.affirmations[0]);

    // Load & play background music
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync(
        require("../../../assets/audio/music.mp3"),
        { isLooping: true, volume: 0.35 }
      );
      soundRef.current = sound;
      await sound.playAsync();
    } catch (e) {
      console.warn("Failed to load mindfulness background audio", e);
    }

    // Start session timer
    sessionTimerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          endSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000) as unknown as NodeJS.Timeout;

    // Start affirmation rotation
    let affirmationIndex = 0;
    const showNextAffirmation = () => {
      createAffirmationChangeAnimation(affirmationAnim).start(() => {
        affirmationIndex = (affirmationIndex + 1) % session.affirmations.length;
        setCurrentAffirmation(session.affirmations[affirmationIndex]);
        createAffirmationShowAnimation(affirmationAnim).start();
      });
    };

    affirmationTimerRef.current = setInterval(
      showNextAffirmation,
      10000
    ) as unknown as NodeJS.Timeout;
    createAffirmationShowAnimation(affirmationAnim).start();

    // Start breathing animation
    startBreathingCycle(session);
  };

  const startBreathingCycle = (session: MindfulnessSession) => {
    const { inhale, hold, exhale } = session.breathingPattern;
    const totalCycleTime = inhale + hold + exhale;

    animationLoop.current = createBreathingAnimation(breathingAnim, session);

    const phaseUpdater = () => {
      setCurrentPhase("inhale");
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setTimeout(() => {
        setCurrentPhase("hold");
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setTimeout(() => {
          setCurrentPhase("exhale");
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }, hold * 1000);
      }, inhale * 1000);
    };

    phaseUpdater();
    const phaseInterval = setInterval(phaseUpdater, totalCycleTime * 1000);
    if (phaseTimerRef.current) clearInterval(phaseTimerRef.current);
    phaseTimerRef.current = phaseInterval as unknown as NodeJS.Timeout;

    animationLoop.current.start();
  };

  const endSession = async () => {
    setIsPlaying(false);

    // Show completion animation if session finished naturally
    if (timeRemaining <= 1) {
      showCompletionAnimation();
    }

    setSelectedSession(null);

    if (sessionTimerRef.current) clearInterval(sessionTimerRef.current);
    if (phaseTimerRef.current) clearTimeout(phaseTimerRef.current);
    if (affirmationTimerRef.current) clearInterval(affirmationTimerRef.current);
    animationLoop.current?.stop();

    // Stop and unload audio
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      } catch (e) {
        console.warn("Failed to stop mindfulness audio", e);
      }
      soundRef.current = null;
    }

    // Reset animations
    breathingAnim.setValue(0);
    affirmationAnim.setValue(0);

    // Completion haptic feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  // Create interpolations
  const {
    rotateInterpolate,
    breathingScale,
    breathingOpacity,
    affirmationOpacity,
    affirmationTranslateY,
    completionScale,
    completionOpacity,
  } = createAnimationInterpolations(
    rotationAnim,
    breathingAnim,
    affirmationAnim,
    completionAnim
  );

  // Create particle positions
  const particlePositions = createParticlePositions(particleAnims);

  if (selectedSession && isPlaying) {
    return (
      <GlassBackground gradient={colors.gradients.cosmic}>
        <StatusBar barStyle="light-content" />

        {/* Floating particles for ambiance */}
        <View style={styles.particleContainer}>
          {particlePositions.map((particle, index) => (
            <Animated.View
              key={index}
              style={[
                styles.particle,
                {
                  opacity: particle.opacity,
                  transform: [
                    { translateX: particle.translateX },
                    { translateY: particle.translateY },
                    { scale: pulseAnim },
                  ],
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.sessionContainer}>
          <View style={styles.sessionHeader}>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={() => toggleFavorite(selectedSession.id)}
            >
              <Text style={styles.favoriteIcon}>
                {favoritesList.includes(selectedSession.id) ? "❤️" : "🤍"}
              </Text>
            </TouchableOpacity>
            <Text style={styles.sessionTitle}>{selectedSession.title}</Text>
            <TouchableOpacity
              style={styles.progressContainer}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setInteractionCount((prev) => prev + 1);
              }}
            >
              <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
              <View style={styles.progressBar}>
                <Animated.View
                  style={[
                    styles.progressFill,
                    {
                      width: `${
                        ((selectedSession.duration - timeRemaining) /
                          selectedSession.duration) *
                        100
                      }%`,
                    },
                  ]}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.breathingContainer}>
            <Animated.View
              style={[
                styles.breathingBackground,
                {
                  transform: [{ rotate: rotateInterpolate }],
                },
              ]}
            >
              <View style={styles.breathingGradient} />
            </Animated.View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                setInteractionCount((prev) => prev + 1);
              }}
            >
              <Animated.View
                style={[
                  styles.breathingCircle,
                  {
                    transform: [{ scale: breathingScale }],
                    opacity: breathingOpacity,
                  },
                ]}
              >
                <Text style={styles.breathingEmoji}>
                  {selectedSession.emoji}
                </Text>
                <View style={styles.rippleContainer}>
                  <Animated.View
                    style={[
                      styles.ripple,
                      { transform: [{ scale: breathingAnim }] },
                    ]}
                  />
                  <Animated.View
                    style={[
                      styles.ripple2,
                      { transform: [{ scale: breathingAnim }] },
                    ]}
                  />
                </View>
              </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.phaseContainer}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setInteractionCount((prev) => prev + 1);
              }}
            >
              <Text style={styles.phaseInstruction}>
                {getPhaseInstruction(currentPhase, selectedSession)}
              </Text>
              <Text style={styles.phaseText}>{currentPhase.toUpperCase()}</Text>
            </TouchableOpacity>
          </View>

          <Animated.View
            style={[
              styles.affirmationContainer,
              {
                opacity: affirmationOpacity,
                transform: [{ translateY: affirmationTranslateY }],
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setInteractionCount((prev) => prev + 1);
              }}
            >
              <Text style={styles.affirmationText}>{currentAffirmation}</Text>
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.sessionControls}>
            <TouchableOpacity
              style={styles.pauseButton}
              onPress={() => {
                setIsPlaying(!isPlaying);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
            >
              <Text style={styles.pauseButtonText}>
                {isPlaying ? "⏸️" : "▶️"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stopButton} onPress={endSession}>
              <Text style={styles.stopButtonText}>Stop Session</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Completion animation overlay */}
        {sessionCompleted && (
          <Animated.View
            style={[
              styles.completionOverlay,
              {
                opacity: completionOpacity,
                transform: [{ scale: completionScale }],
              },
            ]}
          >
            <Text style={styles.completionText}>🎉</Text>
            <Text style={styles.completionMessage}>Session Complete!</Text>
            <Text style={styles.completionSubtext}>
              Well done on your mindfulness journey
            </Text>
          </Animated.View>
        )}
      </GlassBackground>
    );
  }

  return (
    <GlassBackground gradient={colors.gradients.cosmic}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Mindfulness Sessions</Text>
          <Text style={styles.subtitleText}>
            Take a moment to breathe and center yourself
          </Text>
          <TouchableOpacity
            style={styles.statsContainer}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              setInteractionCount((prev) => prev + 1);
            }}
          >
            <Text style={styles.statsText}>
              ✨ {interactionCount} interactions today
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sessionsGrid}>
          {sessions.map((session, index) => (
            <Animated.View
              key={session.id}
              style={[{ transform: [{ scale: cardScaleAnims[index] }] }]}
            >
              <GlassCard style={styles.sessionCard}>
                <TouchableOpacity
                  style={styles.cardFavoriteButton}
                  onPress={() => toggleFavorite(session.id)}
                >
                  <Text style={styles.cardFavoriteIcon}>
                    {favoritesList.includes(session.id) ? "❤️" : "🤍"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.sessionCardContent}
                  onPress={() => handleCardPress(session)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.sessionEmoji}>{session.emoji}</Text>
                  <Text style={styles.sessionCardTitle}>{session.title}</Text>
                  <Text style={styles.sessionDescription}>
                    {session.description}
                  </Text>
                  <Text style={styles.sessionDuration}>
                    {Math.floor(session.duration / 60)} minutes
                  </Text>

                  <View style={styles.sessionMetrics}>
                    <Text style={styles.metricText}>
                      💨 {session.breathingPattern.inhale}-
                      {session.breathingPattern.hold}-
                      {session.breathingPattern.exhale}
                    </Text>
                    <Text style={styles.metricText}>
                      💭 {session.affirmations.length} affirmations
                    </Text>
                  </View>
                </TouchableOpacity>

                <Button
                  title="Start Session"
                  onPress={() => handleCardPress(session)}
                  style={styles.startButton}
                />
              </GlassCard>
            </Animated.View>
          ))}
        </View>

        <Animated.View
          style={[
            styles.tipsCard,
            {
              transform: [
                { translateX: tipsPanAnim.x },
                { translateY: tipsPanAnim.y },
              ],
            },
          ]}
          {...tipsPanResponder.panHandlers}
        >
          <GlassCard style={styles.tipsCardInner}>
            <TouchableOpacity
              onPress={() => {
                setShowTips(!showTips);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }}
            >
              <Text style={styles.tipsTitle}>
                💡 Mindfulness Tips {showTips ? "⬆️" : "⬇️"}
              </Text>
              {showTips && (
                <Text style={styles.tipsText}>
                  • Find a quiet, comfortable space{"\n"}• Sit with your back
                  straight{"\n"}• Close your eyes or soften your gaze{"\n"}•
                  Focus on your breath and the present moment{"\n"}• It&apos;s normal
                  for your mind to wander - gently return to your breath{"\n"}•
                  Try to practice at the same time each day{"\n"}• Start with
                  shorter sessions and gradually increase duration
                </Text>
              )}
            </TouchableOpacity>
          </GlassCard>
        </Animated.View>

        {favoritesList.length > 0 && (
          <GlassCard style={styles.favoritesSection}>
            <Text style={styles.favoritesTitle}>❤️ Your Favorites</Text>
            <View style={styles.favoritesList}>
              {favoritesList.map((sessionId) => {
                const session = sessions.find((s) => s.id === sessionId);
                return session ? (
                  <TouchableOpacity
                    key={sessionId}
                    style={styles.favoriteItem}
                    onPress={() => handleCardPress(session)}
                  >
                    <Text style={styles.favoriteEmoji}>{session.emoji}</Text>
                    <Text style={styles.favoriteText}>{session.title}</Text>
                  </TouchableOpacity>
                ) : null;
              })}
            </View>
          </GlassCard>
        )}
      </ScrollView>
    </GlassBackground>
  );
};

export default MindfulnessScreen;
