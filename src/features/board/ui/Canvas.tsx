import type { WindowPosition } from '../model/window-position'

export function Canvas({
    children,
    windowPosition,
    overlay,
    ref,
    ...props
}: {
    children: React.ReactNode
    windowPosition: WindowPosition
    overlay?: React.ReactNode
    ref: React.Ref<HTMLDivElement>
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            {...props}
            className={`absolute inset-0 select-none overflow-hidden`}
            ref={ref}
            onContextMenu={(e) => e.preventDefault()}
        >
            {overlay}
            <div
                style={{
                    transform: `translate(${windowPosition.x}px, ${windowPosition.y}px) scale(${windowPosition.zoom})`,
                }}
            >
                {children}
            </div>
        </div>
    )
}
