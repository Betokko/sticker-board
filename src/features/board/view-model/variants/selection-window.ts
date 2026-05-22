import type { Point } from '../../domain/point.ts'
import {createRectFromDimensions, createRectFromPoints, isRectInIntersecting, type Rect} from '../../domain/rect.ts'
import { pointOnScreenToCanvas } from '../../domain/screen-to-canvas.ts'
import { type Selection, selectItems } from '../../domain/selection.ts'
import type { ViewModelParams } from '../view-model-params'
import type { ViewModel } from '../view-model-type.ts'
import { goToIdle } from './idle'

export type SelectionWindowViewState = {
    type: 'selection-window'
    startPoint: Point
    endPoint: Point
    initialSelectedIds: Selection
}

export function useSelectionWindowViwModel({
    setViewState,
    nodesModel,
    canvasRect,
    nodesRects,
    windowPositionModel,
}: ViewModelParams) {
    const getNodes = (state: SelectionWindowViewState, selectionWindowRect: Rect) =>
        nodesModel.nodes.map((node) => {
            const nodeDimensions = nodesRects[node.id]
            const nodeRect =
                node.type === 'sticker'
                    ? createRectFromDimensions(node, nodeDimensions)
                    : createRectFromPoints(node.start, node.end)
            return {
                ...node,
                isSelected:
                    isRectInIntersecting(nodeRect, selectionWindowRect) || state.initialSelectedIds.has(node.id),
            }
        })

    return (state: SelectionWindowViewState): ViewModel => {
        const rect = createRectFromPoints(state.startPoint, state.endPoint)
        const nodes = getNodes(state, rect)
        return {
            selectionWindow: rect,
            nodes,
            window: {
                onMouseMove: (e) => {
                    setViewState({
                        ...state,
                        endPoint: pointOnScreenToCanvas(
                            { x: e.clientX, y: e.clientY },
                            windowPositionModel.position,
                            canvasRect,
                        ),
                    })
                },
                onMouseUp: () => {
                    const selectedNodes = nodes.filter((node) => node.isSelected).map((node) => node.id)
                    setViewState(
                        goToIdle({
                            selectedIds: selectItems(state.initialSelectedIds, selectedNodes, 'add'),
                        }),
                    )
                },
            },
        }
    }
}

export function goToSelectionWindow(
    startPoint: Point,
    endPoint: Point,
    initialSelectedIds?: Set<string>,
): SelectionWindowViewState {
    return {
        type: 'selection-window',
        startPoint,
        endPoint,
        initialSelectedIds: initialSelectedIds ?? new Set(),
    }
}
