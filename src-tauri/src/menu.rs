use tauri::{CustomMenuItem, Menu, MenuItem, Submenu};

pub fn generate_menu() -> Menu {

  // here `"quit".to_string()` defines the menu item id, and the second parameter is the menu item label.
  let quit = CustomMenuItem::new("quit", "Quit");
  let window_submenu = Submenu::new("Window", Menu::new().add_item(quit));

  let snippets_search = CustomMenuItem::new("search_snippets", "Search for snippets");
  let folder_search = CustomMenuItem::new("search_folders", "Search for directory");
  let search_submenu = Submenu::new("Search",
  Menu::new()
    .add_item(snippets_search)
    .add_item(folder_search)
  );

  let about = CustomMenuItem::new("about", "About");

  let menu = Menu::new()
    .add_native_item(MenuItem::Copy)
    .add_submenu(search_submenu)
    .add_submenu(window_submenu)
    .add_item(about);

  return menu;
}