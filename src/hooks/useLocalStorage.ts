import { useEffect, useState } from 'react';
import { supabase } from '../libs/supabaseClient';

export const useSupabaseStorage = <T,>(initial: T) => {
  const clientId = '331e1160-1fdd-4673-9c4b-9633ca905a7d';

  const [value, setValue] = useState<T>(initial);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('transactions')
          .select('value')
          .eq('key', clientId)
          .single();

        if (error) {
          console.error('Error fetching data:', error);
          return;
        }

        if (data) {
          setValue(JSON.parse(data.value) as T);
        }
      } catch (err) {
        console.error('Error processing data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [clientId]);

  // Save data when it changes
  useEffect(() => {
    if (!isLoading) { // Only save after initial load
      const saveData = async () => {
        try {
          const { error } = await supabase
            .from('transactions')
            .upsert({ key: clientId, value: JSON.stringify(value) });

          if (error) {
            console.error('Error saving data:', error);
          }
        } catch (err) {
          console.error('Error processing save:', err);
        }
      };

      saveData();
    }
  }, [value, isLoading, clientId]);

  // Don't allow external usage until data is loaded
  if (isLoading) {
    return {
      state: initial,
      setState: () => { }, // no-op while loading
      isLoading
    };
  }

  return {
    state: value,
    setState: setValue,
    isLoading
  };
};
