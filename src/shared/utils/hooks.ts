import { RouteContext, routes } from "@/app/providers/RouteContext";
import { Keyboard } from "@capacitor/keyboard";
import { useCallback, useContext, useEffect, useState } from "react";
import { useErrorToast } from "./toastHooks";

export const useKeyboard = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  useEffect(() => {
    Keyboard.addListener("keyboardWillShow", openKeyBoard);
    Keyboard.addListener("keyboardWillHide", closeKeyBoard);
    function openKeyBoard() {
      setIsKeyboardOpen(true);
    }
    function closeKeyBoard() {
      setIsKeyboardOpen(false);
    }

    return () => {
      Keyboard.removeAllListeners();
    };
  }, []);
  return isKeyboardOpen;
};

export function useAsync<T extends any[], P>(
  cb: (...args: T) => Promise<P>,
  errorHandle?: (error: unknown) => unknown
) {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [data, setData] = useState<P>();
  const [error, setError] = useState<Error | unknown>();

  const showToast = useErrorToast();

  const call = useCallback(
    async (...args: T) => {
      try {
        setStatus("pending");
        const data = await cb(...args);
        setData(data);
        setStatus("success");
        return data;
      } catch (error) {
        setStatus("error");
        setError(error);
        if (errorHandle) {
          errorHandle(error);
        } else {
          showToast("Возникла ошибка, попробуйте позже");
        }
        throw error;
      }
    },
    [cb]
  );

  return { call, status, data, error };
}

export const useRelLinks = (links: string[], customRoute?: routes) => {
  const route = useContext(RouteContext);
  return links.map((link) => `/${customRoute || route}/${link}`);
};

interface ScrollProgress {
  totalHeight: number;
  visibleHeight: number;
  scrollProgress: number;
}

export const useScrollProgress = (
  containerRef: React.RefObject<HTMLDivElement>
): [ScrollProgress, () => void] => {
  const [scrollProgress, setScrollProgress] = useState<ScrollProgress>({
    totalHeight: 0,
    visibleHeight: 0,
    scrollProgress: 0,
  });

  const scrollContainerToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight - containerRef.current.clientHeight;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        const totalHeight = scrollHeight - clientHeight;
        const visibleHeight = scrollTop;
        const scrollProgress = (visibleHeight / totalHeight) * 100 || 0;

        setScrollProgress({
          totalHeight,
          visibleHeight,
          scrollProgress,
        });
      }
    };

    const handleResize = () => {
      scrollContainerToBottom();
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
      handleScroll();
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [containerRef]);

  return [scrollProgress, scrollContainerToBottom];
};
