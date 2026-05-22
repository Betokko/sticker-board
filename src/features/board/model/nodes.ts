import { useState } from 'react'
import type { Point } from '@/features/board/domain/point.ts'

type NodeBase<T extends 'sticker' | 'arrow'> = {
    id: string
    type: T
}

export type StickerNode = NodeBase<'sticker'> & {
    x: number
    y: number
    text: string
}

export type ArrowNode = NodeBase<'arrow'> & {
    start: Point
    end: Point
}

export type Node = StickerNode | ArrowNode

export function nodes() {
    const [nodes, setNodes] = useState<Node[]>([
        { id: '1', type: 'sticker', y: 100, x: 100, text: 'HELLO_1' },
        { id: '2', type: 'sticker', y: 200, x: 200, text: 'HELLO_2' },
        { id: '3', type: 'arrow', start: { y: 110, x: 110 }, end: { y: 210, x: 210 } },
    ])

    const addSticker = (data: Pick<StickerNode, 'text' | 'x' | 'y'>) => {
        setNodes((prev) => [...prev, { id: crypto.randomUUID(), type: 'sticker', ...data }])
    }

    const addArrow = (data: { start: Point; end: Point }) => {
        setNodes((prev) => [...prev, { id: crypto.randomUUID(), type: 'arrow', ...data }])
    }

    const updateStickerText = (id: string, text: string) => {
        setNodes((prev) => prev.map((node) => (node.id === id ? { ...node, text } : node)))
    }

    const deleteNodes = (ids: string[]) => {
        setNodes((prev) => prev.filter((node) => !ids.includes(node.id)))
    }

    const updateNodesPositions = (
        positions: {
            id: string
            point: Point
            type?: 'start' | 'end'
        }[],
    ) => {
        const record = Object.fromEntries(positions.map((p) => [`${p.id}${p.type ?? ''}`, p]))

        setNodes((lastNodes) =>
            lastNodes.map((node) => {
                if (node.type === 'arrow') {
                    const newPosition = record[`${node.id}start`]
                    const newEndPosition = record[`${node.id}end`]

                    return {
                        ...node,
                        start: newPosition?.point ?? node.start,
                        end: newEndPosition?.point ?? node.end,
                    }
                }
                if (node.type === 'sticker') {
                    const newPosition = record[node.id]
                    if (newPosition) {
                        return { ...node, ...newPosition.point }
                    }
                }

                return node
            }),
        )
    }

    return {
        nodes,
        addSticker,
        addArrow,
        updateStickerText,
        deleteNodes,
        updateNodesPositions,
    }
}

export type NodesModel = ReturnType<typeof nodes>
