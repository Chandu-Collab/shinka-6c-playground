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
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    companyName: "",
    currency: "USD",
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 14 days later
    tax: 0,
    notes: "Thank you for your business!",
  });
  const [items, setItems] = useState<InvoiceItem[]>([{ service: "", quantity: 1, price: 0 }]);

  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    trackEvent({ event: "agent_open", agentId: agent.id });
  }, [agent.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { service: "", quantity: 1, price: 0 }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setOutput(null);
    trackEvent({ event: "agent_submit", agentId: agent.id });

    // Calculate totals on client side just for mock/UI if needed, but n8n handles it
    const payload = {
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
      showToast(result.error ?? "Request failed", "error");
    } else {
      setOutput(result.data ?? null);
      trackEvent({ event: "agent_success", agentId: agent.id });
      showToast("Invoice generated!", "success");
    }

    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-surface-elevated/80 shadow-2xl backdrop-blur-xl transition-all">
      <div className="grid lg:grid-cols-5">
        {/* Left Side: Form */}
        <div className="p-8 lg:col-span-3 lg:p-12">
          <div className="mb-8">
            <h2 className="bg-gradient-to-br from-accent to-accent-hover bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
              Create Freelancer Invoice
            </h2>
            <p className="mt-2 text-muted">
              Generate a professional invoice, track it in Google Sheets, and send it to your client.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="clientName" className="text-sm font-medium text-foreground/90">
                  Client Name <span className="text-accent">*</span>
                </label>
                <input
                  id="clientName"
                  name="clientName"
                  type="text"
                  required
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="companyName" className="text-sm font-medium text-foreground/90">
                  Company Name <span className="text-accent">*</span>
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Acme Corp"
                  className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="clientEmail" className="text-sm font-medium text-foreground/90">
                Client Email <span className="text-accent">*</span>
              </label>
              <input
                id="clientEmail"
                name="clientEmail"
                type="email"
                required
                value={formData.clientEmail}
                onChange={handleChange}
                placeholder="john@acme.com"
                className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label htmlFor="invoiceDate" className="text-sm font-medium text-foreground/90">
                  Invoice Date
                </label>
                <input
                  id="invoiceDate"
                  name="invoiceDate"
                  type="date"
                  required
                  value={formData.invoiceDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="dueDate" className="text-sm font-medium text-foreground/90">
                  Due Date
                </label>
                <input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="currency" className="text-sm font-medium text-foreground/90">
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  required
                  value={formData.currency}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                </select>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground/90">Line Items <span className="text-accent">*</span></label>
                <button
                  type="button"
                  onClick={addItem}
                  className="text-xs font-semibold text-accent hover:text-accent-hover"
                >
                  + Add Item
                </button>
              </div>
              
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Service description"
                      required
                      value={item.service}
                      onChange={(e) => handleItemChange(index, "service", e.target.value)}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                    />
                  </div>
                  <div className="w-20">
                    <input
                      type="number"
                      placeholder="Qty"
                      min="1"
                      required
                      value={item.quantity}
                      onChange={(e) => handleItemChange(index, "quantity", parseFloat(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                    />
                  </div>
                  <div className="w-28">
                    <input
                      type="number"
                      placeholder="Price"
                      min="0"
                      step="0.01"
                      required
                      value={item.price}
                      onChange={(e) => handleItemChange(index, "price", parseFloat(e.target.value))}
                      className="w-full rounded-xl border border-border bg-background/50 px-4 py-2 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                    />
                  </div>
                  {items.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem(index)}
                      className="text-muted hover:text-red-500 p-2"
                    >
                      &times;
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="tax" className="text-sm font-medium text-foreground/90">
                  Tax (%)
                </label>
                <input
                  id="tax"
                  name="tax"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.tax}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="notes" className="text-sm font-medium text-foreground/90">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none transition-all focus:border-accent focus:bg-surface focus:ring-4 focus:ring-accent/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-accent px-8 py-4 font-semibold text-white shadow-lg transition-all hover:bg-accent-hover hover:shadow-accent/25 focus:ring-4 focus:ring-accent/30 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Processing...
                  </>
                ) : (
                  <>
                    Generate Invoice
                    <svg
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>
        </div>

        {/* Right Side: Output / AI Preview */}
        <div className="flex flex-col bg-background/50 p-8 lg:col-span-2 lg:border-l lg:border-border lg:p-12">
          <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider text-muted">
            Status
          </h3>

          {!isLoading && !output && !error && (
            <div className="flex h-full flex-col items-center justify-center text-center text-muted opacity-60">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface-elevated shadow-sm border border-border">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-sm">Submit details to generate and send the invoice.</p>
            </div>
          )}

          {isLoading && (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-muted">
              <span className="h-10 w-10 animate-spin rounded-full border-2 border-accent/20 border-t-accent" />
              <p className="animate-pulse text-sm">Processing automation...</p>
            </div>
          )}

          {error && (
            <div className="animate-fade-in rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-900/50 dark:bg-red-900/20 dark:text-red-400">
              <div className="mb-2 flex items-center gap-2 font-semibold">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Error
              </div>
              <p className="text-sm leading-relaxed">{error}</p>
            </div>
          )}

          {output && (
            <div className="animate-slide-up flex h-full flex-col gap-4">
              <div className="rounded-2xl border border-green-200 bg-green-50 p-5 text-green-800 dark:border-green-900/50 dark:bg-green-900/20 dark:text-green-400 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 dark:text-green-300">Success!</h4>
                    <p className="text-sm mt-0.5">The invoice has been processed.</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 rounded-2xl border border-border bg-surface p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white font-bold shadow-inner">
                    AI
                  </div>
                  <div>
                    <p className="text-sm font-semibold">System</p>
                    <p className="text-xs text-muted">Just now</p>
                  </div>
                </div>
                <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {typeof output.message === 'string' 
                    ? output.message 
                    : JSON.stringify(output, null, 2)}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
