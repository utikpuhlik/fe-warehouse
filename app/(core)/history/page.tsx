import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'История | TCF',
}

export default async function Page() {
    return (
        <main>
            <p>Здесь будет история склада</p>
            <p>Пока что она генерируется только с накладных</p>
        </main>
    )
}