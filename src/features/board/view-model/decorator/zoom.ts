import { vectorFromPoints } from '@/features/board/domain/point.ts'
import { pointOnScreenToCanvas } from '@/features/board/domain/screen-to-canvas.ts'
import type { ViewModelParams } from '@/features/board/view-model/view-model-params.ts'
import type { ViewModel } from '@/features/board/view-model/view-model-type.ts'

export function useZoomDecorator({ windowPositionModel, canvasRect }: ViewModelParams) {
    return (viewModel: ViewModel): ViewModel => {
        return {
            ...viewModel,
            window: {
                ...viewModel.window,
                onMouseWheel: (e) => {
                    viewModel.window?.onMouseWheel?.(e)
                    const delta = e.deltaY > 0 ? 0.9 : 1.1
                    const currentPoint = pointOnScreenToCanvas(
                        { x: e.clientX, y: e.clientY },
                        windowPositionModel.position,
                        canvasRect,
                    )
                    const newZoom = windowPositionModel.position.zoom * delta
                    const newPoint = pointOnScreenToCanvas(
                        { x: e.clientX, y: e.clientY },
                        { ...windowPositionModel.position, zoom: newZoom },
                        canvasRect,
                    )
                    const mouseDiff = vectorFromPoints(currentPoint, newPoint)
                    windowPositionModel.setPosition({
                        x: windowPositionModel.position.x - mouseDiff.x,
                        y: windowPositionModel.position.y - mouseDiff.y,
                        zoom: newZoom,
                    })
                },
            },
        }
    }
}
