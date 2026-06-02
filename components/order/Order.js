"use client";

import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAdminOrders } from "../../hooks/useAdminOrders";

const statusColors = {
  PENDING: "bg-yellow-500",
  PROCESSING: "bg-blue-500",
  DELIVERED: "bg-green-500",
  CANCELLED: "bg-red-500",
};

const AdminOrders = () => {
  const [status, setStatus] = useState("");

  const { data, isLoading, error } = useAdminOrders(status);

  // ✅ IMPORTANT FIX: correct API path
  const orders = data?.data?.results || [];

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Orders</h1>

        <div className="flex gap-2 flex-wrap">
          <Button
            variant={status === "" ? "default" : "outline"}
            onClick={() => setStatus("")}
          >
            All
          </Button>

          <Button
            variant={status === "PENDING" ? "default" : "outline"}
            onClick={() => setStatus("PENDING")}
          >
            Pending
          </Button>

          <Button
            variant={status === "PROCESSING" ? "default" : "outline"}
            onClick={() => setStatus("PROCESSING")}
          >
            Processing
          </Button>

          <Button
            variant={status === "DELIVERED" ? "default" : "outline"}
            onClick={() => setStatus("DELIVERED")}
          >
            Delivered
          </Button>
        </div>
      </div>

      {/* CARD */}
      <Card>
        <CardHeader>
          <CardTitle>Orders List</CardTitle>
        </CardHeader>

        <CardContent>
          {/* LOADING */}
          {isLoading && <p className="text-center py-10">Loading orders...</p>}

          {/* ERROR */}
          {error && (
            <p className="text-center text-red-500 py-10">{error.message}</p>
          )}

          {/* TABLE */}
          {!isLoading && !error && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Total Items</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">
                        #{order.order_id}
                      </TableCell>

                      <TableCell>{order.total_items}</TableCell>

                      <TableCell>
                        ₹{Number(order.total_amount).toFixed(2)}
                      </TableCell>

                      <TableCell>
                        <Badge
                          className={`text-white ${
                            statusColors[order.status] || "bg-gray-500"
                          }`}
                        >
                          {order.order_status_display || order.status}
                        </Badge>
                      </TableCell>

                      <TableCell>{order.payment_status}</TableCell>

                      <TableCell>
                        {new Date(order.order_date).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-10"
                    >
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminOrders;
