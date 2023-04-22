import { BaumannQNA } from '@/types/baumann';

export const DUMMY_BAUMANN_A: BaumannQNA = {
  id: 1,
  question: 'What happens after you have had many days of consecutive sun exposure',
  type: 'SEBUM',
  questionType: 'A',
  imageUrl: '',
  Baumann_Answer: [
    { id: 1, answer: 'I sunburn and blister, but my skin does not change color.', imageUrl: '' },
    { id: 2, answer: 'My skin becomes slightly darker.', imageUrl: '' },
    { id: 3, answer: 'My skin becomes much darker.', imageUrl: '' },
    {
      id: 4,
      answer: 'My skin is already dark, so it is hard to see if it gets darker.',
      imageUrl: '',
    },
    { id: 5, answer: 'Unsure', imageUrl: '' },
  ],
};

export const DUMMY_BAUMANN_B: BaumannQNA = {
  id: 1,
  question: 'What happens after you have had many days of consecutive sun exposure',
  type: 'SEBUM',
  questionType: 'B',
  imageUrl: '/Diamond.png',
  Baumann_Answer: [
    { id: 1, answer: 'Never', imageUrl: '' },
    { id: 2, answer: 'Rarely', imageUrl: '' },
    { id: 3, answer: 'Often', imageUrl: '' },
    {
      id: 4,
      answer: 'Always',
      imageUrl: '',
    },
    { id: 5, answer: 'Unsure', imageUrl: '' },
  ],
};
