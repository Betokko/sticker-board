import type { ViewModelParams } from '@/features/board/view-model/view-model-params.ts'
import type { ViewModel } from '@/features/board/view-model/view-model-type.ts'
import {goToAddArrow} from "@/features/board/view-model/variants/add-arrow.ts";
import {goToAddSticker} from "@/features/board/view-model/variants/add-sticker.ts";
import {goToIdle} from "@/features/board/view-model/variants/idle";

export function useCommonActionsDecorator({ setViewState }: ViewModelParams) {
    return (viewModel: ViewModel): ViewModel => {
        return {
            ...viewModel,
            layout: {
                ...viewModel.layout,
                onKeyDown: (e) => {
                    viewModel.layout?.onKeyDown?.(e)
                    if (e.key === 'a') {
                        setViewState(goToAddArrow())
                    }
                    if (e.key === 's') {
                        setViewState(goToAddSticker())
                    }
                    if (e.key === 'Escape') {
                        setViewState(goToIdle())
                    }
                }
            },
            actions: {
                addArrow: {
                    isActive: false,
                    onClick: () => setViewState(goToAddArrow())
                },
                addSticker: {
                    isActive: false,
                    onClick: () => setViewState(goToAddSticker())
                },
                ...viewModel.actions,
            }
        }
    }
}
