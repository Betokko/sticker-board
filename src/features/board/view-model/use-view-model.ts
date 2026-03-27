import { useState } from 'react'
import {
    type NodesDraggingViewState,
    useNodesDraggingViwModel,
} from '@/features/board/view-model/variants/nodes-dragging.ts'
import { type AddStickerViewState, useAddStickerViwModel } from './variants/add-sticker.ts'
import { type EditStickerViewState, useEditStickerViwModel } from './variants/edit-sticker.ts'
import { goToIdle, type IdleViewState, useIdleViewModel } from './variants/idle'
import { type SelectionWindowViewState, useSelectionWindowViwModel } from './variants/selection-window.ts'
import { useWindowDraggingViwModel, type WindowDraggingViewState } from './variants/window-dragging.ts'
import type { ViewModelParams } from './view-model-params.ts'
import type { ViewModel } from './view-model-type.ts'
import {useZoomDecorator} from "@/features/board/view-model/decorator/zoom.ts";

export type UseViewModel =
    | IdleViewState
    | AddStickerViewState
    | SelectionWindowViewState
    | EditStickerViewState
    | NodesDraggingViewState
    | WindowDraggingViewState

export function useViewModel(params: Omit<ViewModelParams, 'setViewState'>): ViewModel {
    const [viewState, setViewState] = useState<UseViewModel>(() => goToIdle())
    const newParams = { ...params, setViewState }
    const idleViewModel = useIdleViewModel(newParams)
    const addStickerViewModel = useAddStickerViwModel(newParams)
    const selectionWindowViewModel = useSelectionWindowViwModel(newParams)
    const editStickerViewModel = useEditStickerViwModel(newParams)
    const nodesDraggingViewModel = useNodesDraggingViwModel(newParams)
    const windowDraggingViewModel = useWindowDraggingViwModel(newParams)
    
    const zoomDecorator = useZoomDecorator(newParams)

    let viewModel: ViewModel
    switch (viewState.type) {
        case 'idle':
            viewModel = idleViewModel(viewState)
            break
        case 'selection-window':
            viewModel = selectionWindowViewModel(viewState)
            break
        case 'add-sticker':
            viewModel = addStickerViewModel()
            break
        case 'edit-sticker':
            viewModel = editStickerViewModel(viewState)
            break
        case 'nodes-dragging':
            viewModel = nodesDraggingViewModel(viewState)
            break
        case 'window-dragging':
            viewModel = windowDraggingViewModel(viewState)
            break
    }
    return zoomDecorator(viewModel)
}
