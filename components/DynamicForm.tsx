"use client";

import type { FormField } from "@/data/agents";
import { useRef } from "react";

export type FormValues = Record<string, string | File | null>;

interface DynamicFormProps {
  fields: FormField[];
  values: FormValues;
  onChange: (name: string, value: string | File | null) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export default function DynamicForm({
  fields,
  values,
  onChange,
  onSubmit,
  isLoading,
}: DynamicFormProps) {
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {fields.map((field) => (
        <div key={field.name}>
          <label
            htmlFor={field.name}
            className="mb-1.5 block text-sm font-medium"
          >
            {field.label}
            {field.required && <span className="ml-1 text-accent">*</span>}
          </label>

          {field.type === "textarea" ? (
            <textarea
              id={field.name}
              name={field.name}
              rows={field.rows ?? 4}
              placeholder={field.placeholder}
              required={field.required}
              value={(values[field.name] as string) ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              className="w-full resize-y rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent/30"
            />
          ) : field.type === "file" ? (
            <div>
              <input
                ref={(el) => {
                  fileInputRefs.current[field.name] = el;
                }}
                id={field.name}
                name={field.name}
                type="file"
                accept={field.accept}
                required={field.required}
                onChange={(e) =>
                  onChange(field.name, e.target.files?.[0] ?? null)
                }
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-accent/10 file:px-3 file:py-1 file:text-sm file:font-medium file:text-accent"
              />
              {values[field.name] instanceof File && (
                <p className="mt-1.5 text-xs text-muted">
                  Selected: {(values[field.name] as File).name}
                </p>
              )}
            </div>
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type === "url" ? "url" : field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={(values[field.name] as string) ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-accent/30"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-medium text-white transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isLoading ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Processing...
          </>
        ) : (
          "Run Agent"
        )}
      </button>
    </form>
  );
}
