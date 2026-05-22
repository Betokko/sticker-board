import type { ViewModelParams } from '../view-model-params'
import type { ViewModel } from '../view-model-type.ts'
import { goToIdle } from './idle'

export type EditStickerViewState = {
    type: 'edit-sticker'
    id: string
    newText?: string
}

export function useEditStickerViwModel({ setViewState, nodesModel }: ViewModelParams) {
    return (state: EditStickerViewState): ViewModel => ({
        nodes: nodesModel.nodes.map((node) =>
            node.id === state.id && node.type === 'sticker'
                ? {
                      ...node,
                      isSelected: true,
                      isEditing: true,
                      text: state.newText ?? node.text,
                      onTextChange: (text: string) => setViewState({ ...state, newText: text }),
                  }
                : node,
        ),
        layout: {
            onKeyDown: (e) => {
                if (e.key === 'Escape') setViewState(goToIdle())
                if (e.key === 'Enter') {
                }
            },
        },
        overlay: {
            onClick: () => {
                if (state.newText) nodesModel.updateStickerText(state.id, state.newText)
                setViewState(goToIdle())
            },
        },
    })
}

export function goToEditSticker(id: string): EditStickerViewState {
    return {
        type: 'edit-sticker',
        id,
    }
}
