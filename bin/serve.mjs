import esbuild from "esbuild";
import cssModulesPlugin from "esbuild-css-modules-plugin";
import url from "url";

const outdir = url.fileURLToPath(new URL("../docs", import.meta.url));

const ctx = await esbuild.context({
  bundle: true,
  entryPoints: [url.fileURLToPath(new URL("../src/index.tsx", import.meta.url))],
  format: "esm",
  outdir,
  plugins: [cssModulesPlugin()],
  sourcemap: true,
  splitting: true,
  target: "esnext"
});

const { host, port } = await ctx.serve({ servedir: outdir });
console.log(`Listening at ${host}:${port}`);
