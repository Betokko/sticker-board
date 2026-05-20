import {WindowPosition} from "../model/window-position"

export function Dots({windowPosition}: {
    windowPosition: WindowPosition
}) {
    return (
        <div
            // style здесь используется как способ объявить CSS-переменные на элементе.
            // Переменные, объявленные на элементе, доступны ему и всем его потомкам.
            style={{
                '--zoom': windowPosition.zoom,
                '--x': -windowPosition.x * windowPosition.zoom + 'px',
                '--y': -windowPosition.y * windowPosition.zoom + 'px',
            } as React.CSSProperties}
            // Tailwind-классы на том же элементе могут их читать:
            className="
                dark absolute inset-0
                bg-[radial-gradient(#e5e7eb_calc(1px*var(--zoom)),transparent_1px)]
                [background-position:var(--x)_var(--y)]
                [background-size:calc(16px*var(--zoom))_calc(16px*var(--zoom))]
                "
        />
    )
}
