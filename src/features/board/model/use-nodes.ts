import { useState } from 'react'

type NodeBase<T extends 'sticker'> = {
    id: string
    type: T
}

type StickerNode = NodeBase<'sticker'> & {
    x: number
    y: number
    text: string
}

export type Node = StickerNode

export function useNodes() {
    const [nodes, setNodes] = useState<Node[]>([
        { id: '1', y: 100, x: 100, text: 'HELLO_1', type: 'sticker' },
        { id: '2', y: 200, x: 200, text: 'HELLO_2', type: 'sticker' },
    ])

    const addSticker = (data: Pick<StickerNode, 'text' | 'x' | 'y'>) => {
        setNodes((prev) => [...prev, { id: crypto.randomUUID(), type: 'sticker', ...data }])
    }

    const updateStickerText = (id: string, text: string) => {
        setNodes((prev) => prev.map((node) => (node.id === id ? { ...node, text } : node)))
    }

    const deleteNodes = (ids: string[]) => {
        setNodes((prev) => prev.filter((node) => !ids.includes(node.id)))
    }

    const updateNodesPositions = (positions: { id: string; x: number; y: number }[]) => {
        const record = Object.fromEntries(positions.map((p) => [p.id, p]))
        setNodes((lastNodes) =>
            lastNodes.map((node) => {
                const newPosition = record[node.id]
                return newPosition ? { ...node, x: newPosition.x, y: newPosition.y } : node
            }),
        )
    }

    return {
        nodes,
        addSticker,
        updateStickerText,
        deleteNodes,
        updateNodesPositions,
    }
}

export type NodesModel = ReturnType<typeof useNodes>
