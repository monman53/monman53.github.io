import fs from 'fs'
import path from 'path'
import Processor from 'asciidoctor'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

var hljs = require('highlight.js'); // https://highlightjs.org/

// Actual default values
var md = require('markdown-it')({
  highlight: function (str:string, lang:string) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
});

const postsDirectory = path.join(process.cwd(), 'posts')

function readdirRecursively(dir:string, files: string[] ) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const dirs = [];
  for (const dirent of dirents) {
    if (dirent.isDirectory()) dirs.push(`${dir}/${dirent.name}`);
    if (dirent.isFile()) files.push(`${dir}/${dirent.name}`);
  }
  for (const d of dirs) {
    files = readdirRecursively(d, files);
  }
  return files;
};

function getAllMarkups() {
  let fileNames = readdirRecursively(postsDirectory, [])
  fileNames = fileNames.map(s => {return s.replace(postsDirectory + "/", "")})
  return fileNames
}

export function getAllPostIds() {
  const fileNames = getAllMarkups()
  console.log(fileNames)
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '').split('/')
        // id: fileName.replace(/\.adoc$/, '').split('/')
      }
    }
  })
}

export async function getPostData(id: string | string[]) {
  // TODO: Refactor here
  if (!Array.isArray(id)) {
    id = [id]
  }
  id = id.join("/")

  /*
   * Asciidoc
  */
  // {
  //   const fullPath = path.join(postsDirectory, `${id}.adoc`)
  //   const markupContents = fs.readFileSync(fullPath, "utf8")

  //   const contentHtml = Processor().convert(markupContents)
  //   const date = "2022-04-07"
  //   const title = "test content title"

  //   return {
  //     id,
  //     contentHtml,
  //     ...({date, title})
  //   }
  // }

  /*
   * Markdown
  */
  {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    // const processedContent = await remark()
    //   .use(html)
    //   .process(matterResult.content)
    // const contentHtml = processedContent.toString()
    const contentHtml = md.render(fileContents)

    // Combine the data with the id and contentHtml

    // dummy
    const date = "2022-04-07"
    const title = "test content title"

    return {
      id,
      contentHtml,
      ...({ date, title})
      // ...(matterResult.data as { date: string; title: string })
    }
  }
}