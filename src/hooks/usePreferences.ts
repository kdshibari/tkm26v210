import { useState, useCallback, useEffect } from 'react';
import LZString from 'lz-string';
import { supabase } from '@/lib/supabase';
import { Preferences, PreferenceValue, PREFERENCE_CATEGORIES } from '@/data/preferences';

const STORAGE_KEY = 'kinky_map_preferences';

interface StoredState {
  me: Preferences;
  partner: Preferences;
  myName: string;
  partnerName: string;
  myRole: string;
  partnerRole: string;
}

const getDefaultPreferences = (): Preferences => {
  const prefs: Preferences = {};
  PREFERENCE_CATEGORIES.forEach(cat => {
    cat.items.forEach(item => {
      prefs[item.key] = 0;
    });
  });
  return prefs;
};

// Keep old encoding for fallback
const encodeState = (state: StoredState): string => {
  try {
    return LZString.compressToEncodedURIComponent(JSON.stringify(state));
  } catch { return ''; }
};

const decodeState = (encoded: string): StoredState | null => {
  try {
    const decompressed = LZString.decompressFromEncodedURIComponent(encoded);
    if (!decompressed) return null;
    return JSON.parse(decompressed);
  } catch { return null; }
};

// Synchronously pull initial data so it never overwrites with blanks
const getInitialState = (): Partial<StoredState> => {
  const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
  
  // If we have an old LZString hash, use it immediately
  if (hash && !hash.startsWith('map=')) {
    const decoded = decodeState(hash);
    if (decoded) return decoded;
  }

  // Otherwise, load straight from localStorage
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
  }

  return {};
};

export const usePreferences = () => {
  const initialState = getInitialState();

  const [myPreferences, setMyPreferences] = useState<Preferences>(initialState.me || getDefaultPreferences());
  const [partnerPreferences, setPartnerPreferences] = useState<Preferences>(initialState.partner || getDefaultPreferences());
  const [myName, setMyName] = useState(initialState.myName || '');
  const [partnerName, setPartnerName] = useState(initialState.partnerName || '');
  const [myRole, setMyRole] = useState(initialState.myRole || '');
  const [partnerRole, setPartnerRole] = useState(initialState.partnerRole || '');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Handle Supabase loading (if user came from a shared link)
  useEffect(() => {
    const loadAsyncMap = async () => {
      const hash = window.location.hash.slice(1);
      if (hash.startsWith('map=')) {
        setIsLoading(true);
        const id = hash.split('=')[1];
        const { data, error } = await supabase
          .from('maps')
          .select('data')
          .eq('id', id)
          .single();

        if (data && !error) {
          const decoded = data.data as StoredState;
          setMyPreferences(decoded.me || getDefaultPreferences());
          setPartnerPreferences(decoded.partner || getDefaultPreferences());
          setMyName(decoded.myName || '');
          setPartnerName(decoded.partnerName || '');
          setMyRole(decoded.myRole || '');
          setPartnerRole(decoded.partnerRole || '');
        }
        setIsLoading(false);
      }
      setIsInitialized(true);
    };

    loadAsyncMap();
  }, []);

  // Auto-save to localStorage whenever ANY state changes
  useEffect(() => {
    // Prevent saving if we are in the middle of loading a shared map or just starting up
    if (!isInitialized || isLoading) return;

    const state: StoredState = {
      me: myPreferences,
      partner: partnerPreferences,
      myName,
      partnerName,
      myRole,
      partnerRole,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [myPreferences, partnerPreferences, myName, partnerName, myRole, partnerRole, isInitialized, isLoading]);

  const updateMyPreference = useCallback((key: string, value: PreferenceValue) => {
    setMyPreferences(prev => ({ ...prev, [key]: value }));
  }, []);

  const updatePartnerPreference = useCallback((key: string, value: PreferenceValue) => {
    setPartnerPreferences(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetAll = useCallback(() => {
    setMyPreferences(getDefaultPreferences());
    setPartnerPreferences(getDefaultPreferences());
    setMyName('');
    setPartnerName('');
    setMyRole('');
    setPartnerRole('');
    localStorage.removeItem(STORAGE_KEY);
    window.history.replaceState({}, '', window.location.pathname);
  }, []);

  const getShareableUrl = async () => {
    const state: StoredState = {
      me: myPreferences,
      partner: partnerPreferences,
      myName,
      partnerName,
      myRole,
      partnerRole,
    };

    const shortId = Math.random().toString(36).substring(2, 10);

    const { error } = await supabase
      .from('maps')
      .insert([{ id: shortId, data: state }]);

    if (error) {
      console.error("Supabase error, using long URL fallback", error);
      return `${window.location.origin}${window.location.pathname}#${encodeState(state)}`;
    }

    return `${window.location.origin}${window.location.pathname}#map=${shortId}`;
  };

  return {
    myPreferences,
    partnerPreferences,
    myName,
    partnerName,
    myRole,
    partnerRole,
    setMyName,
    setPartnerName,
    setMyRole,
    setPartnerRole,
    updateMyPreference,
    updatePartnerPreference,
    resetAll,
    getShareableUrl,
    isLoading,
  };
};
