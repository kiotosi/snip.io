extern crate json;

mod path {
    use std::path;
    use std::env;

    /// Get snippets config directory
    /// @private
    fn _get_snipio_directory() -> path::PathBuf {
        // TODO: Get $HOME directory without home_dir
        let home_dir: path::PathBuf = env::home_dir().unwrap();
        let snipio_dir: path::PathBuf = home_dir.join(".snipio");
        snipio_dir
    }

    /// Get snippets json file
    /// @private
    fn _get_snipio_file(name: &str) -> path::PathBuf {
        let mut dir = _get_snipio_directory();
        dir.set_file_name(name);
        dir
    }

    /// Struct with snippets directory path and snippets.json
    /// **@only_new**
    pub struct SnipioPath {
        pub config_dir: path::PathBuf,
        pub snippets_file: path::PathBuf
    }

    impl SnipioPath {
        pub fn new() -> SnipioPath {
            SnipioPath {
                config_dir: _get_snipio_directory(),
                snippets_file: _get_snipio_file(".snipio/snippets.json"),
            }
        }
    }
}

/*
   IMPL: 
   - Load: Function to load file
   - Save: Function to save file
   - Check: Function to check directory and file
   - Create: Function to create directory and file
   - Parse: Function to parse file from JSON
*/
pub mod snippets {
    extern crate json;
    use std::fs;
    use std::io::{self, Write};

    /// Structure with snippets info
    /// **@only_new**
    pub struct Snippets {
        path: super::path::SnipioPath,
        pub content: String,
        pub json: String
    }

    impl Snippets {
        pub fn new() -> Snippets {
            Snippets {
                path: super::path::SnipioPath::new(),
                content: String::new(),
                json: String::new()
            }
        }

        // TEST: Need to write tests to the load function
        /// Tries to get snippets.json
        ///
        /// # Example
        /// ```
        /// mod snippets;
        /// let snippets = snippets::Snippets::new();
        /// snippets.load().expect("Can't load snippets");
        ///
        /// ```
        pub fn load(&mut self) -> io::Result<()> {
            self.content = fs::read_to_string(&self.path.snippets_file)?;
            Ok(())
        }

        // TEST: Need to write tests to the save function
        /// Tries to save snippets.json
        ///
        /// # Example
        /// ```
        /// mod snippets;
        /// let snippets = snippets::Snippets::new();
        /// snippets.save("{}").expect("Can't load snippets");
        ///
        /// ```
        pub fn save(&self, content: String) -> io::Result<()> {
            fs::write(&self.path.snippets_file, content)?;
            Ok(())
        }

        // TEST: Need to write tests to the check function
        /// Check if snippets file exists
        ///
        /// # Example
        /// ```
        /// mod snippets;
        /// let snippets = snippets::Snippets::new();
        /// match snippets.check() {
        ///   Ok => { snippets.load().expect("Can't load snippets, smthng wrong"); }
        ///   Err => { snippets.new(); }
        /// }
        ///
        /// ```
        pub fn check(&self) -> io::Result<()> {
            fs::metadata(&self.path.snippets_file)?;
            Ok(())
        }

        // TEST: Need to write tests to the parse function
        pub fn parse(&mut self) -> json::Result<()> {
            self.json = json::parse(&self.content)?.to_string();
            Ok(())
        }

        // TEST: Need to write tests to the create function
        /// Creates a new snippets file
        ///
        /// # Example
        /// ```
        /// mod snippets;
        /// let snippets = snippets::Snippets::new();
        /// match snippets.check() {
        ///   Ok => { snippets.load().expect("Can't load snippets, smthng wrong"); }
        ///   Err => { snippets.create(); }
        /// }
        ///
        /// ```
        pub fn create(&mut self) -> io::Result<()> {
            let content = r#"{"directories": [], "snippets": []}"#;
            fs::create_dir(&self.path.config_dir);
            let mut file = fs::File::create(&self.path.snippets_file)?;
            file.write(content.as_bytes())?;
            self.content = content.to_string();
            Ok(())
        }
    }
}
