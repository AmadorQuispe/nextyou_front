import { baseUrl } from "@/service/api";
import { useAuth } from "@clerk/clerk-react";
import { useCallback, useState, useEffect } from "react";

type SendMessagePayload = {
  sessionId?: string;
  content: string;
};

export function useStreamingChat() {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>();
  const [sessionIdJustCreated, setSessionIdJustCreated] = useState<
    string | null
  >(null);
  const [title, setTitle] = useState<string>();
  const [errors, setErrors] = useState<string[]>([]);
  const [controller, setController] = useState<AbortController | null>(null);
  const { getToken } = useAuth();

  useEffect(() => {
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [controller]);

  const resetSessionIdCreated = () => setSessionId(undefined);
  const markSessionRedirected = () => setSessionIdJustCreated(null);

  const resetSession = () => {
    setSessionId(undefined);
    setTitle(undefined);
    setResponse("");
  };

  const sendMessage = useCallback(
    async ({ sessionId: inputSessionId, content }: SendMessagePayload) => {
      setLoading(true);
      setResponse("");

      const abortController = new AbortController();
      setController(abortController);

      try {
        const token = await getToken();
        const url = inputSessionId
          ? `${baseUrl}/chat/${inputSessionId}`
          : `${baseUrl}/chat`;

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          credentials: "include",
          body: JSON.stringify({ message: content }),
          signal: abortController.signal,
        });

        if (!res.ok || !res.body) throw new Error("Stream failed to start");

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let fullText = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          let eventEnd;
          while ((eventEnd = buffer.indexOf("\n\n")) !== -1) {
            const eventData = buffer.substring(0, eventEnd);
            buffer = buffer.substring(eventEnd + 2);

            const lines = eventData.split("\n");
            let eventType = "";
            let eventContent = "";

            for (const line of lines) {
              if (line.startsWith("event:")) {
                eventType = line.substring(7).trim();
              } else if (line.startsWith("data:")) {
                eventContent = line.substring(5).trim();
              }
            }

            if (eventType === "session_id") {
              setSessionId(eventContent);
              setSessionIdJustCreated(eventContent);
            } else if (eventType === "title") {
              setTitle(eventContent);
            } else if (eventType === "delta" && eventContent) {
              try {
                const deltaData = JSON.parse(eventContent);
                if (deltaData && deltaData.c !== undefined) {
                  fullText += deltaData.c;
                  setResponse(fullText);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } catch (e: any) {
                setErrors((errors) => [
                  ...errors,
                  e?.message ?? "Unknown error",
                ]);
              }
            }
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setErrors((errors) => [...errors, err?.message ?? "Unknown error"]);
        }
      } finally {
        setLoading(false);
        setController(null);
      }
    },
    []
  );

  return {
    response,
    loading,
    errors,
    sendMessage,
    sessionId,
    sessionIdJustCreated,
    title,
    resetSessionIdCreated,
    markSessionRedirected,
    resetSession,
  };
}
