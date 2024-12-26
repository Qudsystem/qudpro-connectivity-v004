import { useState } from 'react';
import { useAI } from '../hooks/useAI';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';

export const AIFeatures = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const { generateContent, isLoading } = useAI();

  const handleGenerate = async () => {
    const content = await generateContent(prompt);
    if (content) {
      setResult(content);
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex gap-2">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          className="flex-1"
        />
        <Button onClick={handleGenerate} disabled={isLoading || !prompt}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </Button>
      </div>
      {result && (
        <div className="rounded-lg border p-4 bg-white dark:bg-gray-800">
          <p className="whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
};