import { Dispatch, SetStateAction, useState, useEffect } from 'react';

type HookResult<T> = [T, Dispatch<SetStateAction<T>>];

export default function useLocalStorage<T>(
    key: string,
    defaultValue: T
): HookResult<T> {
    const [state, setState] = useState<T>(() => {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
        return defaultValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}
