import { type Point, vectorFromPoints } from '../../domain/point.ts'
import { pointOnScreenToCanvas } from '../../domain/screen-to-canvas.ts'
import type { ViewModelParams } from '../view-model-params'
import type { ViewModel } from '../view-model-type.ts'
import { goToIdle } from './idle'

export type NodesDraggingViewState = {
    type: 'nodes-dragging'
    startPoint: Point
    endPoint: Point
    nodesToMove: Set<string>
}

export function useNodesDraggingViwModel({ setViewState, nodesModel, canvasRect }: ViewModelParams) {
    const getNodes = (state: NodesDraggingViewState) =>
        nodesModel.nodes.map((node) => {
            if (state.nodesToMove.has(node.id)) {
                const diff = vectorFromPoints(state.startPoint, state.endPoint)
                return {
                    ...node,
                    x: node.x + diff.x,
                    y: node.y + diff.y,
                    isSelected: true,
                }
            }
            return node
        })

    return (state: NodesDraggingViewState): ViewModel => {
        const nodes = getNodes(state)
        return {
            nodes,
            window: {
                onMouseMove: (e) => {
                    setViewState({
                        ...state,
                        endPoint: pointOnScreenToCanvas({ x: e.clientX, y: e.clientY }, canvasRect),
                    })
                },
                onMouseUp: () => {
                    const nodesToMove = nodes.filter((node) => state.nodesToMove.has(node.id))
                    nodesModel.updateNodesPositions(nodesToMove)
                    setViewState(goToIdle({ selectedIds: state.nodesToMove }))
                },
            },
        }
    }
}

export function goToNodesDragging({
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
