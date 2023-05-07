export interface BaumannQuestion {
  id: number;
  question: string;
  type: 'SEBUM' | 'SENSITIVITY' | 'PIGMENTATION' | 'WRINKLE';
  questionType: 'PLAIN' | 'LONG_STRING' | 'GRID_PICTURE';
  imageUrl: string;
}

export interface BaumannAnswer {
  id: number;
  answer: string;
  imageUrl: string;
}

export interface UserAnswer {
  questionId: BaumannQuestion['id'];
  answerId: BaumannAnswer['id'];
}

export interface BaumannQNA extends BaumannQuestion {
  Baumann_Answer: BaumannAnswer[];
}

export interface BaumannImage {
  type: 'question' | 'answer';
  id: BaumannQuestion['id'];
  image: File;
}
