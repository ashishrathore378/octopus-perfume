"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type DashboardStats = {
  revenue: number;
  orders: number;
  customers: number;
  products: number;
  pending: number;
  delivered: number;
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<DashboardStats>({
    revenue: 0,
    orders: 0,
    customers: 0,
    products: 0,
    pending: 0,
    delivered: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const [{ data: orders }, { data: products }] = await Promise.all([
        supabase.from("orders").select("*"),
        supabase.from("products").select("*"),
      ]);

      const orderList = orders || [];
      const productList = products || [];

      const revenue = orderList.reduce(
        (sum, order) => sum + Number(order.total),
        0
      );

      const customers = new Set(
        orderList.map((order) => order.user_id)
      ).size;

      const pending = orderList.filter(
        (order) =>
          order.status?.toLowerCase() === "pending"
      ).length;

      const delivered = orderList.filter(
        (order) =>
          order.status?.toLowerCase() === "delivered"
      ).length;

      setStats({
        revenue,
        orders: orderList.length,
        customers,
        products: productList.length,
        pending,
        delivered,
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="text-white">
        Loading Dashboard...
      </main>
    );
  }

  return (
    <main className="text-white">

      <h1 className="text-4xl font-bold text-yellow-400 mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        <DashboardCard
          title="Revenue"
          value={`₹${stats.revenue}`}
        />

        <DashboardCard
          title="Orders"
          value={stats.orders}
        />

        <DashboardCard
          title="Customers"
          value={stats.customers}
        />

        <DashboardCard
          title="Products"
          value={stats.products}
        />

        <DashboardCard
          title="Pending Orders"
          value={stats.pending}
        />

        <DashboardCard
          title="Delivered Orders"
          value={stats.delivered}
        />

      </div>

    </main>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 hover:border-yellow-400 transition">

      <h2 className="text-gray-400 text-lg">
        {title}
      </h2>

      <p className="text-4xl font-bold text-yellow-400 mt-4">
        {value}
      </p>

    </div>
  );
}