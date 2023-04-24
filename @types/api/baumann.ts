export interface BaumannResultResponse {
  skinType: string;
  scores: {
    D: number;
    O: number;
    S: number;
    R: number;
    N: number;
    P: number;
    W: number;
    T: number;
  };
}
