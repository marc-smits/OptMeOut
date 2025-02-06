import json
import os
import time

from pathlib import Path
from http.server import SimpleHTTPRequestHandler, HTTPServer
import multiprocessing


# Paths
TEMPLATE_PATH = Path("src/template.html")
STEPS_PATH = Path("src/steps.json")
LANGUAGES_DIR = Path("src/languages")
DIST_DIR = Path("dist")
DIST_DIR.mkdir(exist_ok=True)

def get_directory_snapshot(directory):
    """Returns a dictionary with file names as keys and their last modified time as values."""
    if os.path.isfile(directory):
        return {directory: os.path.getmtime(directory)}

    snapshot = {}
    for root, _, files in os.walk(directory):
        for file in files:
            path = os.path.join(root, file)
            snapshot[path] = os.path.getmtime(path)
    return snapshot

def monitor_directories(directories, on_change, interval=1):
    """Monitors a directory for changes and prints out any modifications."""
    previous_snapshots = {path: get_directory_snapshot(path) for path in directories}
    
    while True:
        time.sleep(interval)
        changes = False
        for path in directories:
            previous_snapshot = previous_snapshots[path]
            current_snapshot = get_directory_snapshot(path)
        
            # Detect added files
            added_files = set(current_snapshot.keys()) - set(previous_snapshot.keys())
        
            # Detect removed files
            removed_files = set(previous_snapshot.keys()) - set(current_snapshot.keys())
        
            # Detect modified files
            modified_files = []
            for file in current_snapshot:
                if file in previous_snapshot and current_snapshot[file] != previous_snapshot[file]:
                    modified_files.append(file)
        
            if added_files or removed_files or modified_files:
                changes = True
            previous_snapshots[path] = current_snapshot
        if changes:
            on_change()

# Generate HTML files
def generate_html():
    # Load steps
    with open(STEPS_PATH, "r") as f:
        steps = json.load(f)

    # Load languages
    languages = {}
    for lang_file in LANGUAGES_DIR.glob("*.json"):
        with open(lang_file, "r") as f:
            languages[lang_file.stem] = json.load(f)

    with open(TEMPLATE_PATH, "r") as f:
        template = f.read()
    
    for lang, overrides in languages.items():

        html = template
        html = html.replace("{{pageTitle}}", overrides.get("pageTitle", "Compose Your Letter"))
        merged = merge_schemas(steps.copy(), overrides)

        html = html.replace("{{steps}}", json.dumps(merged))
        html = html.replace("{{language}}", json.dumps(overrides))

        output_path = DIST_DIR / f"{lang}.html"
        with open(output_path, "w") as f:
            f.write(html)
        print(f"Generated {output_path}")

ALLOWED_OVERRIDES = ["title", "enum"]
def merge_schemas(root, overrides):
    for step, schema in root.items():
        step_override = overrides.get(step)
        if not step_override:
            continue

        # maybe override the title
        schema["title"] = step_override.get("title", schema["title"])
        for field, properties in schema["properties"].items():
            field_overrides = step_override.get("properties", {}).get(field, {})
            schema["properties"][field] = maybe_override(properties, field_overrides)
        root[step] = schema
    return root

def maybe_override(properties, overrides):
    for key, value in overrides.items():
        if isinstance(value, dict):
            properties[key] = merge(properties[key], value)
        elif key in ALLOWED_OVERRIDES:
           properties[key] = value
    return properties

def merge(v1, v2):
    if isinstance(v1, dict) and isinstance(v2, dict):
        m = maybe_override(v1, v2)
        return m
    else:
        return v2
    

def start_monitoring(directories, on_change):
    process = multiprocessing.Process(target=monitor_directories, args=(directories, on_change))
    process.start()
    print(f"Started monitoring process with PID {process.pid}")

# Start live reload server
def start_server():
    def do_serve():
        os.chdir(DIST_DIR)  # Serve files from the dist directory
        server_address = ("", 8000)
        httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
        print(f"Serving at http://localhost:8000")
        httpd.serve_forever()

    process = multiprocessing.Process(target=do_serve)
    process.start()

if __name__ == "__main__":
    generate_html()

    start_monitoring([TEMPLATE_PATH, STEPS_PATH, LANGUAGES_DIR], generate_html)
    # Start HTTP server
    start_server()
