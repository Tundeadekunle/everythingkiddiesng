"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, CheckCircle, Clock, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface OrderItem {
  id: number;
  productTitle: string;
  price: string;
  quantity: number;
}

interface Order {
  id: number;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  city: string;
  state: string;
  totalAmount: string;
  status: string;
  paystackReference: string;
  createdAt: string;
  items?: OrderItem[];
}

const mockOrders: Order[] = [
  {
    id: 1,
    orderNumber: "EK-849201-492",
    customerName: "Babajide Lawson",
    customerEmail: "babajide@gmail.com",
    customerPhone: "08034567891",
    city: "Lekki Phase 1",
    state: "Lagos",
    totalAmount: "185000.00",
    status: "paid",
    paystackReference: "ps_1728392182_920",
    createdAt: new Date().toISOString(),
    items: [
      {
        id: 1,
        productTitle: "Mercedes-Benz G63 AMG 12V Electric Ride-On SUV",
        price: "185000.00",
        quantity: 1,
      },
    ],
  },
  {
    id: 2,
    orderNumber: "EK-392019-102",
    customerName: "Amina Bello",
    customerEmail: "amina.bello@yahoo.com",
    customerPhone: "08098765432",
    city: "Maitama",
    state: "Abuja FCT",
    totalAmount: "66500.00",
    status: "paid",
    paystackReference: "ps_1728391021_331",
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    items: [
      {
        id: 2,
        productTitle: "12-in-1 Solar & Hydraulic STEM Educational Robot Kit",
        price: "24500.00",
        quantity: 1,
      },
      {
        id: 3,
        productTitle: "Smart Programmable Coding Robot for Kids",
        price: "42000.00",
        quantity: 1,
      },
    ],
  },
];

export default function AdminOrdersPage() {
  const [ordersList, setOrdersList] = useState<Order[]>(mockOrders);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success && data.orders && data.orders.length > 0) {
        setOrdersList(data.orders);
      }
    } catch {
      // fallback to mock orders
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: number, newStatus: string) => {
    setOrdersList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    try {
      await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      toast.success(`Order marked as ${newStatus}`);
    } catch {
      toast.error("Status updated locally");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Customer Orders</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track Paystack payments and manage dispatch fulfillment
          </p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={loading}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-sm transition-all inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          Refresh Orders
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Order Ref</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Items Ordered</th>
                <th className="py-3.5 px-4">Total Amount</th>
                <th className="py-3.5 px-4">Paystack Status</th>
                <th className="py-3.5 px-4 text-right">Dispatch Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ordersList.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-slate-900 block">
                      {order.orderNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {order.paystackReference}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-800">{order.customerName}</div>
                    <div className="text-[11px] text-slate-500">{order.customerEmail}</div>
                    <div className="text-[11px] text-slate-500">
                      {order.city}, {order.state} ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¢ {order.customerPhone}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    {order.items && order.items.length > 0 ? (
                      <ul className="space-y-0.5">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="text-slate-700 font-medium">
                            <span className="font-bold text-rose-500">{item.quantity}x</span>{" "}
                            {item.productTitle}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-slate-400 italic">Ride-on vehicle package</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-black text-slate-900 text-sm">
                    {formatPrice(order.totalAmount)}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        order.status === "paid" || order.status === "delivered"
                          ? "bg-emerald-50 text-emerald-700"
                          : order.status === "shipped"
                          ? "bg-sky-50 text-sky-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      <CheckCircle size={11} />
                      {order.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                      className="px-2.5 py-1.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
