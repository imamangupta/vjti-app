import { useState } from 'react';

const GROQ_API_KEY = "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"
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export function useGroqAI() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSubtasks = async (taskDescription) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',
          messages: [
            { role: 'system', content: 'You are an AI assistant that breaks down tasks into specific, actionable subtasks.' },
            { role: 'user', content: `Given the following task description, break it down into a list of 5-8 specific, actionable subtasks. and also add emoji  Provide the subtasks as a JSON array of strings: ${taskDescription}` }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate subtasks with Groq AI');
      }

      const data = await response.json();
      const subtasksJson = JSON.parse(data.choices[0].message.content);
      return subtasksJson.map((subtask, index) => ({ id: index, title: subtask, completed: false }));
    } catch (error) {
      console.error('Error generating subtasks with Groq AI:', error);
      setError("Failed to generate subtasks. Please try again later.");
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { generateSubtasks, isLoading, error };
}

