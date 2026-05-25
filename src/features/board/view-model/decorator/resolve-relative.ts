import { useMemo } from 'react'
import { isResolvePoint, type RelativeBase, resolveRelativePoint } from '@/features/board/domain/point.ts'
import type { Node } from '@/features/board/model/nodes.ts'
import type { ViewModel } from '@/features/board/view-model/view-model-type.ts'

export function createRelativeBase(nodes: Node[]) {
    return Object.fromEntries(nodes.filter((n) => n.type === 'sticker').map((n) => [n.id, n]))
}

export function resolveRelativePoints(nodes: Node[], relativeBase: RelativeBase) {
    return nodes.map((node) => {
        let newNode = node
        if (newNode.type === 'arrow' && isResolvePoint(newNode.start)) {
            newNode = {
                ...newNode,
                start: resolveRelativePoint(relativeBase, newNode.start),
            }
        }
        if (newNode.type === 'arrow' && isResolvePoint(newNode.end)) {
            newNode = {
                ...newNode,
                end: resolveRelativePoint(relativeBase, newNode.end),
            }
        }
        return newNode
    })
}

export function useResolveRelativeStaticDecorator(viewModel: ViewModel): ViewModel {
    const nodes = useMemo(() => {
        const relativeBase = createRelativeBase(viewModel.nodes)
        return resolveRelativePoints(viewModel.nodes, relativeBase)
    }, [viewModel.nodes])

    return { ...viewModel, nodes }
}
