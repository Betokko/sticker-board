import { pointOnScreenToCanvas } from '@/features/board/domain/screen-to-canvas.ts'
import type { Point } from '../../domain/point.ts'
import type { ViewModelParams } from '../view-model-params'
import type { ViewModel } from '../view-model-type.ts'
import { goToIdle } from './idle'

export type DrowArrowViewState = {
    type: 'drow-arrow'
    startPoint: Point
    endPoint: Point
}

export function useDrowArrowViwModel({ setViewState, nodesModel, windowPositionModel, canvasRect }: ViewModelParams) {
    return (state: DrowArrowViewState): ViewModel => {
        const newArrow = {
            id: 'drawing-arrow',
            type: 'arrow' as const,
            start: state.startPoint,
            end: state.endPoint,
        }
        const newNodes = [...nodesModel.nodes, newArrow]
        return {
            nodes: newNodes,
            actions: {
                addArrow: {
                    isActive: true,
                },
            },
            layout: {
                onKeyDown: (e) => {
                    if (e.key === 'Escape') {
                        setViewState(goToIdle())
                    }
                },
            },
            window: {
                onMouseMove: (e) => {
                    const currentPoint = pointOnScreenToCanvas(
                        {
                            x: e.clientX,
                            y: e.clientY,
                        },
                        windowPositionModel.position,
                        canvasRect,
                    )
                    setViewState({
                        ...state,
                        endPoint: currentPoint,
                    })
                },
                onMouseUp: () => {
                    setViewState(goToIdle())
                    nodesModel.addArrow(newArrow)
                },
            },
        }
    }
}

export function goToDrowArrow(startPoint: Point): DrowArrowViewState {
    return {
        type: 'drow-arrow',
        startPoint,
        endPoint: startPoint,
    }
}
