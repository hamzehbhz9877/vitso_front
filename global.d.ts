declare module "daisyui" {
    const daisyui: any;
    export default daisyui;
}
declare module '*.css' {
    const content: { [className: string]: string }
    export default content
}