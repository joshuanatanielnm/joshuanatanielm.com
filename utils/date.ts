import { format } from "date-fns";

interface formatDateRangeProps {
  startDate: string;
  endDate?: string | null;
}

export function formatDateRange({ startDate, endDate }: formatDateRangeProps) {
  return `${format(new Date(startDate), "MMM yyyy")} - ${
    endDate ? format(new Date(endDate), "MMM yyyy") : "Present"
  }`;
}
