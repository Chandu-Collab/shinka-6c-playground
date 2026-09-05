"use client";

import type { Agent } from "@/data/agents";
import { useState, useEffect } from "react";
import { callAgentApi } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";
import { useToast } from "@/components/Toast";

interface FreelancerInvoiceAutomationUIProps {
  agent: Agent;
}

interface InvoiceItem {
  service: string;
  quantity: number;
  price: number;
}

export default function FreelancerInvoiceAutomationUI({ agent }: FreelancerInvoiceAutomationUIProps) {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<"generate" | "payment">("generate");

  // Invoice Generation State
  const [formData, setFormData] = useState({
    invoiceNumber: "INV-2026-001",
    clientName: "Chandu",
    clientEmail: "chandouqiande@gmail.com",
    clientPhone: "+91 9123456789",
    clientAddress: "Bengaluru, Karnataka, India",
    companyName: "Shinka Solutions",
    companyEmail: "billing@shinka.example",
    companyPhone: "+91 9876543210",
    companyAddress: "Bengaluru, Karnataka, India",
    companyTaxId: "29ABCDE1234F1Z5",
    currency: "INR",
    invoiceDate: "2026-08-26",
    dueDate: "2026-09-10",
    tax: 18,
    discount: 10,
    notes: "Thank you for your business!",
  });
  const [items, setItems] = useState<InvoiceItem[]>([
    { service: "Website Development", quantity: 1, price: 25000 },
    { service: "Website Maintenance", quantity: 2, price: 5000 },
  ]);

  // Payment State - only status and invoiceNumber
  const [paymentData, setPaymentData] = useState({
    invoiceNumber: "INV-2026-001",
    status: "paid",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackEvent({ event: "agent_open", agentId: agent.id });
  }, [agent.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setPaymentData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { service: "", quantity: 1, price: 0 }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  // Calculations for live invoice preview
  const subtotal = items.reduce((acc, item) => acc + (Number(item.quantity) || 0) * (Number(item.price) || 0), 0);
  const discountAmount = (subtotal * (Number(formData.discount) || 0)) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = (taxableAmount * (Number(formData.tax) || 0)) / 100;
  const grandTotal = taxableAmount + taxAmount;

  const handleGenerateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setOutput(null);
    trackEvent({ event: "agent_submit", agentId: agent.id });

    const payload = {
      action: "generate",
      ...formData,
      items,
    };

    const result = await callAgentApi(agent.id, payload);

    if (!result.success) {
      setError(result.error ?? "Request failed");
      trackEvent({
        event: "agent_error",
        agentId: agent.id,
        metadata: { error: result.error },
      });
      showToast(result.error ?? "Invoice generation failed", "error");
    } else {
      setOutput(result.data ?? null);
      trackEvent({ event: "agent_success", agentId: agent.id });
      showToast("Invoice generated and sent successfully!", "success");
    }

    setIsLoading(false);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setOutput(null);
    trackEvent({ event: "agent_submit", agentId: agent.id });

    const payload = {
      action: "payment",
      ...paymentData,
    };

    const result = await callAgentApi(agent.id, payload);

    if (!result.success) {
      setError(result.error ?? "Payment recording failed");
      trackEvent({
        event: "agent_error",
        agentId: agent.id,
        metadata: { error: result.error },
      });
      showToast(result.error ?? "Payment recording failed", "error");
    } else {
      setOutput(result.data ?? null);
      trackEvent({ event: "agent_success", agentId: agent.id });
      showToast(`Invoice ${paymentData.invoiceNumber} marked as paid!`, "success");
    }

    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface-elevated/80 shadow-2xl backdrop-blur-xl transition-all">
      {/* Top Header & Tab Selector */}
      <div className="border-b border-border bg-surface/50 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent mb-2">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              Invoice Automation Series
            </div>
            <h2 className="bg-gradient-to-br from-accent to-accent-hover bg-clip-text text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent">
              AI Invoice & Payment Series
            </h2>
            <p className="mt-1 text-sm text-muted">
              Unified billing pipeline: Generate PDF invoices, track in Google Sheets, email clients, and record payments.
            </p>
          </div>

          {/* Segmented Tab Switcher */}
          <div className="inline-flex rounded-xl bg-background/80 p-1 border border-border self-start sm:self-auto">
            <button
              type="button"
              onClick={() => {
                setActiveTab("generate");
                setError(null);
              }}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                activeTab === "generate"
                  ? "bg-accent text-white shadow-md shadow-accent/20"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              1. Generate Invoice
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("payment");
                setError(null);
              }}
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-medium transition-all ${
                activeTab === "payment"
                  ? "bg-accent text-white shadow-md shadow-accent/20"
                  : "text-muted hover:text-foreground"
              }`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              2. Record Payment
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-5">
        {/* Left Side: Active Form */}
        <div className="p-6 sm:p-8 lg:col-span-3 lg:p-10 border-b lg:border-b-0 lg:border-r border-border">
          {activeTab === "generate" ? (
            <form onSubmit={handleGenerateSubmit} className="space-y-6">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted">
                  Company Details
                </h3>
                <span className="text-xs text-muted">Sender Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="companyName" className="text-xs font-semibold text-foreground/90">
                    Business Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Shinka Solutions"
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="companyEmail" className="text-xs font-semibold text-foreground/90">
                    Business Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="companyEmail"
                    name="companyEmail"
                    type="email"
                    required
                    value={formData.companyEmail}
                    onChange={handleChange}
                    placeholder="billing@shinka.example"
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="companyPhone" className="text-xs font-semibold text-foreground/90">
                    Business Phone
                  </label>
                  <input
                    id="companyPhone"
                    name="companyPhone"
                    type="text"
                    value={formData.companyPhone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="companyTaxId" className="text-xs font-semibold text-foreground/90">
                    Tax / GST ID
                  </label>
                  <input
                    id="companyTaxId"
                    name="companyTaxId"
                    type="text"
                    value={formData.companyTaxId}
                    onChange={handleChange}
                    placeholder="29ABCDE1234F1Z5"
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="companyAddress" className="text-xs font-semibold text-foreground/90">
                  Business Address
                </label>
                <input
                  id="companyAddress"
                  name="companyAddress"
                  type="text"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  placeholder="Bengaluru, Karnataka, India"
                  className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                />
              </div>

              <div className="flex items-center justify-between border-b border-border pb-2 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted">
                  Client Details
                </h3>
                <span className="text-xs text-muted">Recipient / Bill To</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="clientName" className="text-xs font-semibold text-foreground/90">
                    Customer Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="clientName"
                    name="clientName"
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={handleChange}
                    placeholder="Chandu"
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="clientEmail" className="text-xs font-semibold text-foreground/90">
                    Customer Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="clientEmail"
                    name="clientEmail"
                    type="email"
                    required
                    value={formData.clientEmail}
                    onChange={handleChange}
                    placeholder="chandouqiande@gmail.com"
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="clientPhone" className="text-xs font-semibold text-foreground/90">
                    Customer Phone
                  </label>
                  <input
                    id="clientPhone"
                    name="clientPhone"
                    type="text"
                    value={formData.clientPhone}
                    onChange={handleChange}
                    placeholder="+91 9123456789"
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="clientAddress" className="text-xs font-semibold text-foreground/90">
                    Customer Address
                  </label>
                  <input
                    id="clientAddress"
                    name="clientAddress"
                    type="text"
                    value={formData.clientAddress}
                    onChange={handleChange}
                    placeholder="Bengaluru, Karnataka, India"
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-b border-border pb-2 pt-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-muted">
                  Invoice Meta
                </h3>
                <span className="text-xs text-muted">Dates & Currency</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label htmlFor="invoiceNumber" className="text-xs font-semibold text-foreground/90">
                    Invoice # <span className="text-accent">*</span>
                  </label>
                  <input
                    id="invoiceNumber"
                    name="invoiceNumber"
                    type="text"
                    required
                    value={formData.invoiceNumber}
                    onChange={handleChange}
                    placeholder="INV-2026-001"
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  />
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label htmlFor="currency" className="text-xs font-semibold text-foreground/90">
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    required
                    value={formData.currency}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  >
                    <option value="INR">INR (₹)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label htmlFor="invoiceDate" className="text-xs font-semibold text-foreground/90">
                    Invoice Date
                  </label>
                  <input
                    id="invoiceDate"
                    name="invoiceDate"
                    type="date"
                    required
                    value={formData.invoiceDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  />
                </div>
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <label htmlFor="dueDate" className="text-xs font-semibold text-foreground/90">
                    Due Date
                  </label>
                  <input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  />
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted">
                    Line Items <span className="text-accent">*</span>
                  </h3>
                  <button
                    type="button"
                    onClick={addItem}
                    className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-accent-hover"
                  >
                    + Add Item
                  </button>
                </div>

                {items.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Item description"
                        required
                        value={item.service}
                        onChange={(e) => handleItemChange(index, "service", e.target.value)}
                        className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                      />
                    </div>
                    <div className="w-16 sm:w-20">
                      <input
                        type="number"
                        placeholder="Qty"
                        min="1"
                        required
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", parseFloat(e.target.value))}
                        className="w-full rounded-xl border border-border bg-background/50 px-2 sm:px-3 py-2 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10 text-center"
                      />
                    </div>
                    <div className="w-24 sm:w-28">
                      <input
                        type="number"
                        placeholder="Unit Price"
                        min="0"
                        step="0.01"
                        required
                        value={item.price}
                        onChange={(e) => handleItemChange(index, "price", parseFloat(e.target.value))}
                        className="w-full rounded-xl border border-border bg-background/50 px-3 py-2 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                      />
                    </div>
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="text-muted hover:text-red-500 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        title="Remove item"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Tax, Discount, Notes */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <label htmlFor="discount" className="text-xs font-semibold text-foreground/90">
                    Discount (%)
                  </label>
                  <input
                    id="discount"
                    name="discount"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.discount}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="tax" className="text-xs font-semibold text-foreground/90">
                    Tax (%)
                  </label>
                  <input
                    id="tax"
                    name="tax"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={formData.tax}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="notes" className="text-xs font-semibold text-foreground/90">
                  Invoice Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Thank you for your business."
                  className="w-full resize-none rounded-xl border border-border bg-background/50 px-3.5 py-2 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-accent-hover hover:shadow-accent/25 focus:ring-4 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Generating & Sending Invoice...
                  </>
                ) : (
                  <>
                    <span>Generate Invoice & Email PDF</span>
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* RECORD PAYMENT FORM */
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4 text-xs sm:text-sm text-foreground/90">
                <div className="flex items-center gap-2 font-semibold text-accent mb-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Series Payment Processing
                </div>
                Mark invoices as paid to immediately update your Google Sheets records, set amount due to 0, and reconcile transaction status.
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="payInvoiceNumber" className="text-xs font-semibold text-foreground/90">
                    Invoice Number <span className="text-accent">*</span>
                  </label>
                  <input
                    id="payInvoiceNumber"
                    name="invoiceNumber"
                    type="text"
                    required
                    value={paymentData.invoiceNumber}
                    onChange={handlePaymentChange}
                    placeholder="INV-2026-001"
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  />
                  <p className="text-[11px] text-muted">The exact invoice number to update in Google Sheets.</p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="payStatus" className="text-xs font-semibold text-foreground/90">
                    Payment Status <span className="text-accent">*</span>
                  </label>
                  <select
                    id="payStatus"
                    name="status"
                    required
                    value={paymentData.status}
                    onChange={handlePaymentChange}
                    className="w-full rounded-xl border border-border bg-background/50 px-3.5 py-2.5 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                  >
                    <option value="paid">paid</option>
                  </select>
                  <p className="text-[11px] text-muted">Expected status parameter: &apos;paid&apos;</p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-emerald-600 px-8 py-3.5 font-semibold text-white shadow-lg transition-all hover:bg-emerald-500 hover:shadow-emerald-600/25 focus:ring-4 focus:ring-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Updating Google Sheets...
                  </>
                ) : (
                  <>
                    <span>Mark Invoice as Paid</span>
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Side: Live Calculation & Execution Output */}
        <div className="flex flex-col bg-background/40 p-6 sm:p-8 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
              {activeTab === "generate" ? "Live Invoice Summary" : "Payment & Sheet Sync"}
            </h3>
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold text-accent">
              Real-time
            </span>
          </div>

          {/* Live Preview Card */}
          {activeTab === "generate" && (
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm mb-6 space-y-4">
              <div className="flex items-start justify-between border-b border-border pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted">Invoice</span>
                  <p className="font-bold text-foreground">{formData.invoiceNumber}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-muted">Currency</span>
                  <p className="font-bold text-accent">{formData.currency}</p>
                </div>
              </div>

              <div className="text-xs space-y-1 text-muted">
                <p className="font-semibold text-foreground">{formData.companyName || "Your Company"}</p>
                <p>Bill To: {formData.clientName || "Customer"}</p>
                <p>Email: {formData.clientEmail || "Email"}</p>
              </div>

              {/* Items summary */}
              <div className="border-t border-border pt-2 space-y-1.5">
                {items.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs text-muted">
                    <span className="truncate max-w-[140px] text-foreground">{item.service || `Item ${idx + 1}`} (x{item.quantity})</span>
                    <span>{formData.currency} {((item.quantity || 0) * (item.price || 0)).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-border pt-3 space-y-1 text-xs">
                <div className="flex justify-between text-muted">
                  <span>Subtotal</span>
                  <span>{formData.currency} {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                {formData.discount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount ({formData.discount}%)</span>
                    <span>- {formData.currency} {discountAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                {formData.tax > 0 && (
                  <div className="flex justify-between text-muted">
                    <span>Tax ({formData.tax}%)</span>
                    <span>+ {formData.currency} {taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-foreground pt-2 border-t border-border">
                  <span>Total Amount</span>
                  <span className="text-accent">{formData.currency} {grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payment" && (
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-sm mb-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 font-bold text-lg">
                  ✓
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Target Sheet Column Sync</p>
                  <p className="text-xs text-muted">Updates Row by Invoice Number</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-background/60">
                  <span className="text-muted">Target Invoice:</span>
                  <span className="font-semibold text-foreground">{paymentData.invoiceNumber}</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-background/60">
                  <span className="text-muted">Status Transition:</span>
                  <span className="font-semibold text-emerald-500">pending → paid</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-background/60">
                  <span className="text-muted">Amount Due Balance:</span>
                  <span className="font-semibold text-emerald-500">0.00</span>
                </div>
              </div>
            </div>
          )}

          {/* Results / Status Feedback */}
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400 text-xs">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <span>⚠️</span> Error Occurred
              </div>
              <p>{error}</p>
            </div>
          )}

          {output && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-5 text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-400 space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-900 dark:text-emerald-300">
                <svg className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Execution Succeeded
              </div>

              <p className="text-xs leading-relaxed">
                {String(output.message || "Operation completed successfully.")}
              </p>

              {activeTab === "generate" && (
                <button
                  type="button"
                  onClick={() => {
                    setPaymentData({
                      invoiceNumber: formData.invoiceNumber,
                      status: "paid",
                    });
                    setActiveTab("payment");
                    setOutput(null);
                  }}
                  className="w-full rounded-xl bg-emerald-600 py-2.5 text-center text-xs font-bold text-white transition-all hover:bg-emerald-500 shadow-md shadow-emerald-600/20"
                >
                  Record Payment for this Invoice →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
