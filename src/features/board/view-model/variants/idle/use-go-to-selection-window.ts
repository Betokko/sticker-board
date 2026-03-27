import { distanceFromPoints } from '@/features/board/domain/point.ts'
import { pointOnScreenToCanvas } from '@/features/board/domain/screen-to-canvas.ts'
import type { IdleViewState } from '@/features/board/view-model/variants/idle/index.ts'
import { goToSelectionWindow } from '@/features/board/view-model/variants/selection-window.ts'
import type { ViewModelParams } from '@/features/board/view-model/view-model-params.ts'

export function useGoToSelectionWindow({ setViewState, canvasRect, windowPositionModel }: ViewModelParams) {
    const handleWindowMouseMove = ({ idleState, e }: { idleState: IdleViewState; e: MouseEvent }) => {
        if (idleState.mouseDown && idleState.mouseDown.type === 'overlay' && !idleState.mouseDown.isRightClick) {
            const currentPoint = pointOnScreenToCanvas(
                { x: e.clientX, y: e.clientY },
                windowPositionModel.position,
                canvasRect,
            )
            if (distanceFromPoints(idleState.mouseDown, currentPoint) > 5) {
                setViewState(
                    goToSelectionWindow(
                        idleState.mouseDown,
                        currentPoint,
                        e.shiftKey ? idleState.selectedIds : undefined,
                    ),
                )
            }
        }
    }
    return { handleWindowMouseMove }
}
