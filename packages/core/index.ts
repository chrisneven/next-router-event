import { useEffect } from "react";
import { useRouter } from "next/router.js";

export type Event =
  | "routeChangeStart"
  | "routeChangeComplete"
  | "beforeHistoryChange"
  | "hashChangeStart"
  | "hashChangeComplete";

type DefaultArgs = [string, { shallow: boolean }];
type ErrorArgs = [Error, string, { shallow: boolean }];

export type RouterEventHook = {
  (type: Event, handler: (...args: DefaultArgs) => void): void;
  (type: "routeChangeError", handler: (...args: ErrorArgs) => void): void;
};

/**
 *
 * @param event router event type. Can be one of: "routeChangeStart", "routeChangeComplete", "beforeHistoryChange", "hashChangeStart", "hashChangeComplete".
 * @param handler handler to execute when the event happens. NOTE: make sure this function is referentially equal to avoid running the effect on every render, unless ofcourse it's on purpose.
 */
const useRouterEvent: RouterEventHook = <
  E extends Event,
  Handler extends () => void
>(
  event: E,
  handler: Handler
) => {
  const router = useRouter();

  useEffect(() => {
    router.events.on(event, handler);
    return () => router.events.off(event, handler);
  }, [event, handler, router.events]);
};

export default useRouterEvent;
