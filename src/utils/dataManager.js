// Data management utilities for bulls and pass counts

const BULLS_STORAGE_KEY = 'horihabba_bulls';
const PASSES_STORAGE_KEY = 'horihabba_passes';

// Helper to safely access localStorage
const safeLocalStorage = {
  getItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
    } catch (e) {
      console.warn('localStorage not available:', e);
    }
    return null;
  },
  setItem: (key, value) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn('localStorage not available:', e);
    }
  },
  removeItem: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn('localStorage not available:', e);
    }
  }
};

// Bull management
export const getBulls = () => {
  try {
    const bulls = safeLocalStorage.getItem(BULLS_STORAGE_KEY);
    return bulls ? JSON.parse(bulls) : [];
  } catch (e) {
    console.error('Error getting bulls:', e);
    return [];
  }
};

export const addBull = (bull) => {
  try {
    const bulls = getBulls();
    bulls.push(bull);
    safeLocalStorage.setItem(BULLS_STORAGE_KEY, JSON.stringify(bulls));
  } catch (e) {
    console.error('Error adding bull:', e);
  }
};

export const removeBull = (bullNumber) => {
  try {
    const bulls = getBulls();
    const filtered = bulls.filter(b => b.number !== bullNumber);
    safeLocalStorage.setItem(BULLS_STORAGE_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Error removing bull:', e);
  }
};

// Pass count management
export const getPasses = () => {
  try {
    const passes = safeLocalStorage.getItem(PASSES_STORAGE_KEY);
    return passes ? JSON.parse(passes) : {};
  } catch (e) {
    console.error('Error getting passes:', e);
    return {};
  }
};

export const incrementPassCount = (bullNumber) => {
  try {
    const passes = getPasses();
    passes[bullNumber] = (passes[bullNumber] || 0) + 1;
    safeLocalStorage.setItem(PASSES_STORAGE_KEY, JSON.stringify(passes));
  } catch (e) {
    console.error('Error incrementing pass count:', e);
  }
};

export const resetPassCount = (bullNumber) => {
  try {
    const passes = getPasses();
    delete passes[bullNumber];
    safeLocalStorage.setItem(PASSES_STORAGE_KEY, JSON.stringify(passes));
  } catch (e) {
    console.error('Error resetting pass count:', e);
  }
};

export const resetAllPasses = () => {
  try {
    safeLocalStorage.removeItem(PASSES_STORAGE_KEY);
  } catch (e) {
    console.error('Error resetting all passes:', e);
  }
};
