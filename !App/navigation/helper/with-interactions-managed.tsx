import React, { ComponentType } from "react";
import { Transition, Transitioning } from "react-native-reanimated";
import { useAfterInteractions } from "./use-after-interaction";

export function withInteractionsManaged<Props>(
  Component: ComponentType<Props>,
  Placeholder: ComponentType | null = null
) {
  return (props: Props) => {
    const { transitionRef, interactionsComplete } = useAfterInteractions();
    return (
      <Transitioning.View
        transition={
          <Transition.Together>
            <Transition.Change interpolation="easeInOut" />
            <Transition.In type="fade" />
          </Transition.Together>
        }
        style={{ flex: 1 }}
        ref={transitionRef}
      >
        {interactionsComplete ? (
          <Component {...props} />
        ) : (
          Placeholder && <Placeholder />
        )}
      </Transitioning.View>
    );
  };
}
