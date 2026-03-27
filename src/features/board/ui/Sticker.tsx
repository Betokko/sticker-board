import clsx from 'clsx'
import { type Ref, useLayoutEffect, useRef, useState } from 'react'

export function Sticker({
    id,
    ref,
    text,
    x,
    y,
    onClick,
    isSelected,
    isEditing,
    onTextChange,
    onMouseDown,
    onMouseUp,
}: {
    id: string
    ref: Ref<HTMLButtonElement>
    text: string
    x: number
    y: number
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    isSelected?: boolean
    isEditing?: boolean
    onTextChange?: (text: string) => void
    onMouseDown?: (e: React.MouseEvent<HTMLButtonElement>) => void
    onMouseUp?: (e: React.MouseEvent<HTMLButtonElement>) => void
}) {
    return (
        <button
            data-id={id}
            ref={ref}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            className={clsx(
                `absolute bg-yellow-200 p-2 shadow-md box-border text-left`,
                isSelected && 'outline-2 outline-blue-500 outline-offset-4 z-100',
            )}
            style={{ transform: `translate(${x}px, ${y}px)` }}
        >
            <TextAreaAutoSize value={text} isEditing={isEditing ?? false} onChange={(value) => onTextChange?.(value)} />
        </button>
    )
}

function TextAreaAutoSize({
    value,
    onChange,
    isEditing,
}: {
    value: string
    onChange: (value: string) => void
    isEditing: boolean
}) {
    const ref = useRef<HTMLDivElement>(null)
    const [size, setSize] = useState({ height: 0, width: 0 })

    useLayoutEffect(() => {
        if (!ref.current) return
        const { scrollWidth, scrollHeight } = ref.current
        setSize({ width: scrollWidth, height: scrollHeight })
    }, [value])

    return (
        <div className='relative'>
            <div ref={ref} className={clsx('whitespace-pre-wrap', isEditing && 'opacity-0')}>
                {value}
            </div>
            {isEditing && (
                <textarea
                    autoFocus
                    style={{ width: size.width + 2, height: size.height + 2 }}
                    className='absolute inset-0 left-0 top-0 resize-none overflow-hidden focus:outline-none'
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                />
            )}
        </div>
    )
}
