import type {ViewModelParams} from '../view-model-params'
import type {ViewModel} from '../view-model-type.ts'
import {goToIdle} from './idle'
import {pointOnScreenToCanvas} from "@/features/board/domain/screen-to-canvas.ts";

export type AddStickerViewState = {
    type: 'add-sticker'
}

export function useAddStickerViwModel({setViewState, nodesModel, windowPositionModel, canvasRect}: ViewModelParams) {
    return (): ViewModel => ({
        nodes: nodesModel.nodes,
        layout: {
            onKeyDown: (e) => {
                if (e.key === 'Escape') setViewState(goToIdle())
            },
        },
        canvas: {
            onClick: (e) => {
                if (!canvasRect) return
                const point = pointOnScreenToCanvas(
                    {x: e.clientX, y: e.clientY},
                    windowPositionModel.position,
                    canvasRect
                )
                nodesModel.addSticker({
                    text: 'New sticker',
                    ...point,
                })
                setViewState(goToIdle())
            },
        },
        actions: {
            addSticker: {
                isActive: true,
                onClick: () => setViewState(goToIdle()),
            },
        },
    })
}

export function goToAddSticker(): AddStickerViewState {
    return {
        type: 'add-sticker',
    }
}
