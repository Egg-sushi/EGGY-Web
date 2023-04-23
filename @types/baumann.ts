export interface BaumannQuestion {
  id: number;
  question: string;
  type: 'SEBUM' | 'SENSITIVITY' | 'PIGMENTATION' | 'WRINKLE';
  questionType: 'A' | 'B';
  imageUrl: string;
}

export interface BaumannAnswer {
  id: number;
  answer: string;
  imageUrl?: string;
}

export interface UserAnswer {
  answerId: BaumannQuestion['id'];
  questionId: BaumannAnswer['id'];
}

export interface BaumannQNA extends BaumannQuestion {
  Baumann_Answer: BaumannAnswer[];
}
