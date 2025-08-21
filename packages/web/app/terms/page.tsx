import { redirect } from "next/navigation";

export const metadata = {
  title: "Terms of Service | JinoShare",
  description: "View the full Terms of Service for using JinoShare."
};

export default function TermsPage() {
  redirect("/legal#terms-of-service");
}