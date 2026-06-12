import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
FRONT = ROOT / "frontend" / "src" / "app"
ADMIN = FRONT / "modules" / "admin"
BACK = ROOT / "backend"


def read(path):
    try:
        return path.read_text(encoding="utf-8", errors="ignore")
    except Exception:
        return ""


def rel(path):
    return str(path.relative_to(ROOT)).replace("\\", "/")


def unique(seq):
    out = []
    seen = set()
    for item in seq:
        if item and item not in seen:
            seen.add(item)
            out.append(item)
    return out


def parse_admin_routes():
    text = read(ADMIN / "admin.routing.ts")
    imports = {}
    for cls, path in re.findall(r'import\s+\{\s*([^}]+?)\s*\}\s+from\s+["\']([^"\']+)["\']', text):
        imports[cls.strip()] = path.strip()
    routes = []
    for path, comp in re.findall(r'\{\s*path:\s*["\']([^"\']*)["\']\s*,\s*component:\s*([A-Za-z0-9_]+)', text):
        if comp == "AdminComponent":
            continue
        routes.append({
            "path": "/" + path if path else "/",
            "route_path": path,
            "component": comp,
            "component_import": imports.get(comp, ""),
        })
    redirect = re.findall(r'\{\s*path:\s*["\']([^"\']*)["\']\s*,\s*redirectTo:\s*["\']([^"\']+)["\']', text)
    return routes, [{"from": f"/{a}", "to": b} for a, b in redirect]


def parse_auth_routes():
    text = read(FRONT / "modules" / "auth" / "auth.routing.ts")
    routes = []
    for path, comp in re.findall(r'\{\s*path:\s*["\']([^"\']*)["\']\s*,\s*component:\s*([A-Za-z0-9_]+)', text):
        if comp != "AuthComponent":
            routes.append({"path": "/auth/" + path, "route_path": path, "component": comp})
    return routes


def component_folder(route):
    imp = route.get("component_import") or ""
    if not imp:
        return None
    folder = imp.replace("./", "").split("/")[0]
    return ADMIN / folder


def parse_template(html):
    labels = unique(re.findall(r'<label[^>]*>(.*?)</label>', html, flags=re.S))
    labels = [re.sub(r'<[^>]+>', '', x).strip() for x in labels]
    placeholders = unique(re.findall(r'placeholder=["\']([^"\']+)["\']', html))
    names = unique(re.findall(r'(?:name|formControlName)=["\']([^"\']+)["\']', html))
    ngmodels = unique(re.findall(r'\[\(ngModel\)\]=["\']([^"\']+)["\']', html))
    inputs = unique(re.findall(r'<input[^>]*(?:name|formControlName|placeholder)=["\']([^"\']+)["\'][^>]*>', html))
    selects = unique(re.findall(r'<select[^>]*(?:name|formControlName|placeholder)=["\']([^"\']+)["\'][^>]*>', html))
    mat_selects = unique(re.findall(r'<mat-select[^>]*(?:name|formControlName|placeholder)=["\']([^"\']+)["\'][^>]*>', html))
    buttons = re.findall(r'<button[^>]*>(.*?)</button>', html, flags=re.S)
    anchors = re.findall(r'<a[^>]*(?:\(click\)|routerLink|href)[^>]*>(.*?)</a>', html, flags=re.S)
    button_text = unique([re.sub(r'<[^>]+>', ' ', x).strip() for x in buttons + anchors])
    button_text = [re.sub(r'\s+', ' ', x) for x in button_text if re.sub(r'\s+', ' ', x).strip()]
    click_handlers = unique(re.findall(r'\(click\)=["\']([^"\']+)["\']', html))
    return {
        "labels": labels[:80],
        "placeholders": placeholders[:80],
        "names": names[:80],
        "ngModels": ngmodels[:80],
        "inputs": inputs[:80],
        "selects": unique(selects + mat_selects)[:80],
        "buttons": button_text[:80],
        "click_handlers": click_handlers[:80],
    }


