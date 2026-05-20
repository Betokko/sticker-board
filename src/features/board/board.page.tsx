import { ArrowRightIcon, StickerIcon } from 'lucide-react'
import { useCanvasRect } from './hooks/use-canvas-rect.ts'
import { useLayoutFocus } from './hooks/use-layout-focus.ts'
import { useNodesRects } from './hooks/use-nodes-rects.ts'
import { useWindowEvents } from './hooks/use-window-events.ts'
import { nodes } from './model/nodes.ts'
import { useWindowPositionModel } from './model/window-position.ts'
import { ActionButton } from './ui/ActionButton.tsx'
import { Actions } from './ui/Actions.tsx'
import { Canvas } from './ui/Canvas.tsx'
import { Dots } from './ui/Dots.tsx'
import { Layout } from './ui/Layout.tsx'
import { Overlay } from './ui/Overlay.tsx'
import { SelectionWindow } from './ui/SelectionWindow.tsx'
import { Sticker } from './ui/Sticker.tsx'
import { useViewModel } from './view-model/use-view-model.ts'

function BoardPage() {
    const nodesModel = nodes()
    const windowPositionModel = useWindowPositionModel()
    const { canvasRef, canvasRect } = useCanvasRect()
    const { layoutRef } = useLayoutFocus()
    const { nodeRef, nodesRects } = useNodesRects()

    const viewModel = useViewModel({ nodesModel, windowPositionModel, canvasRect, nodesRects })

    useWindowEvents(viewModel)
    
    const windowPosition = viewModel?.windowPosition ?? windowPositionModel.position

    return (
        <Layout tab-index={0} ref={layoutRef} onKeyDown={viewModel.layout?.onKeyDown}>
            <Dots windowPosition={windowPosition} />
            <Canvas
                ref={canvasRef}
                onClick={viewModel.canvas?.onClick}
                windowPosition={windowPosition}
                overlay={<Overlay onClick={viewModel.overlay?.onClick} onMouseDown={viewModel.overlay?.onMouseDown} />}
            >
                {viewModel?.nodes?.map((node) => (
                    <Sticker {...node} ref={nodeRef} key={node.id} />
                ))}
                {viewModel.selectionWindow && <SelectionWindow {...viewModel.selectionWindow} />}
            </Canvas>
            <Actions>
                <ActionButton
                    title='Добавить стикер (S)'
                    isActive={viewModel.actions?.addSticker?.isActive}
                    onClick={viewModel.actions?.addSticker?.onClick}
                >
                    <StickerIcon />
                </ActionButton>
                <ActionButton title='Добавить стрелку (A)' isActive={false} onClick={() => {}}>
                    <ArrowRightIcon />
                </ActionButton>
            </Actions>
        </Layout>
    )
}

export const Component = BoardPage
