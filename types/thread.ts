export interface ThreadType {
  x: number;
  y: number;
  comments: CommentType[];
}

export interface CommentType {
  date: string;
  comment: string;
  reactions: CommentReactionType[];
}

export interface CommentReactionType {
  reaction: string;
  count: number;
}

export interface CurrentThreadType {
  x: number;
  y: number;
  index: number | null;
}
