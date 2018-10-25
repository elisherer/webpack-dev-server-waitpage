interface Options {
    title?: string;
    theme?: "default" | "dark" | "material";
    template?: string;
    disableWhenValid?: boolean;
}

declare function webpackDevServerWaitpage(server: Object, options?: Options) : Function;

export = webpackDevServerWaitpage;
