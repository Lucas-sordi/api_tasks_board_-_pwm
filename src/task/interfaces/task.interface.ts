export interface Task {
    id: number,
    name: string;
    description: string;
    parentId: number;
    typeId: number;
};