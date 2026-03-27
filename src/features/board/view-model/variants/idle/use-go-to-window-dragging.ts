import { distanceFromPoints } from '@/features/board/domain/point.ts'
import { pointOnScreenToCanvas } from '@/features/board/domain/screen-to-canvas.ts'
import type { IdleViewState } from '@/features/board/view-model/variants/idle/index.ts'
import { goToWindowDragging } from '@/features/board/view-model/variants/window-dragging.ts'
import type { ViewModelParams } from '@/features/board/view-model/view-model-params.ts'

export function useGoToWindowDragging(params: ViewModelParams) {
    const { setViewState, canvasRect, windowPositionModel } = params

    const handleWindowMouseMove = ({ idleState, e }: { idleState: IdleViewState; e: MouseEvent }) => {
        if (idleState.mouseDown?.isRightClick) {
            const currentPoint = pointOnScreenToCanvas(
                { x: e.clientX, y: e.clientY },
                windowPositionModel.position,
                canvasRect,
            )

            if (distanceFromPoints(idleState.mouseDown, currentPoint) > 5) {
                setViewState(
                    goToWindowDragging({
                        startPoint: idleState.mouseDown,
                        endPoint: currentPoint,
                    }),
                )
            }
        }
    }
    return { handleWindowMouseMove }
}
