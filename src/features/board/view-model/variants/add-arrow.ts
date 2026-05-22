import type {ViewModelParams} from '../view-model-params'
import type {ViewModel} from '../view-model-type.ts'
import {goToIdle} from './idle'
import {goToDrowArrow} from "@/features/board/view-model/variants/drow-arrow.ts";
import {pointOnScreenToCanvas} from "@/features/board/domain/screen-to-canvas.ts";

export type AddArrowViewState = {
    type: 'add-arrow'
}

export function useAddArrowViwModel({setViewState, nodesModel, windowPositionModel, canvasRect}: ViewModelParams) {
    return (): ViewModel => ({
        nodes: nodesModel.nodes.map(node => {
            if (node.type === 'sticker') {
                return {
                    ...node,
                    onMouseDown: (e: React.MouseEvent<HTMLButtonElement>) => setViewState(goToDrowArrow(pointOnScreenToCanvas(
                        {x: e.clientX, y: e.clientY},
                        windowPositionModel.position,
                        canvasRect,
                    )))
                }
            }
            return node
        }),
        actions: {
            addArrow: {
                isActive: true,
                onClick: () => setViewState(goToIdle()),
            },
        },
        overlay: {
            onMouseDown: (e) => setViewState(goToDrowArrow(pointOnScreenToCanvas(
                {x: e.clientX, y: e.clientY},
                windowPositionModel.position,
                canvasRect,
            ))),
        },
    })
}

export function goToAddArrow(): AddArrowViewState {
    return {
        type: 'add-arrow',
    }
}