def parse_component_ts(text):
    service_injections = unique(re.findall(r'(?:public|private)\s+([A-Za-z0-9_]+)\s*:\s*([A-Za-z0-9_]+Service)', text))
    methods = unique(re.findall(r'^\s*([A-Za-z_][A-Za-z0-9_]*)\s*\([^)]*\)\s*\{', text, flags=re.M))
    validations = []
    for pat in [r'if\s*\(([^)]*(?:==|!=|>|<|required|undefined|null)[^)]*)\)', r'Validators\.([A-Za-z]+)']:
        validations += re.findall(pat, text)
    api_calls = unique(re.findall(r'\b([A-Za-z0-9_]+Service)\.([A-Za-z0-9_]+)\(', text))
    return {
        "services": [f"{name}: {typ}" for name, typ in service_injections],
        "methods": methods[:80],
        "validations": [str(v) for v in validations[:40]],
        "service_method_calls": [f"{s}.{m}" for s, m in api_calls[:80]],
    }


def parse_services():
    out = {}
    for path in (FRONT / "services").glob("*.ts"):
        text = read(path)
        calls = []
        for method, url_expr in re.findall(r'\.(get|post|put|delete)\s*\(([^,\n]+)', text, flags=re.I):
            calls.append({"method": method.upper(), "url_expression": url_expr.strip()[:180]})
        service_methods = unique(re.findall(r'^\s*([A-Za-z_][A-Za-z0-9_]*)\s*\([^)]*\)\s*\{', text, flags=re.M))
        out[path.stem] = {"file": rel(path), "methods": service_methods[:120], "http_calls": calls[:120]}
    return out


def parse_backend_routes():
    routes = {}
    for path in (BACK / "routes").glob("*.js"):
        text = read(path)
        endpoints = []
        for method, ep in re.findall(r'router\.(get|post|put|delete|patch)\s*\(\s*["\']([^"\']+)["\']', text, flags=re.I):
            endpoints.append({"method": method.upper(), "path": ep})
        model = re.findall(r'require\(["\']\.\./models/([^"\']+)["\']\)', text)
        routes[path.stem] = {"file": rel(path), "model": model[0] if model else path.stem, "endpoints": endpoints}
    return routes


def parse_backend_models():
    models = {}
    sql_tables = set()
    for path in (BACK / "models").glob("*.js"):
        text = read(path)
        methods = unique(re.findall(r'([A-Za-z_][A-Za-z0-9_]*)\s*:\s*function\s*\(', text))
        procedures = unique(re.findall(r'CALL\s+`?([A-Za-z0-9_]+)`?', text, flags=re.I))
        tables = unique(re.findall(r'\b(?:FROM|JOIN|INTO|UPDATE|TABLE|DELETE FROM|ALTER TABLE)\s+`?([A-Za-z0-9_]+)`?', text, flags=re.I))
        for t in tables:
            if t.upper() not in {"IF", "WHERE", "SET"}:
                sql_tables.add(t)
        models[path.stem] = {"file": rel(path), "methods": methods[:160], "procedures": procedures[:100], "tables": tables[:80]}
    return models, sorted(sql_tables)


def parse_sql_files():
    sql = {}
    all_tables = {}
    for path in list(BACK.glob("*.sql")) + list((BACK / "scratch").glob("*.sql")) + list((ROOT / "scratch").glob("*.sql")):
        text = read(path)
        creates = re.findall(r'CREATE\s+TABLE(?:\s+IF\s+NOT\s+EXISTS)?\s+`?([A-Za-z0-9_]+)`?\s*\((.*?)\)\s*;?', text, flags=re.I | re.S)
        alters = re.findall(r'ALTER\s+TABLE\s+`?([A-Za-z0-9_]+)`?', text, flags=re.I)
        procs = re.findall(r'CREATE\s+PROCEDURE\s+`?([A-Za-z0-9_]+)`?|PROCEDURE\s+`?([A-Za-z0-9_]+)`?', text, flags=re.I)
        file_tables = []
        for name, body in creates:
            cols = []
            for line in body.splitlines():
                m = re.match(r'\s*`?([A-Za-z0-9_]+)`?\s+([A-Za-z0-9()]+)', line.strip())
                if m and m.group(1).upper() not in {"PRIMARY", "KEY", "CONSTRAINT", "UNIQUE", "INDEX", "FOREIGN"}:
                    cols.append({"name": m.group(1), "type": m.group(2)})
            all_tables[name] = cols
            file_tables.append(name)
        for name in alters:
            all_tables.setdefault(name, [])
            file_tables.append(name)
        sql[rel(path)] = {"tables": unique(file_tables), "procedures": unique([a or b for a, b in procs])}
    return sql, all_tables


