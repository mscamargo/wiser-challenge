export default function env<T>(
  key: string,
  defaultValue: T,
  cast?: (value: unknown) => T,
): T {
  const value = process.env[key] || defaultValue;

  return cast ? cast(value) : (value as T);
}
