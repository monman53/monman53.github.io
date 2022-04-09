`https://monman53.github.io/` generator written in NextJS.

My web page contents are written in AsciiDoc. This NextJS app exports .html files into `out` directory from .adoc files inside `posts` and deploys to `gh-pages`

* AsciiDoctor backend
* highlight.js supported
* MathJax supported

## Usage

```bash
# Development (http://localhost:3000)
npm run dev

# Build and export static contents to `out` directory
npm run build

# Check `out` static files
npm run serve

# Deploy static contents inside `out` to GitHub pages
npm run deploy
```

## Notice

* This project is only supposed to be used as static site generator.
  * Not support `next/image`. use `<img>` tag.
  * Any server side codes does not work.