use std::fs;
use std::path::Path;

extern crate askama;
extern crate fs_extra;
extern crate pulldown_cmark;

use askama::Template;

#[derive(askama::Template)]
#[template(path = "main.html", escape = "none")]
struct MainTemplate {
    title: String,
    contents: String,
}

fn main() -> Result<(), std::io::Error> {
    // Clean-up `./dist` directory
    if Path::new("./dist").exists() {
        fs::remove_dir_all("./dist")?;
        println!("`./dist` removed.");
    }

    // Create `./dist` directory
    fs::create_dir("./dist")?;
    println!("`./dist` created.");

    // Copy all contents inside `./public` directory to `./dist`
    if Path::new("./public").exists() {
        // This option prevent creating `public` directory inside `./dist`
        let mut options = fs_extra::dir::CopyOptions::new();
        options.content_only = true;

        let _ = fs_extra::dir::copy("./public/", "./dist", &options);
        println!("Copied files inside `./public` into `./dist`.");
    }

    // Convert markups to html and place them into `./dist`.
    if Path::new("./markups").exists() {
        use pulldown_cmark::{html, Event, Options, Parser};
        let mut options = Options::empty();
        options.insert(Options::ENABLE_STRIKETHROUGH);
        options.insert(Options::ENABLE_FOOTNOTES);

        let paths = fs::read_dir("./markups").unwrap();
        for path in paths {
            let src_path = path.unwrap().path();
            let dst_path =
                Path::new("./dist").join(src_path.strip_prefix(Path::new("./markups")).unwrap());

            // Create html file
            if src_path.is_file() {
                match src_path.extension() {
                    Some(ext) => {
                        if ext == "md" {
                            let file_content = fs_extra::file::read_to_string(&src_path).unwrap();
                            let parser = Parser::new_ext(&file_content, options);

                            // TODO: Use first text as a title
                            let mut cnt = 0;
                            let mut title = String::new();
                            let parser = parser.map(|event| match event {
                                Event::Text(text) => {
                                    if cnt == 0 {
                                        title = text.clone().into_string();
                                    }
                                    cnt+=1;
                                    Event::Text(text)
                                }
                                _ => event,
                            });

                            // Write to String buffer.
                            let mut html_output = String::new();
                            html::push_html(&mut html_output, parser);

                            // Export to html
                            let dst_path = dst_path.with_extension("html");
                            let html = MainTemplate {
                                title: title,
                                contents: html_output,
                            };
                            let html = html.render().unwrap();
                            fs::write(dst_path, html)?;
                        }
                    }
                    None => {}
                }
            }

            // Create directory
            if src_path.is_dir() {
                fs::create_dir_all(dst_path)?;
            }
        }
    }

    Ok(())
}
