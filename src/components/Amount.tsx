import { Show, createResource } from "solid-js"
import { useMegaStore } from "~/state/megaStore"
import { satsToUsd } from "~/utils/conversions"

function prettyPrintAmount(n?: number | bigint): string {
    if (!n || n.valueOf() === 0) {
        return "0"
    }
    return n.toLocaleString()
}

export function Amount(props: { amountSats: bigint | number | undefined, showFiat?: boolean }) {

    const [state, _] = useMegaStore()

    async function getPrice() {
        return await state.node_manager?.get_bitcoin_price()
    }

    const [price] = createResource(getPrice)
    const amountInUsd = () => satsToUsd(price(), Number(props.amountSats) || 0, true)

    return (
        <div class="flex flex-col gap-2">
            <h1 class="text-4xl font-light">
                {prettyPrintAmount(props.amountSats)} <span class='text-xl'>SAT</span>
            </h1>
            <Show when={props.showFiat}>
                <h2 class="text-xl font-light text-white/70" >
                    &#8776; {amountInUsd()} <span class="text-sm">USD</span>
                </h2>
            </Show>
        </div>
    )
}