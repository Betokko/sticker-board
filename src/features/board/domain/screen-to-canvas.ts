import type { WindowPosition } from '@/features/board/model/window-position.ts'
import type { CanvasRect } from '../hooks/use-canvas-rect.ts'

export function pointOnScreenToCanvas(
    point: { x: number; y: number },
    windowPosition: WindowPosition,
    canvasRect?: CanvasRect,
) {
    if (!canvasRect) return point
    return {
        x: point.x - canvasRect?.x - windowPosition.x,
        y: point.y - canvasRect?.y - windowPosition.y,
    }
}