def parse_sidebar():
    text = read(FRONT / "components" / "sidebar" / "sidebar.component.ts")
    ensured = []
    for title in re.findall(r"title:\s*['\"]([^'\"]+)['\"]", text):
        ensured.append(title)
    permissions = bool(re.search(r"Get_Page_Permission", text))
    return {"ensured_menu_titles": unique(ensured), "uses_pointer_permissions": permissions}


def parse_login_menu_mapping():
    text = read(FRONT / "modules" / "auth" / "login" / "login.component.ts")
    mappings = []
    for block in re.findall(r'Menu_Id\s*==\s*(\d+)\)\s*this\.Push_Menu\(\{(.*?)\}\)', text, flags=re.S):
        menu_id, body = block
        path = re.search(r'path:\s*["\']([^"\']+)["\']', body)
        title = re.search(r'title:\s*["\']([^"\']+)["\']', body)
        mappings.append({
            "Menu_Id": int(menu_id),
            "path": path.group(1) if path else "",
            "title": title.group(1) if title else "",
            "permissions_from_backend": ["VIew_All", "Menu_Save", "Menu_Edit", "Menu_Delete", "Menu_Type"],
        })
    return sorted(mappings, key=lambda x: x["Menu_Id"])


def parse_frontend_models():
    models_dir = FRONT / "models"
    out = {}
    if not models_dir.exists():
        return out
    for path in models_dir.glob("*.ts"):
        text = read(path)
        fields = []
        for name, typ in re.findall(r'^\s*([A-Za-z_][A-Za-z0-9_]*)\s*:\s*([^=;]+)', text, flags=re.M):
            if name not in {"constructor"}:
                fields.append({"name": name, "type": typ.strip()})
        out[path.stem] = {"file": rel(path), "fields": fields[:200]}
    return out


def build():
    admin_routes, redirects = parse_admin_routes()
    auth_routes = parse_auth_routes()
    services = parse_services()
    backend_routes = parse_backend_routes()
    models, model_tables = parse_backend_models()
    sql_files, sql_tables = parse_sql_files()
    screens = []
    for route in admin_routes:
        folder = component_folder(route)
        html_path = folder / (folder.name + ".component.html") if folder else None
        ts_path = folder / (folder.name + ".component.ts") if folder else None
        # handle lowercase component file names in folders like invoice/grn.
        if folder and not html_path.exists():
            htmls = list(folder.glob("*.component.html"))
            html_path = htmls[0] if htmls else html_path
        if folder and not ts_path.exists():
            tss = list(folder.glob("*.component.ts"))
            ts_path = tss[0] if tss else ts_path
        html = read(html_path) if html_path else ""
        ts = read(ts_path) if ts_path else ""
        screen = {
            **route,
            "folder": rel(folder) if folder and folder.exists() else "",
            "html_file": rel(html_path) if html_path and html_path.exists() else "",
            "ts_file": rel(ts_path) if ts_path and ts_path.exists() else "",
            "template": parse_template(html),
            "component_logic": parse_component_ts(ts),
        }
        screens.append(screen)
    dashboard_files = []
    dash_folder = ADMIN / "Dashboard"
    if dash_folder.exists():
        for p in dash_folder.glob("*"):
            dashboard_files.append(rel(p))
    return {
        "project": "NEOTRONIC",
        "root": str(ROOT),
        "app_routes": {
            "root": [
                {"path": "/", "redirectTo": "auth/login"},
                {"path": "/auth", "lazyModule": "AuthModule"},
                {"path": "/", "lazyModule": "AdminModule", "guard": "CanAdminGuard"},
            ],
            "auth": auth_routes,
            "admin": admin_routes,
            "redirects": redirects,
        },
        "sidebar": parse_sidebar(),
        "login_menu_mapping": parse_login_menu_mapping(),
        "frontend_models": parse_frontend_models(),
        "screens": screens,
        "services": services,
        "backend_routes": backend_routes,
        "backend_models": models,
        "model_tables": model_tables,
        "sql_files": sql_files,
        "sql_tables": sql_tables,
        "dashboard_files": dashboard_files,
    }


if __name__ == "__main__":
    inv = build()
    out = ROOT / "scratch" / "docgen" / "source_inventory.json"
    out.write_text(json.dumps(inv, indent=2), encoding="utf-8")
    print(out)
