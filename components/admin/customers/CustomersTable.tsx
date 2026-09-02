import Button from "@/components/system/Button";

interface Customer {
  name: string;
  email: string;
  orders: number;
  spent: string;
  joined: string;
}

const customers: Customer[] = [
  { name: "Sophia Harrington", email: "sophia@harrington.co", orders: 12, spent: "$2,140", joined: "Jan 14, 2025" },
  { name: "James Whitfield", email: "james.whitfield@gmail.com", orders: 7, spent: "$894", joined: "Mar 2, 2025" },
  { name: "Claire Fontaine", email: "claire.f@outlook.com", orders: 4, spent: "$512", joined: "Jun 9, 2025" },
  { name: "Marcus Delacroix", email: "m.delacroix@studio.co", orders: 22, spent: "$4,210", joined: "Oct 30, 2024" },
  { name: "Elena Voss", email: "elena@vossdesign.de", orders: 8, spent: "$1,380", joined: "Dec 5, 2024" },
  { name: "Thomas Beaumont", email: "thomas.b@me.com", orders: 3, spent: "$267", joined: "Jul 18, 2026" },
  { name: "Isabelle Renard", email: "irenard@paris.fr", orders: 1, spent: "$174", joined: "Aug 2, 2026" },
  { name: "Nathan Goldstein", email: "nathang@collector.art", orders: 19, spent: "$3,760", joined: "Feb 14, 2025" },
];

function initials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

export default function CustomersTable() {
  return (
    <div>
      <p className="text-sm text-neutral-600">{customers.length} registered customers</p>

      <div className="mt-5 overflow-x-auto rounded-xl bg-white">
        <table className="w-full min-w-[800px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-[#F3EFE7]/60 text-xs uppercase tracking-wider text-neutral-500">
              <th className="px-6 py-3 font-medium">Customer</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Total Orders</th>
              <th className="px-6 py-3 font-medium">Total Spent</th>
              <th className="px-6 py-3 font-medium">Joined</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.email} className="border-b border-neutral-50 last:border-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-700 text-xs font-semibold text-white">
                      {initials(customer.name)}
                    </div>
                    <span className="font-medium text-neutral-900">{customer.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-neutral-600">{customer.email}</td>
                <td className="px-6 py-4 text-neutral-800">{customer.orders}</td>
                <td className="px-6 py-4 font-medium text-neutral-900">{customer.spent}</td>
                <td className="px-6 py-4 text-neutral-500">{customer.joined}</td>
                <td className="px-6 py-4">
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}