export function snakeToCamel(str: string): string {
  return str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace("-", "").replace("_", "")
  );
}

export function transformKeysToCamel<T>(obj: unknown): T {
  if (obj === null || obj === undefined || typeof obj !== "object") {
    return obj as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) =>
      transformKeysToCamel<unknown>(item)
    ) as unknown as T;
  }

  const result = {} as Record<string, unknown>;

  Object.entries(obj as Record<string, unknown>).forEach(([key, value]) => {
    const camelKey = snakeToCamel(key);
    result[camelKey] = transformKeysToCamel<unknown>(value);
  });

  return result as T;
}
