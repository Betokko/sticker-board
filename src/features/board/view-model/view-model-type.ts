import type { Rect } from '../domain/rect.ts'
import type { WindowPosition } from '../model/window-position.ts'

export type ViewModel = {
    nodes?: Array<{
        id: string
        text: string
        x: number
        y: number
        isSelected?: boolean
        isEditing?: boolean
        onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
        onTextChange?: (text: string) => void
        onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void
        onMouseUp?: (e: React.MouseEvent<HTMLButtonElement>) => void
    }>
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
        addSticker?: {
            isActive: boolean
            onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
        }
    }
}
