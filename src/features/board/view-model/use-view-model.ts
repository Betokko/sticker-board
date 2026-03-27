import { useState } from 'react'
import {
    type NodesDraggingViewState,
    useNodesDraggingViwModel,
} from '@/features/board/view-model/variants/nodes-dragging.ts'
import { type AddStickerViewState, useAddStickerViwModel } from './variants/add-sticker.ts'
import { type EditStickerViewState, useEditStickerViwModel } from './variants/edit-sticker.ts'
import { goToIdle, type IdleViewState, useIdleViewModel } from './variants/idle'
import { type SelectionWindowViewState, useSelectionWindowViwModel } from './variants/selection-window.ts'
import type { ViewModelParams } from './view-model-params.ts'
import type { ViewModel } from './view-model-type.ts'

export type UseViewModel =
    | IdleViewState
    | AddStickerViewState
    | SelectionWindowViewState
    | EditStickerViewState
    | NodesDraggingViewState

export function useViewModel(params: Omit<ViewModelParams, 'setViewState'>): ViewModel {
    const [viewState, setViewState] = useState<UseViewModel>(() => goToIdle())
    const newParams = { ...params, setViewState }
    const idleViewModel = useIdleViewModel(newParams)
    const addStickerViewModel = useAddStickerViwModel(newParams)
    const selectionWindowViewModel = useSelectionWindowViwModel(newParams)
    const editStickerViewModel = useEditStickerViwModel(newParams)
    const nodesDraggingViewModel = useNodesDraggingViwModel(newParams)

    switch (viewState.type) {
        case 'idle':
            return idleViewModel(viewState)
        case 'selection-window':
            return selectionWindowViewModel(viewState)
        case 'add-sticker':
            return addStickerViewModel()
        case 'edit-sticker':
            return editStickerViewModel(viewState)
        case 'nodes-dragging':
            return nodesDraggingViewModel(viewState)
    }
}
