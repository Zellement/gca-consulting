/**
 * Type declaration for the vue3-parallaxy module.
 */
declare module '@lucien144/vue3-parallaxy' {
    import { DefineComponent } from 'vue'

    /**
     * Props available for the Parallaxy component.
     * https://github.com/lucien144/vue3-parallaxy?tab=readme-ov-file#props
     */
    interface ParallaxyProps {
        /**
         * The speed of the parallax effect.
         * - Positive values move faster.
         * - Negative values reverse the direction.
         * @default 50
         */
        speed?: number

        /**
         * The axis of movement for the parallax effect.
         * - 'y' for vertical movement.
         * - 'x' for horizontal movement.
         * @default 'y'
         */
        axis?: 'x' | 'y'

        /**
         * The direction of the movement.
         * - 'normal' for the default movement direction (e.g., up on the y-axis).
         * - 'opposite' for reversing the default direction.
         * @default 'normal'
         */
        direction?: 'normal' | 'opposite'

        /**
         * Allows defining specific settings for different window widths.
         * Breakpoints are given as an object where keys are pixel widths and values
         * are ParallaxyProps configurations applied when the viewport is at least
         * that width.
         */
        breakpoints?: Record<number, ParallaxyProps>

        /**
         * Custom CSS style animation based on the parallax offset (delta) of the element
         * relative to the bottom of the viewport. This function returns a CSS string.
         *
         * Example:
         * - `(delta: number) => transform: translate3d(0, ${delta}px, 0);` for vertical movement.
         * - `(delta: number) => transform: translate3d(${delta}px, 0, 0);` for horizontal movement.
         */
        animation?: (delta: number) => string

        /**
         * Disables the parallax effect when set to true.
         * @default false
         */
        disabled?: boolean

        /**
         * Enables a debug panel to help visualize the parallax effect when set to true.
         * @default false
         */
        debug?: boolean
    }

    /**
     * Parallaxy component definition.
     * Provides a parallax effect on elements based on the defined props.
     */
    export const Parallaxy: DefineComponent<ParallaxyProps>
}
