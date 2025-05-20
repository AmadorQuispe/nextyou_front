import { useState } from "react";

interface UseSubmitOptions<TArgs, TResult> {
  submitFn: (args: TArgs) => Promise<TResult>;
  onSuccess?: (data: TResult) => void;
  onError?: (error: unknown) => void;
  onSettled?: () => void;
}

interface CallOptions<TResult> {
  onSuccess?: (data: TResult) => void;
  onError?: (error: unknown) => void;
  onSettled?: () => void;
}

interface UseSubmitResult<TArgs, TResult> {
  submit: (
    args: TArgs,
    callOptions?: CallOptions<TResult>
  ) => Promise<TResult | void>;
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: TResult | null;
  error: unknown;
}

export function useSubmit<TArgs = void, TResult = unknown>(
  options: UseSubmitOptions<TArgs, TResult>
): UseSubmitResult<TArgs, TResult> {
  const { submitFn, onSuccess, onError, onSettled } = options;

  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<TResult | null>(null);
  const [error, setError] = useState<unknown>(null);

  const submit = async (
    args: TArgs,
    callOptions: CallOptions<TResult> = {}
  ): Promise<TResult | void> => {
    setIsPending(true);
    setIsError(false);
    setIsSuccess(false);
    setError(null);

    try {
      const result = await submitFn(args);
      setData(result);
      setIsSuccess(true);

      onSuccess?.(result);
      callOptions.onSuccess?.(result);

      return result;
    } catch (err) {
      setIsError(true);
      setError(err);

      onError?.(err);
      callOptions.onError?.(err);
    } finally {
      setIsPending(false);

      onSettled?.();
      callOptions.onSettled?.();
    }
  };

  return {
    submit,
    isPending,
    isError,
    isSuccess,
    data,
    error,
  };
}
