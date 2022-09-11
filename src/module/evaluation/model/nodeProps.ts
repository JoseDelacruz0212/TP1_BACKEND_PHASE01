export interface NodeProps {
    question: string;
    points: number;
    answer: string;
}
export interface NodeForBD {
    nodeId: string;
    nodeType: string;
    props: NodeProps;
}