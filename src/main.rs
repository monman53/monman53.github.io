use std::fs;
use std::os::unix::fs::MetadataExt;
use std::path::Path;

use askama::Template;
use chrono::prelude::*;
use pulldown_cmark::{html, Event, Options, Parser};
use walkdir::WalkDir;

#[derive(askama::Template)]
#[template(path = "main.html", escape = "none")]
struct MainTemplate {
    title: String,
    bread: String,
    contents: String,
    last_modified: String,
}

fn bread_crumb(dst_path: &std::path::PathBuf) -> String {
    let mut bread = String::from("/");
    let mut link = String::from("/");
    let components: Vec<_> = dst_path.components().map(|comp| comp.as_os_str()).collect();
    for i in 1..components.len() - 1 {
        let dir_name = components[i].to_str().unwrap();
        link += &format!("{}/", dir_name);
        bread += &format!(" <a href='{}'>{}</a> /", link, dir_name);
    }
    bread
}

fn time_format(seconds: i64) -> String {
    Local
        .timestamp_opt(seconds, 0)
        .single()
        .unwrap_or_else(|| Local::now())
        .format("%Y-%m-%d %H:%M:%S %:z")
        .to_string()
}

fn extract_title(content: &str, options: Options) -> String {
    Parser::new_ext(content, options)
        .find_map(|event| match event {
            Event::Text(text) => Some(text.into_string()),
            _ => None,
        })
        .unwrap_or_default()
}

fn md_to_html(content: &str, options: Options) -> String {
    let mut output = String::new();
    html::push_html(&mut output, Parser::new_ext(content, options));
    output
}

fn render_page(
    src_path: &Path,
    dst_path: &std::path::PathBuf,
    options: Options,
) -> Result<(), Box<dyn std::error::Error>> {
    let content = fs::read_to_string(src_path)?;
    let title = extract_title(&content, options);
    let contents = md_to_html(&content, options);
    let bread = bread_crumb(dst_path);
    let last_modified = time_format(fs::metadata(src_path)?.mtime());
    let html = MainTemplate { title, bread, contents, last_modified }.render()?;
    fs::write(dst_path.with_extension("html"), html)?;
    Ok(())
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    if Path::new("./dist").exists() {
        fs::remove_dir_all("./dist")?;
        println!("`./dist` removed.");
    }
    fs::create_dir("./dist")?;
    println!("`./dist` created.");

    if Path::new("./public").exists() {
        let mut options = fs_extra::dir::CopyOptions::new();
        options.content_only = true;
        fs_extra::dir::copy("./public/", "./dist", &options)?;
        println!("Copied files inside `./public` into `./dist`.");
    }

    if Path::new("./markups").exists() {
        let mut md_options = Options::empty();
        md_options.insert(Options::ENABLE_STRIKETHROUGH);
        md_options.insert(Options::ENABLE_FOOTNOTES);

        for entry in WalkDir::new("markups/") {
            let entry = entry?;
            let src_path = entry.path();
            println!("{}", src_path.display());
            let dst_path = Path::new("dist").join(src_path.strip_prefix("markups")?);

            if src_path.is_dir() {
                fs::create_dir_all(&dst_path)?;
            } else if src_path.extension().map_or(false, |ext| ext == "md") {
                render_page(src_path, &dst_path, md_options)?;
            }
        }

        if Path::new("markups/blog").exists() {
            let mut file_contents = String::from("# Blog Top\n\n## List\n\n");

            for entry in WalkDir::new("markups/blog/") {
                let entry = entry?;
                let src_path = entry.path();
                if src_path.is_file() && src_path.extension().map_or(false, |ext| ext == "md") {
                    let content = fs::read_to_string(src_path)?;
                    let title = extract_title(&content, md_options);
                    let dst_path = Path::new("/")
                        .join(src_path.strip_prefix("markups")?)
                        .with_extension("html");
                    file_contents.push_str(&format!("* [{}]({})\n", title, dst_path.display()));
                }
            }

            let dst_path = Path::new("dist/blog/index.html").to_path_buf();
            let html = MainTemplate {
                title: "Blog top".to_string(),
                bread: bread_crumb(&dst_path),
                contents: md_to_html(&file_contents, md_options),
                last_modified: time_format(Local::now().timestamp()),
            }
            .render()?;
            fs::write(dst_path, html)?;
        }
    }

    Ok(())
}
