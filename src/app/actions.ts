'use server';

import type { LifePathRequest } from '@/ai/flows/suggest-life-paths';
import { suggestLifePaths } from '@/ai/flows/suggest-life-paths';

export async function getLifePathSuggestions(answers: LifePathRequest) {
  try {
    // Flatten answers: Checkbox arrays and textarea strings become a single array of strings
    const flattenedAnswers: LifePathRequest = {
      passion: answers.passion.flat().filter(s => s),
      mission: answers.mission.flat().filter(s => s),
      vocation: answers.vocation.flat().filter(s => s),
      profession: answers.profession.flat().filter(s => s),
    };
    
    // Basic validation to ensure we don't call the AI with empty inputs
    if (Object.values(flattenedAnswers).every(arr => arr.length === 0)) {
        return { error: 'No answers provided to generate suggestions.' };
    }

    const suggestions = await suggestLifePaths(flattenedAnswers);
    return { data: suggestions };
  } catch (error) {
    console.error('Error getting life path suggestions:', error);
    return { error: 'Failed to generate suggestions due to a server error.' };
  }
}
