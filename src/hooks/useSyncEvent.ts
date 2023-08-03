"use client";

import { RefObject, useCallback, useEffect, useMemo, useRef, useSyncExternalStore } from "react";

export const useSyncEvent = <K extends keyof GlobalEventHandlersEventMap>(
  eventType: K,
  option?: {
    selector?: (event: GlobalEventHandlersEventMap[K]) => any;
    ref?: RefObject<HTMLElement>;
  }
) => {
  const eventRef = useRef<GlobalEventHandlersEventMap[K] | undefined>(undefined);

  const newDomEvent = useMemo(() => new Event(`newdomevent${eventType}`), [eventType]);

  const eventHandler = useCallback(
    (event: GlobalEventHandlersEventMap[K]) => {
      eventRef.current = event;
      dispatchEvent(newDomEvent);
    },
    [newDomEvent]
  );

  const subscribe = useCallback(
    (callback: () => void) => {
      addEventListener(`newdomevent${eventType}`, callback);
      return () => {
        removeEventListener(`newdomevent${eventType}`, callback);
      };
    },
    [eventType]
  );

  const getSnapshot = useCallback(() => {
    const selected =
      option?.selector && eventRef.current ? option?.selector(eventRef.current) : undefined;
    return selected ?? eventRef.current;
  }, [option]);

  const getServerSnapshot = useCallback(() => {
    return undefined;
  }, []);

  useEffect(() => {
    const element = option?.ref?.current;

    if (element) {
      element.addEventListener(eventType, eventHandler);

      return () => {
        element.removeEventListener(eventType, eventHandler);
      };
    } else {
      window.addEventListener(eventType, eventHandler);

      return () => {
        window.removeEventListener(eventType, eventHandler);
      };
    }
  }, [eventType, eventHandler, option]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
