interface WebpackServeOptions {
    compiler: Object;
}

interface KoaMiddleware {
    (context, next) : void
}

interface Options {
    title?: string;
    theme?: "default" | "dark" | "material";
    template?: string;
    disableWhenValid?: boolean;
}

declare function webpackServeWaitpage(wsOptions: WebpackServeOptions, options?: Options) : KoaMiddleware;

export = webpackServeWaitpage;
