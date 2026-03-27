import { distanceFromPoints } from '@/features/board/domain/point.ts'
import { pointOnScreenToCanvas } from '@/features/board/domain/screen-to-canvas.ts'
import type { IdleViewState } from '@/features/board/view-model/variants/idle/index.ts'
import { goToNodesDragging } from '@/features/board/view-model/variants/nodes-dragging.ts'
import type { ViewModelParams } from '@/features/board/view-model/view-model-params.ts'

export function useGoToNodesDragging(params: ViewModelParams) {
    const { setViewState, canvasRect } = params

    const handleWindowMouseMove = ({ idleState, e }: { idleState: IdleViewState; e: MouseEvent }) => {
        if (idleState.mouseDown && idleState.mouseDown.type === 'node') {
            const currentPoint = pointOnScreenToCanvas({ x: e.clientX, y: e.clientY }, canvasRect)

            if (distanceFromPoints(idleState.mouseDown, currentPoint) > 5) {
                setViewState(
                    goToNodesDragging({
                        startPoint: idleState.mouseDown,
                        endPoint: currentPoint,
                        nodesToMove: new Set([...idleState.selectedIds, idleState.mouseDown.id]),
                    }),
                )
            }
        }
    }
    return { handleWindowMouseMove }
}
