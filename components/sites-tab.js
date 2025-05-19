import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/data-table"
import { columns } from "@/components/sites-column"

const data = [
  {
    id: "m5gr84i9",
    site: "Acme Corp",
    url: "acme.com",
    zone: "United States",
    created_at: "2023-01-02T19:09:21.432Z",
  },
  {
    id: "3u1reuv4",
    site: "Wayne Enterprises",
    url: "wayne.com",
    zone: "United Kingdom",
    created_at: "2023-01-02T19:09:21.432Z",
  },
  {
    id: "derv1ws0",
    site: "Stark Industries",
    url: "stark.com",
    zone: "France",
    created_at: "2023-01-02T19:09:21.432Z",
  },
  {
    id: "902nu42v",
    site: "LexCorp",
    url: "lexcorp.io",
    zone: "Germany",
    created_at: "2023-01-02T19:09:21.432Z",
  },
  {
    id: "08jz69ac",
    site: "Oscorp",
    url: "oscorp.net",
    zone: "Canada",
    created_at: "2023-01-02T19:09:21.432Z",
  },
]

export default function SitesTab() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-white">My Sites</h1>
        <Button className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add site
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
