import { type Point, vectorFromPoints } from '../../domain/point.ts'
import { pointOnScreenToCanvas } from '../../domain/screen-to-canvas.ts'
import type { ViewModelParams } from '../view-model-params'
import type { ViewModel } from '../view-model-type.ts'
import { goToIdle } from './idle'

export type WindowDraggingViewState = {
    type: 'window-dragging'
    startPoint: Point
    endPoint: Point
}

export function useWindowDraggingViwModel({
    setViewState,
    nodesModel,
    windowPositionModel,
    canvasRect,
}: ViewModelParams) {
    return (state: WindowDraggingViewState): ViewModel => {
        const diff = vectorFromPoints(state.startPoint, state.endPoint)
        return {
            nodes: nodesModel.nodes,
            windowPosition: {
                x: windowPositionModel.position.x + diff.x,
                y: windowPositionModel.position.y + diff.y,
                zoom: windowPositionModel.position.zoom,
            },
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
                    windowPositionModel.setPosition({
                        x: windowPositionModel.position.x + diff.x,
                        y: windowPositionModel.position.y + diff.y,
                        zoom: windowPositionModel.position.zoom,
                    })
                    setViewState(goToIdle({}))
                },
            },
        }
    }
}

export function goToWindowDragging({
    startPoint,
    endPoint,
}: {
    startPoint: Point
    endPoint: Point
}): WindowDraggingViewState {
    return {
        type: 'window-dragging',
        startPoint,
        endPoint,
    }
}
