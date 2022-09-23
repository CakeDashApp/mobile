import { useState, useEffect, useRef } from "react";
import { InteractionManager } from "react-native";
import { TransitioningView } from "react-native-reanimated";

export const useAfterInteractions = () => {
  const [interactionsComplete, setInteractionsComplete] = useState(false);

  const subscriptionRef = useRef(null);

  const transitionRef = useRef<TransitioningView>(null);

  useEffect(() => {
    const setSubscriptionRef = async () => {
      subscriptionRef.current = await InteractionManager.runAfterInteractions(
        () => {
          transitionRef.current?.animateNextTransition();
          setInteractionsComplete(true);
          subscriptionRef.current = null;
        }
      );
    };
    setSubscriptionRef();
  }, []);

  return {
    interactionsComplete,
    transitionRef,
  };
};
