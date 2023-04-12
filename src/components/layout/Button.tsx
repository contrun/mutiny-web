import { cva, VariantProps } from "class-variance-authority";
import { children, JSX, ParentComponent, splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";
import { A } from "solid-start";

const button = cva("p-4 rounded-xl text-xl font-semibold disabled:opacity-50 disabled:grayscale transition", {
    variants: {
        intent: {
            active: "bg-white text-black border border-white enabled:hover:text-[#3B6CCC]",
            inactive: "bg-black text-white border border-white enabled:hover:text-[#3B6CCC]",
            // TODO: not sure what breaks these hover states, they work in tailwind playground
            blue: "bg-m-blue text-white shadow-inner-button enabled:hover:bg-m-blue-dark text-shadow-button",
            red: "bg-m-red text-white shadow-inner-button enabled:bg-m-red-dark text-shadow-button",
            green: "bg-m-green text-white shadow-inner-button enabled:bg-m-green-dark text-shadow-button",
        },
        layout: {
            flex: "flex-1",
            pad: "px-8",
            small: "px-4 py-2 w-auto text-lg",
        },
    },

    defaultVariants: {
        intent: "inactive",
        layout: "flex"
    },
});

// Help from https://github.com/arpadgabor/credee/blob/main/packages/www/src/components/ui/button.tsx

type StyleProps = VariantProps<typeof button>
interface ButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement>, StyleProps { }

export const Button: ParentComponent<ButtonProps> = props => {
    const slot = children(() => props.children)
    const [local, attrs] = splitProps(props, ['children', 'intent', 'layout', 'class'])

    return (
        <button
            {...attrs}
            class={button({
                class: local.class || "",
                intent: local.intent,
                layout: local.layout,
            })}
        >
            {slot()}
        </button>
    )
}

interface ButtonLinkProps extends JSX.ButtonHTMLAttributes<HTMLAnchorElement>, StyleProps {
    href: string
    target?: string
    rel?: string
}

export const ButtonLink: ParentComponent<ButtonLinkProps> = props => {
    const slot = children(() => props.children)
    const [local, attrs] = splitProps(props, ['children', 'intent', 'layout', 'class', 'href', 'target', 'rel'])

    return (
        <Dynamic
            component={local.href?.includes('://') ? 'a' : A}
            href={local.href}
            target={local.target}
            rel={local.rel}
            {...attrs}
            class={button({
                class: `flex justify-center no-underline ${local.class || ""}`,
                intent: local.intent,
                layout: local.layout,
            })}
        >
            {slot()}
        </Dynamic>
    )
}