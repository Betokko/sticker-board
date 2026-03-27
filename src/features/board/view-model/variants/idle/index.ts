import { useGoToWindowDragging } from '@/features/board/view-model/variants/idle/use-go-to-window-dragging.ts'
import type { Selection } from '../../../domain/selection.ts'
import type { ViewModelParams } from '../../view-model-params'
import type { ViewModel } from '../../view-model-type.ts'
import { useDeleteSelected } from './use-delete-selected.ts'
import { useGoToAddSticker } from './use-go-to-add-sticker.ts'
import { useGoToEditSticker } from './use-go-to-edit-sticker.ts'
import { useGoToNodesDragging } from './use-go-to-nodes-dragging.ts'
import { useGoToSelectionWindow } from './use-go-to-selection-window.ts'
import { useMouseDown } from './use-mouse-down.ts'
import { useSelection } from './use-selection.ts'

export type IdleViewState = {
    type: 'idle'
    selectedIds: Set<string>
    mouseDown?:
        | {
              type: 'overlay'
              x: number
              y: number
              isRightClick: boolean
          }
        | {
              type: 'node'
              id: string
              x: number
              y: number
              isRightClick: boolean
          }
}

export function useIdleViewModel(params: ViewModelParams) {
    const { nodesModel } = params
    const selection = useSelection(params)
    const deleteSelected = useDeleteSelected(params)
    const goToEditSticker = useGoToEditSticker(params)
    const goToAddSticker = useGoToAddSticker(params)
    const goToSelectionWindow = useGoToSelectionWindow(params)
    const goToNodesDragging = useGoToNodesDragging(params)
    const goToWindowDragging = useGoToWindowDragging(params)
    const mouseDown = useMouseDown(params)

    return (idleState: IdleViewState): ViewModel => ({
        nodes: nodesModel.nodes.map((node) => ({
            ...node,
            isSelected: selection.isSelected({ idleState, id: node.id }),
            onMouseDown: (e) => mouseDown.handleNodeMouseDown({ idleState, id: node.id, e }),
            onMouseUp: (e) => {
                if (!mouseDown.getIsStickerMouseDown({ idleState, id: node.id })) {
                    return
                }
                const result = goToEditSticker.handleNodeClick({ e, idleState, id: node.id })
                if (result.preventNext) return

                selection.handleNodeClick({ e, idleState, id: node.id })
            },
        })),
        layout: {
            onKeyDown: (e) => {
                deleteSelected.handleKeyDown({ e, idleState })
                goToAddSticker.handleKeyDown({ e })
            },
        },
        overlay: {
            onMouseDown: (e) => mouseDown.handleOverlayMouseDown({ e, idleState }),
            onMouseUp: () => selection.handleOverlayMouseUp({ idleState }),
        },
        window: {
            onMouseMove: (e) => {
                goToSelectionWindow.handleWindowMouseMove({ e, idleState })
                goToNodesDragging.handleWindowMouseMove({ e, idleState })
                goToWindowDragging.handleWindowMouseMove({ e, idleState })
            },
            onMouseUp: () => mouseDown.handleWindowMouseUp({ idleState }),
        },
        actions: {
            addSticker: {
                isActive: false,
                onClick: goToAddSticker.handleActionClick,
            },
        },
    })
}

export function goToIdle({ selectedIds }: { selectedIds?: Selection } = {}): IdleViewState {
    return {
        type: 'idle',
        selectedIds: selectedIds ?? new Set(),
    }
}
