import { type SelectModifier, selectItems } from '../../../domain/selection.ts'
import type { ViewModelParams } from '../../view-model-params.ts'
import type { IdleViewState } from './index.ts'

export function useSelection({ setViewState }: ViewModelParams) {
    const select = (idleState: IdleViewState, ids: string[], modif: SelectModifier) => {
        setViewState({
            ...idleState,
            selectedIds: selectItems(idleState.selectedIds, ids, modif),
        })
    }
    const handleNodeClick = ({
        e,
        idleState,
        id,
    }: {
        e: React.MouseEvent
        idleState: IdleViewState
        id: string
    }) => {
        select(idleState, [id], e.ctrlKey || e.shiftKey ? 'toggle' : 'replace')
    }

    const handleOverlayMouseUp = ({ idleState }: { idleState: IdleViewState }) => {
        if (idleState.mouseDown) {
            setViewState({
                ...idleState,
                selectedIds: selectItems(idleState.selectedIds, [], 'replace'),
                mouseDown: undefined,
            })
        }
    }

    const isSelected = ({ idleState, id }: { idleState: IdleViewState; id: string }) => {
        return idleState.selectedIds.has(id)
    }

    return {
        isSelected,
        handleNodeClick,
        handleOverlayMouseUp,
    }
}
