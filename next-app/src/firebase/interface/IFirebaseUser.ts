export interface IFirebaseUser {

    uid: string;
    email: string | null;
    displayName: string;
    createdAt: number;
    updatedAt: number;
    likedProblems: string[];
    dislikedProblems: string[];
    solvedProblems: string[];
    starredProblems: string[];
}
