'use client';

import { useReducer, useCallback, useEffect } from 'react';
import { gameReducer, getInitialState } from '@/lib/gameState';
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
    dispatch({ type: 'START_GAME' });
  }, []);

  const handleIntroContinue = useCallback(() => {
    dispatch({ type: 'SHOW_PARTY_SELECT' });
  }, []);

  const handlePartySubmit = useCallback((party: string[]) => {
    dispatch({ type: 'SET_PARTY', party });
  }, []);

  const handleContinueTrail = useCallback(() => {
    dispatch({ type: 'CONTINUE_TRAIL' });
  }, []);

  const handleRest = useCallback(() => {
    dispatch({ type: 'REST' });
  }, []);

  const handleFinishRest = useCallback(() => {
    dispatch({ type: 'FINISH_REST' });
  }, []);

  const handleHunt = useCallback(() => {
    dispatch({ type: 'HUNT_VULNERABILITIES' });
  }, []);

  const handleFinishHunting = useCallback(() => {
    dispatch({ type: 'FINISH_HUNTING' });
  }, []);

  const handleSupplies = useCallback(() => {
    dispatch({ type: 'CHECK_SUPPLIES' });
  }, []);

  const handleCloseSupplies = useCallback(() => {
    dispatch({ type: 'CLOSE_SUPPLIES' });
  }, []);

  const handleGiveUp = useCallback(() => {
    dispatch({ type: 'GIVE_UP' });
  }, []);

  const handleAnswer = useCallback((answer: string) => {
    dispatch({ type: 'ANSWER_QUESTION', answer });
  }, []);

  const handleDismissResult = useCallback(() => {
    dispatch({ type: 'DISMISS_RESULT' });
  }, []);

  const handleDismissEvent = useCallback(() => {
    dispatch({ type: 'DISMISS_EVENT' });
  }, []);

  const handleDismissDeath = useCallback(() => {
    dispatch({ type: 'DISMISS_DEATH' });
  }, []);

  const handleRestart = useCallback(() => {
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
      return <GameOverScreen state={state} onRestart={handleRestart} />;

    case 'victory':
      return <VictoryScreen state={state} onRestart={handleRestart} />;

    default:
      return <TitleScreen onContinue={handleTitleContinue} />;
  }
}
