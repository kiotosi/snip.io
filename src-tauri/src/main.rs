#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod config;
use config::snippets::Snippets;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

fn init_snippets() -> Snippets {
    let mut snip = Snippets::new();
    snip.check().unwrap_or_else(|_| {
        snip.create().expect("Can't create a new snipio folder");
    });

    snip.load().expect("Can't load snippets file!");
    snip.parse().expect("Can't parse snippets!");
    snip
}

#[tauri::command]
fn get_snippets() -> String {
    init_snippets().json
}

#[tauri::command]
fn save_snippets(json: &str) {
    let snip = init_snippets();
    snip.save(json.to_string()).expect("Can't save snippets");
}

fn main() {

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_snippets, save_snippets])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
