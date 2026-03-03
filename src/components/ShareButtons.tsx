import { useState } from 'react';
import { Link as LinkIcon, Check, Share } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

interface ShareButtonsProps {
  getShareableUrl: () => Promise<string>;
}

export const ShareButtons = ({ getShareableUrl }: ShareButtonsProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      setIsGenerating(true);
      const url = await getShareableUrl();
      
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'My Kinky Map',
            text: 'Compare maps with me here!',
            url: url,
          });
          return;
        } catch (shareError) {
          if ((shareError as Error).name === 'AbortError') return;
        }
      }

      const copyFallback = (text: string) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          document.execCommand('copy');
        } catch (err) {
          console.error("Fallback failed", err);
        }
        document.body.removeChild(textArea);
      };

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(url);
        } catch (err) {
          copyFallback(url);
        }
      } else {
        copyFallback(url);
      }
      
      setCopied(true);
      toast({
        title: "Link Copied!",
        description: "Your link is ready to share.",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Could not generate link. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const canShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <Button 
      onClick={handleShare}
      disabled={isGenerating}
      variant="secondary"
      className="w-full sm:w-auto bg-[#1a1a20] hover:bg-[#fbbf24]/20 text-[#fbbf24] transition-colors rounded-xl border border-[#fbbf24]/30 h-10 text-sm px-6 flex items-center justify-center gap-2"
    >
      {isGenerating ? (
        <>
          <div className="w-4 h-4 border-2 border-[#fbbf24]/30 border-t-[#fbbf24] rounded-full animate-spin" />
          <span>Generating...</span>
        </>
      ) : copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          {canShare ? <Share className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
          <span>{canShare ? 'Share Link' : 'Copy Link'}</span>
        </>
      )}
    </Button>
  );
};
