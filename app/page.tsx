'use client';

import { useReducer, useCallback } from 'react';
import { gameReducer, getInitialState } from '@/lib/gameState';
import * as sounds from '@/lib/sounds';
import TitleScreen from '@/components/TitleScreen';
import IntroScreen from '@/components/IntroScreen';
import PartySelect from '@/components/PartySelect';
import TrailScreen from '@/components/TrailScreen';
import QuestionScreen from '@/components/QuestionScreen';
import ResultScreen from '@/components/ResultScreen';
import EventScreen from '@/components/EventScreen';
import DeathScreen from '@/components/DeathScreen';
import SuppliesScreen from '@/components/SuppliesScreen';
import RestingScreen from '@/components/RestingScreen';
import HuntingScreen from '@/components/HuntingScreen';
import GameOverScreen from '@/components/GameOverScreen';
import VictoryScreen from '@/components/VictoryScreen';

export default function Home() {
  const [state, dispatch] = useReducer(gameReducer, getInitialState());

  const handleTitleContinue = useCallback(() => {
    sounds.playStart();
    dispatch({ type: 'START_GAME' });
  }, []);

  const handleIntroContinue = useCallback(() => {
    sounds.playClick();
    dispatch({ type: 'SHOW_PARTY_SELECT' });
  }, []);

  const handlePartySubmit = useCallback((party: string[]) => {
    sounds.playSelect();
    dispatch({ type: 'SET_PARTY', party });
  }, []);

  const handleContinueTrail = useCallback(() => {
    sounds.playWagonMove();
    dispatch({ type: 'CONTINUE_TRAIL' });
  }, []);

  const handleRest = useCallback(() => {
    sounds.playRest();
    dispatch({ type: 'REST' });
  }, []);

  const handleFinishRest = useCallback(() => {
    dispatch({ type: 'FINISH_REST' });
  }, []);

  const handleHunt = useCallback(() => {
    sounds.playScanning();
    dispatch({ type: 'HUNT_VULNERABILITIES' });
  }, []);

  const handleFinishHunting = useCallback(() => {
    dispatch({ type: 'FINISH_HUNTING' });
  }, []);

  const handleSupplies = useCallback(() => {
    sounds.playClick();
    dispatch({ type: 'CHECK_SUPPLIES' });
  }, []);

  const handleCloseSupplies = useCallback(() => {
    sounds.playClick();
    dispatch({ type: 'CLOSE_SUPPLIES' });
  }, []);

  const handleGiveUp = useCallback(() => {
    sounds.playGameOver();
    dispatch({ type: 'GIVE_UP' });
  }, []);

  const handleAnswer = useCallback((answer: string) => {
    sounds.playSelect();
    dispatch({ type: 'ANSWER_QUESTION', answer });
  }, []);

  const handleDismissResult = useCallback(() => {
    // Play appropriate sound based on result
    if (state.lastAnswer?.correct) {
      sounds.playCorrect();
    } else {
      sounds.playWrong();
    }
    dispatch({ type: 'DISMISS_RESULT' });
  }, [state.lastAnswer]);

  const handleDismissEvent = useCallback(() => {
    if (state.currentEvent?.type === 'good') {
      sounds.playGoodEvent();
    } else if (state.currentEvent?.type === 'bad') {
      sounds.playBadEvent();
    } else if (state.currentEvent?.type === 'death') {
      sounds.playDysentery();
    }
    dispatch({ type: 'DISMISS_EVENT' });
  }, [state.currentEvent]);

  const handleDismissDeath = useCallback(() => {
    sounds.playClick();
    dispatch({ type: 'DISMISS_DEATH' });
  }, []);

  const handleRestart = useCallback(() => {
    sounds.playStart();
    dispatch({ type: 'RESTART' });
  }, []);

  // Render current screen
  switch (state.screen) {
    case 'title':
      return <TitleScreen onContinue={handleTitleContinue} />;

    case 'intro':
      return <IntroScreen onContinue={handleIntroContinue} />;

    case 'party':
      return <PartySelect onSubmit={handlePartySubmit} />;

    case 'trail':
      return (
        <TrailScreen
          state={state}
          onContinue={handleContinueTrail}
          onRest={handleRest}
          onHunt={handleHunt}
          onSupplies={handleSupplies}
          onGiveUp={handleGiveUp}
        />
      );

    case 'question':
      if (!state.currentQuestion) {
        return <TrailScreen
          state={state}
          onContinue={handleContinueTrail}
          onRest={handleRest}
          onHunt={handleHunt}
          onSupplies={handleSupplies}
          onGiveUp={handleGiveUp}
        />;
      }
      return (
        <QuestionScreen
          question={state.currentQuestion}
          onAnswer={handleAnswer}
        />
      );

    case 'result':
      if (!state.lastAnswer) {
        return <TrailScreen
          state={state}
          onContinue={handleContinueTrail}
          onRest={handleRest}
          onHunt={handleHunt}
          onSupplies={handleSupplies}
          onGiveUp={handleGiveUp}
        />;
      }
      return (
        <ResultScreen
          correct={state.lastAnswer.correct}
          explanation={state.lastAnswer.explanation}
          correctAnswer={state.lastAnswer.answer}
          onContinue={handleDismissResult}
        />
      );

    case 'event':
      if (!state.currentEvent) {
        return <TrailScreen
          state={state}
          onContinue={handleContinueTrail}
          onRest={handleRest}
          onHunt={handleHunt}
          onSupplies={handleSupplies}
          onGiveUp={handleGiveUp}
        />;
      }
      return (
        <EventScreen
          event={state.currentEvent}
          onContinue={handleDismissEvent}
        />
      );

    case 'death':
      if (!state.lastDeath) {
        return <TrailScreen
          state={state}
          onContinue={handleContinueTrail}
          onRest={handleRest}
          onHunt={handleHunt}
          onSupplies={handleSupplies}
          onGiveUp={handleGiveUp}
        />;
      }
      return (
        <DeathScreen
          name={state.lastDeath.name}
          message={state.lastDeath.message}
          onContinue={handleDismissDeath}
        />
      );

    case 'supplies':
      return <SuppliesScreen onClose={handleCloseSupplies} />;

    case 'resting':
      return <RestingScreen onFinish={handleFinishRest} />;

    case 'hunting':
      return <HuntingScreen onFinish={handleFinishHunting} />;

    case 'gameover':
      // Play game over sound when screen first shows
      return <GameOverScreen state={state} onRestart={handleRestart} />;

    case 'victory':
      return <VictoryScreen state={state} onRestart={handleRestart} />;

    default:
      return <TitleScreen onContinue={handleTitleContinue} />;
  }
}
