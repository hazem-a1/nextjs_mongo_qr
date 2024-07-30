export function setNestedValue<T>(obj: T, path: string, value: any): T {
  const keys = path.split('.');
  
  function update(current: any, keyIndex: number): any {
    if (keyIndex === keys.length - 1) {
      return { ...current, [keys[keyIndex]]: value };
    }
    
    if (!(keys[keyIndex] in current)) {
      return { ...current, [keys[keyIndex]]: update({}, keyIndex + 1) };
    }
    
    return {
      ...current,
      [keys[keyIndex]]: update(current[keys[keyIndex]], keyIndex + 1)
    };
  }
  
  return update(obj, 0);
}