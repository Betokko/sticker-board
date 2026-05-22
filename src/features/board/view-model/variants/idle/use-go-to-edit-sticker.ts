import { goToEditSticker } from '@/features/board/view-model/variants/edit-sticker.ts'
import type { IdleViewState } from '@/features/board/view-model/variants/idle/index.ts'
import type { ViewModelParams } from '@/features/board/view-model/view-model-params.ts'

export function useGoToEditSticker({ setViewState }: ViewModelParams) {
    const handleNodeClick = ({
        idleState,
        id,
        e,
    }: {
        idleState: IdleViewState
        id: string
        e: React.MouseEvent
    }) => {
        if (idleState.selectedIds.size === 1 && idleState.selectedIds.has(id) && !e.ctrlKey && !e.shiftKey) {
            setViewState(goToEditSticker(id))
            return { preventNext: true }
        }
        return { preventNext: false }
    }

    return {
        handleNodeClick,
    }
}
