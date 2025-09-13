import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface LandingContentData {
  hero?: {
    title: string;
    subtitle: string;
    cta: string;
  };
  about?: {
    title: string;
    description: string;
  };
  services?: {
    title: string;
    services: Array<{
      name: string;
      description: string;
    }>;
  };
  contact?: {
    title: string;
    email: string;
    phone: string;
    address: string;
  };
}

export const useLandingContent = () => {
  const [content, setContent] = useState<LandingContentData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('landing_content')
        .select('section_key, content');

      if (error) throw error;

      const contentMap: LandingContentData = {};
      data?.forEach((item) => {
        if (item.content && typeof item.content === 'object') {
          contentMap[item.section_key as keyof LandingContentData] = item.content as any;
        }
      });

      setContent(contentMap);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch content');
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (sectionKey: string, newContent: any) => {
    try {
      const { error } = await supabase
        .from('landing_content')
        .update({ content: newContent })
        .eq('section_key', sectionKey);

      if (error) throw error;

      setContent(prev => ({
        ...prev,
        [sectionKey]: newContent
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update content');
      throw err;
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  return { content, loading, error, updateContent, refetch: fetchContent };
};