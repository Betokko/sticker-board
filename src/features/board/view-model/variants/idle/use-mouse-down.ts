import type React from 'react'
import { pointOnScreenToCanvas } from '@/features/board/domain/screen-to-canvas.ts'
import type { IdleViewState } from '@/features/board/view-model/variants/idle/index.ts'
import type { ViewModelParams } from '@/features/board/view-model/view-model-params.ts'

export function useMouseDown({ setViewState, canvasRect, windowPositionModel }: ViewModelParams) {
    const handleOverlayMouseDown = ({
        idleState,
        e,
    }: {
        idleState: IdleViewState
        e: React.MouseEvent
    }) => {
        const point = pointOnScreenToCanvas({ x: e.clientX, y: e.clientY }, windowPositionModel.position, canvasRect)
        setViewState({
            ...idleState,
            mouseDown: { type: 'overlay', isRightClick: e.button === 2, ...point },
        })
    }

    const handleNodeMouseDown = ({
        idleState,
        id,
        e,
    }: {
        idleState: IdleViewState
        id: string
        e: React.MouseEvent
    }) => {
        const point = pointOnScreenToCanvas({ x: e.clientX, y: e.clientY }, windowPositionModel.position, canvasRect)
        setViewState({
            ...idleState,
            mouseDown: { type: 'node', isRightClick: e.button === 2, id, ...point },
        })
    }

    const getIsStickerMouseDown = ({ idleState, id }: { idleState: IdleViewState; id: string }) => {
        return idleState.mouseDown?.type === 'node' && idleState.mouseDown.id === id
    }

    const handleWindowMouseUp = ({ idleState }: { idleState: IdleViewState }) => {
        setViewState({
            ...idleState,
            mouseDown: undefined,
        })
    }

    return {
        handleOverlayMouseDown,
        handleWindowMouseUp,
        handleNodeMouseDown,
        getIsStickerMouseDown,
    }
}
