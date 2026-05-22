import {type Point, vectorFromPoints} from '../../domain/point.ts'
import {pointOnScreenToCanvas} from '../../domain/screen-to-canvas.ts'
import type {ViewModelParams} from '../view-model-params'
import type {ViewModel} from '../view-model-type.ts'
import {goToIdle} from './idle'
import {addPoints} from "@/features/board/domain/rect.ts";

export type NodesDraggingViewState = {
    type: 'nodes-dragging'
    startPoint: Point
    endPoint: Point
    nodesToMove: Set<string>
}

export function useNodesDraggingViwModel({setViewState, nodesModel, windowPositionModel, canvasRect}: ViewModelParams) {
    const getNodes = (state: NodesDraggingViewState) =>
        nodesModel.nodes.map((node) => {
            if (state.nodesToMove.has(node.id)) {
                const diff = vectorFromPoints(state.startPoint, state.endPoint)
                if (node.type === 'arrow') {
                    return {
                        ...node,
                        start: addPoints(node.start, diff),
                        end: addPoints(node.end, diff),
                        isSelected: true,
                    }
                }
                return {
                ...node,
                ...addPoints(node, diff),
                    isSelected: true,
                }
            }
            return node
        })
    
    return (state: NodesDraggingViewState): ViewModel => {
        const nodes = getNodes(state);
        
        return {
            nodes,
            window: {
                onMouseMove: (e) => {
                    const currentPoint = pointOnScreenToCanvas(
                        {
                            x: e.clientX,
                            y: e.clientY,
                        },
                        windowPositionModel.position,
                        canvasRect,
                    );
                    setViewState({
                        ...state,
                        endPoint: currentPoint,
                    });
                },
                onMouseUp: () => {
                    const nodesToMove = nodes
                        .filter((node) => state.nodesToMove.has(node.id))
                        .flatMap((node) => {
                            if (node.type === 'arrow') {
                                return [
                                    {
                                        id: node.id,
                                        point: node.start,
                                        type: "start" as const,
                                    },
                                    {
                                        id: node.id,
                                        point: node.end,
                                        type: "end" as const,
                                    },
                                ];
                            }
                            return [
                                {
                                    id: node.id,
                                    point: {
                                        x: node.x,
                                        y: node.y,
                                    },
                                },
                            ];
                        });
                    
                    nodesModel.updateNodesPositions(nodesToMove);
                    
                    setViewState(
                        goToIdle({
                            selectedIds: state.nodesToMove,
                        }),
                    );
                },
            },
        };
    };
}

export function goToNodesDragging(
    {
        startPoint,
        endPoint,
        nodesToMove,
    }: {
        startPoint: Point
        endPoint: Point
        nodesToMove: Set<string>
    }): NodesDraggingViewState {
    return {
        type: 'nodes-dragging',
        startPoint,
        endPoint,
        nodesToMove,
    }
}
