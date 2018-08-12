import * as koa from "koa";
import * as serve from "webpack-serve";

interface Options {
    title?: string;
    theme?: "default" | "dark" | "material";
    template?: string;
    disableWhenValid?: boolean;
}

declare function makeWaitPage(wsOptions: serve.Options, options?: Options): koa.Middleware;

export = makeWaitPage;
