import type { Point } from '@/features/board/domain/point.ts'
import type { Rect } from '../domain/rect.ts'
import type { WindowPosition } from '../model/window-position.ts'

type ViewModelStickerNode = {
    id: string
    type: 'sticker'
    text: string
    x: number
    y: number
    isSelected?: boolean
    isEditing?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    onTextChange?: (text: string) => void
    onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void
    onMouseUp?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

type ViewModelArrowNode = {
    id: string
    type: 'arrow'
    start: Point
    end: Point
    isSelected?: boolean
    noPointerEvents?: boolean
    onClick?: (e: React.MouseEvent<SVGPathElement>) => void
    onMouseDown?: (e: React.MouseEvent<SVGPathElement>) => void
    onMouseUp?: (e: React.MouseEvent<SVGPathElement>) => void
}

export type ViewModelNode = ViewModelStickerNode | ViewModelArrowNode

export type ViewModel = {
    nodes: ViewModelNode[]
    selectionWindow?: Rect
    windowPosition?: WindowPosition
    layout?: {
        onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void
    }
    canvas?: {
        onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
    }
    overlay?: {
        onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
        onMouseDown?: (e: React.MouseEvent<HTMLDivElement>) => void
        onMouseUp?: (e: React.MouseEvent<HTMLDivElement>) => void
    }
    window?: {
        onMouseMove?: (e: MouseEvent) => void
        onMouseUp?: (e: MouseEvent) => void
        onMouseWheel?: (e: WheelEvent) => void
    }
    actions?: {
        addSticker?: ViewModelAction
        addArrow?: ViewModelAction
    }
}

export type ViewModelAction = {
    isActive: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}
