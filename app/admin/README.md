

---

## Admin Dashboard (demo)

Route: `/admin`

Tabs:
- **Precious Metal Prices** – CRUD for metals.
- **Users** – CRUD users; assign pricing structures; toggle Admin.
- **Pricing Structures** – Manage simple multipliers.
- **Admin Management** – View current admins (toggle in Users tab).

Persistence is **localStorage** (demo only). Replace with your API later by swapping the load/save functions in `app/admin/AdminUI.tsx`.
