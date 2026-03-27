import type { Dispatch, SetStateAction } from 'react'
import type { NodesRectsMap } from '@/features/board/hooks/use-nodes-rects.ts'
import type { WindowPositionModel } from '@/features/board/model/window-position.ts'
import type { UseViewModel } from '@/features/board/view-model/use-view-model.ts'
import type { CanvasRect } from '../hooks/use-canvas-rect.ts'
import type { NodesModel } from '../model/nodes.ts'

export type ViewModelParams = {
    setViewState: Dispatch<SetStateAction<UseViewModel>>
    nodesModel: NodesModel
    windowPositionModel: WindowPositionModel
    canvasRect: CanvasRect | undefined
    nodesRects: NodesRectsMap
}
