use std::fs;
use std::path::Path;

extern crate fs_extra;

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

    // Convert markups to html and place them inside `./dist`.
    let paths = fs::read_dir("./markups").unwrap();
    for path in paths {
        println!("Name: {}", path.unwrap().path().display())
    }

    Ok(())
}
